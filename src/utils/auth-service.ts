
import { User, UserStore, ReferralStatsStore, STORAGE_KEYS } from './auth-types';
import { dbUsers, dbCurrentUser, dbReferrals, dbRefString } from './indexedDB';

// Initialize the users store if it doesn't exist
const initializeUserStore = async (): Promise<void> => {
  try {
    const allUsers = await dbUsers.getAll();
    if (Object.keys(allUsers).length === 0) {
      console.log("Initialized empty user store");
    }
    
    // Initialize referral stats store if it doesn't exist
    const referralStats = await dbReferrals.getAll();
    if (Object.keys(referralStats).length === 0) {
      console.log("Initialized empty referral stats store");
    }
  } catch (error) {
    console.error("Error initializing stores:", error);
  }
};

// Get all users from storage
export const getAllUsers = async (): Promise<UserStore> => {
  // Always ensure the store is initialized
  await initializeUserStore();
  
  try {
    const allUsers = await dbUsers.getAll();
    return allUsers || {};
  } catch (error) {
    console.error("Error getting all users:", error);
    return {};
  }
};

// Login user
export const loginUser = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // Ensure the user store is initialized
    await initializeUserStore();
    
    // Get all users
    const allUsers = await getAllUsers();
    
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
    const userSaved = await dbUsers.set(userData);
    if (!userSaved) {
      console.error("Failed to update user login time");
      return { success: false, error: "Failed to save login data" };
    }
    
    // Set current user session
    const currentUserSet = await dbCurrentUser.set(username);
    
    if (!currentUserSet) {
      console.error("Failed to set current user");
      return { success: false, error: "Failed to save session data" };
    }
    
    console.log(`User ${username} logged in successfully`);
    return { success: true };
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, error: "An error occurred during login" };
  }
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  try {
    await dbCurrentUser.remove();
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

// Get current user data
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const currentUserData = await dbCurrentUser.get();
    if (!currentUserData) return null;
    
    const username = currentUserData.username;
    const userData = await dbUsers.get(username);
    
    if (!userData) {
      console.error(`User data not found for ${username}`);
      return null;
    }
    
    return userData;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Update current user data
export const updateCurrentUser = async (userData: Partial<User>): Promise<boolean> => {
  try {
    const currentUserData = await dbCurrentUser.get();
    if (!currentUserData) {
      console.error("Cannot update user: No user is logged in");
      return false;
    }
    
    const username = currentUserData.username;
    const user = await dbUsers.get(username);
    
    if (!user) {
      console.error("Cannot update user: User not found in storage");
      return false;
    }
    
    // Update user
    const updatedUser = {
      ...user,
      ...userData
    };
    
    // Save updates
    const userSaved = await dbUsers.set(updatedUser);
    
    if (!userSaved) {
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
export const registerUser = async (username: string, email: string, password: string): 
  Promise<{ success: boolean; error?: string; warning?: string }> => {
  try {
    // Ensure the user store is initialized
    await initializeUserStore();
    
    // Get existing users
    const allUsers = await getAllUsers();
    
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
    
    // Add to database
    const userSaved = await dbUsers.set(newUser);
    
    if (!userSaved) {
      console.error("Failed to save new user to storage");
      return { success: false, error: "Registration failed - storage error" };
    }
    
    // Set current user session
    const sessionSaved = await dbCurrentUser.set(username);
    
    if (!sessionSaved) {
      console.error("Failed to save user session");
      return { success: false, error: "Failed to save session data" };
    }
    
    // Set up referral stats
    await dbReferrals.set({ username, members: 0, earnings: 0 });
    
    // Process referral if exists
    const referredBy = await dbRefString.get();
    if (referredBy && referredBy !== username) {
      await processReferral(referredBy);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, error: "Registration failed due to an error" };
  }
};

// Process a referral
const processReferral = async (referrer: string): Promise<boolean> => {
  try {
    // Get referral stats
    const referralData = await dbReferrals.get(referrer) || { username: referrer, members: 0, earnings: 0 };
    
    // Increment members count
    referralData.members = (referralData.members || 0) + 1;
    
    // Save updated stats
    const saved = await dbReferrals.set(referralData);
    
    if (!saved) {
      console.error("Failed to save referral stats");
      return false;
    }
    
    console.log("Updated referral stats for:", referrer);
    
    // Clear the referral after processing
    await dbRefString.remove();
    return true;
  } catch (error) {
    console.error("Error processing referral:", error);
    return false;
  }
};
