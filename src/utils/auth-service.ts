
import { User, UserStore, ReferralStatsStore, STORAGE_KEYS } from './auth-types';
import { storage } from './storage';

// Initialize the users store if it doesn't exist
const initializeUserStore = (): void => {
  if (!storage.get(STORAGE_KEYS.ALL_USERS)) {
    storage.set(STORAGE_KEYS.ALL_USERS, {});
    console.log("Initialized empty user store");
  }
  
  // Initialize referral stats store if it doesn't exist
  if (!storage.get(STORAGE_KEYS.REFERRAL_STATS)) {
    storage.set(STORAGE_KEYS.REFERRAL_STATS, {});
    console.log("Initialized empty referral stats store");
  }
};

// Get all users from storage
export const getAllUsers = (): UserStore => {
  // Always ensure the store is initialized
  initializeUserStore();
  
  const allUsers = storage.get<UserStore>(STORAGE_KEYS.ALL_USERS);
  return allUsers || {};
};

// Login user
export const loginUser = (username: string, password: string): { success: boolean; error?: string } => {
  try {
    // Ensure the user store is initialized
    initializeUserStore();
    
    // Get all users
    const allUsers = getAllUsers();
    
    // Verify the user exists
    if (!allUsers[username]) {
      console.error(`Login failed: User ${username} not found`);
      return { success: false, error: "Invalid username or password" };
    }
    
    // Verify password
    if (allUsers[username].password !== password) {
      console.error(`Login failed: Incorrect password for ${username}`);
      return { success: false, error: "Invalid username or password" };
    }
    
    // Update last login time
    const userData = {
      ...allUsers[username],
      lastLogin: new Date().toISOString()
    };
    
    allUsers[username] = userData;
    
    // Save updated users data
    if (!storage.set(STORAGE_KEYS.ALL_USERS, allUsers)) {
      console.error("Failed to update user login time");
      return { success: false, error: "Failed to save login data" };
    }
    
    // Set current user session
    storage.setRaw(STORAGE_KEYS.CURRENT_USER, username);
    
    // Save user data for quick access
    if (!storage.set(STORAGE_KEYS.USER_DATA, userData)) {
      console.error("Failed to save user data");
      logoutUser();
      return { success: false, error: "Failed to save user data" };
    }
    
    console.log(`User ${username} logged in successfully`);
    return { success: true };
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, error: "An error occurred during login" };
  }
};

// Logout user
export const logoutUser = (): void => {
  try {
    storage.remove(STORAGE_KEYS.CURRENT_USER);
    storage.remove(STORAGE_KEYS.USER_DATA);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

// Get current user data
export const getCurrentUser = (): User | null => {
  try {
    const username = storage.getRaw(STORAGE_KEYS.CURRENT_USER);
    if (!username) return null;
    
    const userData = storage.get<User>(STORAGE_KEYS.USER_DATA);
    if (!userData) {
      // Try to recover user data from all users
      const allUsers = getAllUsers();
      if (allUsers[username]) {
        // Restore missing user data
        storage.set(STORAGE_KEYS.USER_DATA, allUsers[username]);
        return allUsers[username];
      }
      return null;
    }
    
    return userData;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Update current user data
export const updateCurrentUser = (userData: Partial<User>): boolean => {
  try {
    const username = storage.getRaw(STORAGE_KEYS.CURRENT_USER);
    if (!username) {
      console.error("Cannot update user: No user is logged in");
      return false;
    }
    
    const allUsers = getAllUsers();
    if (!allUsers[username]) {
      console.error("Cannot update user: User not found in storage");
      return false;
    }
    
    // Update user
    allUsers[username] = {
      ...allUsers[username],
      ...userData
    };
    
    // Save updates
    const usersSaved = storage.set(STORAGE_KEYS.ALL_USERS, allUsers);
    const dataSaved = storage.set(STORAGE_KEYS.USER_DATA, allUsers[username]);
    
    if (!usersSaved || !dataSaved) {
      console.error("Failed to save user updates");
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error updating user data:", error);
    return false;
  }
};

// Register a new user
export const registerUser = (username: string, email: string, password: string): 
  { success: boolean; error?: string; warning?: string } => {
  try {
    // Ensure the user store is initialized
    initializeUserStore();
    
    // Get existing users
    const allUsers = getAllUsers();
    
    // Check if username exists
    if (allUsers[username]) {
      return { success: false, error: "Username already exists" };
    }
    
    // Check if email is already used
    const userValues = Object.values(allUsers);
    if (userValues.some(user => user.email === email)) {
      return { success: false, error: "Email already in use" };
    }
    
    // Create new user
    const newUser: User = {
      username,
      email,
      password,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isPremium: false
    };
    
    // Add to all users
    allUsers[username] = newUser;
    
    // Save updated users
    if (!storage.set(STORAGE_KEYS.ALL_USERS, allUsers)) {
      console.error("Failed to save new user to storage");
      return { success: false, error: "Registration failed - storage error" };
    }
    
    // Set current user session
    storage.setRaw(STORAGE_KEYS.CURRENT_USER, username);
    
    // Save user data for quick access
    if (!storage.set(STORAGE_KEYS.USER_DATA, newUser)) {
      console.error("Failed to save user data");
      return { success: false, error: "Failed to save user data" };
    }
    
    // Set up referral stats
    const referralStats = storage.get<ReferralStatsStore>(STORAGE_KEYS.REFERRAL_STATS) || {};
    referralStats[username] = { members: 0, earnings: 0 };
    storage.set(STORAGE_KEYS.REFERRAL_STATS, referralStats);
    
    // Process referral if exists
    const referredBy = storage.getRaw(STORAGE_KEYS.REFERRAL);
    if (referredBy && referredBy !== username) {
      processReferral(referredBy);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, error: "Registration failed due to an error" };
  }
};

// Process a referral
const processReferral = (referrer: string): boolean => {
  try {
    // Get referral stats
    const referralStats = storage.get<ReferralStatsStore>(STORAGE_KEYS.REFERRAL_STATS) || {};
    
    // Initialize if needed
    if (!referralStats[referrer]) {
      referralStats[referrer] = { members: 0, earnings: 0 };
    }
    
    // Increment members count
    referralStats[referrer].members = (referralStats[referrer].members || 0) + 1;
    
    // Save updated stats
    if (!storage.set(STORAGE_KEYS.REFERRAL_STATS, referralStats)) {
      console.error("Failed to save referral stats");
      return false;
    }
    
    console.log("Updated referral stats for:", referrer);
    
    // Clear the referral after processing
    storage.remove(STORAGE_KEYS.REFERRAL);
    return true;
  } catch (error) {
    console.error("Error processing referral:", error);
    return false;
  }
};
