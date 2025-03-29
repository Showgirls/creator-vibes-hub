
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// User type definition
export interface User {
  username: string;
  email: string;
  password: string;
  createdAt: string;
  lastLogin: string;
  isPremium: boolean;
}

interface UserStore {
  [username: string]: User;
}

// Storage keys
const STORAGE_KEYS = {
  ALL_USERS: "all_users",
  CURRENT_USER: "user_username",
  USER_DATA: "user_data",
  REFERRAL: "referredBy",
  REFERRAL_STATS: "referral_stats"
};

// Safe localStorage operations with proper error handling
const storage = {
  get: (key: string): any => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting ${key} from storage:`, error);
      return null;
    }
  },
  
  set: (key: string, value: any): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error saving ${key} to storage:`, error);
      return false;
    }
  },
  
  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from storage:`, error);
      return false;
    }
  },
  
  getRaw: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting raw ${key} from storage:`, error);
      return null;
    }
  },
  
  setRaw: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Error saving raw ${key} to storage:`, error);
      return false;
    }
  }
};

// Initialize the users store if it doesn't exist
const initializeUserStore = (): void => {
  if (!storage.get(STORAGE_KEYS.ALL_USERS)) {
    storage.set(STORAGE_KEYS.ALL_USERS, {});
    console.log("Initialized empty user store");
  }
};

// Auth check hook
export const useAuthCheck = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    // Initialize users store if it doesn't exist
    initializeUserStore();
    
    // Get current user from storage
    const username = storage.getRaw(STORAGE_KEYS.CURRENT_USER);
    console.log("Auth check for username:", username);
    
    if (!username) {
      console.log("No authenticated user found");
      setIsAuthenticated(false);
      setIsChecking(false);
      navigate("/login");
      return;
    }
    
    // Verify user exists in storage
    const allUsers = getAllUsers();
    if (!allUsers[username]) {
      console.log("User not found in storage, logging out");
      logoutUser();
      setIsAuthenticated(false);
      setIsChecking(false);
      navigate("/login");
      return;
    }
    
    // User is valid
    setIsAuthenticated(true);
    setIsChecking(false);
  }, [navigate]);
  
  return { isAuthenticated, isChecking };
};

// Get all users from storage
export const getAllUsers = (): UserStore => {
  // Always ensure the store is initialized
  initializeUserStore();
  
  const allUsers = storage.get(STORAGE_KEYS.ALL_USERS);
  return allUsers || {};
};

// Login user
export const loginUser = (username: string, userData: User): boolean => {
  try {
    // Ensure the user store is initialized
    initializeUserStore();
    
    // Get all users
    const allUsers = getAllUsers();
    
    // Verify the user exists
    if (!allUsers[username]) {
      console.error(`Login failed: User ${username} not found`);
      return false;
    }
    
    // Update last login time
    allUsers[username] = {
      ...allUsers[username],
      lastLogin: new Date().toISOString()
    };
    
    // Save updated users data
    if (!storage.set(STORAGE_KEYS.ALL_USERS, allUsers)) {
      console.error("Failed to update user login time");
      return false;
    }
    
    // Set current user session
    storage.setRaw(STORAGE_KEYS.CURRENT_USER, username);
    
    // Save user data for quick access
    if (!storage.set(STORAGE_KEYS.USER_DATA, allUsers[username])) {
      console.error("Failed to save user data");
      logoutUser();
      return false;
    }
    
    console.log(`User ${username} logged in successfully`);
    return true;
  } catch (error) {
    console.error("Error during login:", error);
    return false;
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
    
    const userData = storage.get(STORAGE_KEYS.USER_DATA);
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
export const registerUser = (username: string, email: string, password: string) => {
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
    
    // Set up referral stats
    const referralStats = storage.get(STORAGE_KEYS.REFERRAL_STATS) || {};
    referralStats[username] = { members: 0, earnings: 0 };
    storage.set(STORAGE_KEYS.REFERRAL_STATS, referralStats);
    
    // Process referral if exists
    const referredBy = storage.getRaw(STORAGE_KEYS.REFERRAL);
    if (referredBy && referredBy !== username) {
      processReferral(referredBy);
    }
    
    // Log in the user
    const loginSuccess = loginUser(username, newUser);
    if (!loginSuccess) {
      console.error("User registered but login failed");
      return { success: true, warning: "Account created but login failed" };
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
    const referralStats = storage.get(STORAGE_KEYS.REFERRAL_STATS) || {};
    
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

// Helper function to store referral information
export const setReferral = (referrer: string): boolean => {
  try {
    // Validate the referrer exists
    const allUsers = getAllUsers();
    if (!allUsers[referrer]) {
      console.warn(`Attempted to set referral for non-existent user: ${referrer}`);
      return false;
    }
    
    storage.setRaw(STORAGE_KEYS.REFERRAL, referrer);
    console.log(`Set referral to: ${referrer}`);
    return true;
  } catch (error) {
    console.error("Error setting referral:", error);
    return false;
  }
};

// Get the current referral
export const getReferral = (): string | null => {
  return storage.getRaw(STORAGE_KEYS.REFERRAL);
};

// Clear referral data
export const clearReferral = (): void => {
  storage.remove(STORAGE_KEYS.REFERRAL);
};
