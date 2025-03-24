
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// User type definition for better type safety
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

// Simple function to check if storage is available
const isStorageAvailable = () => {
  try {
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    console.error("LocalStorage is not available:", e);
    return false;
  }
}

// Create a more robust authentication checking hook
export const useAuthCheck = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    // Check for authentication
    if (!isStorageAvailable()) {
      console.error("Local storage is not available");
      setIsChecking(false);
      navigate("/login");
      return;
    }
    
    try {
      const username = localStorage.getItem("user_username") || sessionStorage.getItem("user_username");
      console.log("Auth check for username:", username);
      
      if (!username) {
        console.log("No authenticated user found, redirecting to login");
        // Clean up any partial data
        localStorage.removeItem("user_username");
        localStorage.removeItem("user_data");
        sessionStorage.removeItem("user_username");
        sessionStorage.removeItem("user_data");
        setIsAuthenticated(false);
        setIsChecking(false);
        navigate("/login");
        return;
      }
      
      // Verify the user exists in the all_users data
      const allUsersStr = localStorage.getItem("all_users") || sessionStorage.getItem("all_users");
      if (!allUsersStr) {
        console.log("No users database found, logging out");
        logoutUser();
        setIsChecking(false);
        navigate("/login");
        return;
      }
      
      try {
        const allUsers = JSON.parse(allUsersStr) as UserStore;
        if (!allUsers[username]) {
          console.log("User exists in session but not in all_users, logging out");
          logoutUser();
          setIsChecking(false);
          navigate("/login");
          return;
        }
        
        // Update user_data if it doesn't match all_users (sync data between tabs/sessions)
        const userDataStr = localStorage.getItem("user_data") || sessionStorage.getItem("user_data");
        if (!userDataStr) {
          // If user_data is missing but user exists in all_users, restore it
          const userData = JSON.stringify(allUsers[username]);
          localStorage.setItem("user_data", userData);
          sessionStorage.setItem("user_data", userData);
        } else {
          try {
            const userData = JSON.parse(userDataStr);
            // If userData doesn't match or is outdated, update from all_users
            if (JSON.stringify(userData) !== JSON.stringify(allUsers[username])) {
              const updatedUserData = JSON.stringify(allUsers[username]);
              localStorage.setItem("user_data", updatedUserData);
              sessionStorage.setItem("user_data", updatedUserData);
            }
          } catch (e) {
            console.error("Error parsing user_data, restoring from all_users:", e);
            const userData = JSON.stringify(allUsers[username]);
            localStorage.setItem("user_data", userData);
            sessionStorage.setItem("user_data", userData);
          }
        }
        
        // Successfully authenticated
        console.log("User authenticated:", username);
        setIsAuthenticated(true);
        setIsChecking(false);
      } catch (e) {
        console.error("Error parsing user data:", e);
        logoutUser();
        setIsChecking(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during authentication check:", error);
      logoutUser();
      setIsChecking(false);
      navigate("/login");
    }
  }, [navigate]);
  
  return { isAuthenticated, isChecking };
};

// Helper functions for authentication
export const loginUser = (username: string, userData: User): boolean => {
  if (!isStorageAvailable()) return false;
  
  try {
    console.log("Attempting to login user:", username);
    
    // Get all users first to ensure we're working with the latest data
    let allUsers: UserStore = getAllUsers();
    
    // Make sure the user exists in all_users
    if (!allUsers[username]) {
      console.error("User not found in all_users during login:", username);
      return false;
    }
    
    // Update user data in all_users with new lastLogin timestamp
    allUsers[username] = {
      ...allUsers[username],
      ...userData,
      lastLogin: new Date().toISOString()
    };
    
    // Save updated all_users to both storage types
    const allUsersString = JSON.stringify(allUsers);
    localStorage.setItem("all_users", allUsersString);
    sessionStorage.setItem("all_users", allUsersString);
    
    // Set current user data in both storages
    localStorage.setItem("user_username", username);
    sessionStorage.setItem("user_username", username);
    
    // Store user_data for the current session
    const userDataString = JSON.stringify(allUsers[username]);
    localStorage.setItem("user_data", userDataString);
    sessionStorage.setItem("user_data", userDataString);
    
    console.log("User logged in successfully:", username);
    return true;
  } catch (error) {
    console.error("Error during login:", error);
    return false;
  }
};

export const logoutUser = (): void => {
  if (!isStorageAvailable()) return;
  
  try {
    const username = localStorage.getItem("user_username") || sessionStorage.getItem("user_username");
    console.log("Logging out user:", username);
    
    // Clear current user data from both localStorage and sessionStorage
    localStorage.removeItem("user_username");
    localStorage.removeItem("user_data");
    
    sessionStorage.removeItem("user_username");
    sessionStorage.removeItem("user_data");
    
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error during logout:", error);
    // If error occurs during logout, try to clear everything
    try {
      localStorage.removeItem("user_username");
      localStorage.removeItem("user_data");
      sessionStorage.removeItem("user_username");
      sessionStorage.removeItem("user_data");
    } catch (e) {
      console.error("Failed to clear user data:", e);
    }
  }
};

export const getCurrentUser = () => {
  if (!isStorageAvailable()) return null;
  
  try {
    // Try to get username from either storage
    const username = localStorage.getItem("user_username") || sessionStorage.getItem("user_username");
    if (!username) return null;
    
    // Get all users data from either storage
    const allUsersStr = localStorage.getItem("all_users") || sessionStorage.getItem("all_users");
    if (!allUsersStr) return null;
    
    try {
      const allUsers = JSON.parse(allUsersStr) as UserStore;
      if (!allUsers[username]) return null;
      
      // If user exists in all_users, return it
      return {
        username,
        ...allUsers[username]
      };
    } catch (e) {
      console.error("Error parsing all_users in getCurrentUser:", e);
      return null;
    }
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const updateCurrentUser = (userData: Partial<User>): boolean => {
  if (!isStorageAvailable()) return false;
  
  try {
    // Get username from either storage
    const username = localStorage.getItem("user_username") || sessionStorage.getItem("user_username");
    if (!username) return false;
    
    // Get all users data
    let allUsers = getAllUsers();
    if (!Object.keys(allUsers).length) return false;
    
    // Ensure user exists in all_users
    if (!allUsers[username]) return false;
    
    // Update user data in all_users
    allUsers[username] = {
      ...allUsers[username],
      ...userData,
      lastActivity: new Date().toISOString()
    };
    
    // Save to both storage types
    const allUsersString = JSON.stringify(allUsers);
    localStorage.setItem("all_users", allUsersString);
    sessionStorage.setItem("all_users", allUsersString);
    
    // Update current user data
    const userDataString = JSON.stringify(allUsers[username]);
    localStorage.setItem("user_data", userDataString);
    sessionStorage.setItem("user_data", userDataString);
    
    return true;
  } catch (error) {
    console.error("Error updating user data:", error);
    return false;
  }
};

export const registerUser = (username: string, email: string, password: string) => {
  if (!isStorageAvailable()) {
    return { success: false, error: "Local storage not available" };
  }
  
  try {
    console.log("Registering new user:", username);
    
    // Initialize or get all_users
    let allUsers: UserStore = getAllUsers();
    
    // Check if username already exists
    if (allUsers[username]) {
      return { success: false, error: "Username already exists" };
    }
    
    // Check if email is already used
    for (const user in allUsers) {
      if (allUsers[user].email === email) {
        return { success: false, error: "Email already in use" };
      }
    }
    
    // Create user
    const userData: User = {
      username,
      email,
      password,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isPremium: false
    };
    
    allUsers[username] = userData;
    
    // Save users to both storage types
    const allUsersString = JSON.stringify(allUsers);
    localStorage.setItem("all_users", allUsersString);
    sessionStorage.setItem("all_users", allUsersString);
    
    console.log("User registered successfully:", username);
    
    // Set up initial referral stats
    try {
      let referralStats = {};
      const referralStatsStr = localStorage.getItem("referral_stats") || sessionStorage.getItem("referral_stats");
      
      if (referralStatsStr) {
        referralStats = JSON.parse(referralStatsStr);
      }
      
      referralStats[username] = { members: 0, earnings: 0 };
      localStorage.setItem("referral_stats", JSON.stringify(referralStats));
      sessionStorage.setItem("referral_stats", JSON.stringify(referralStats));
    } catch (e) {
      console.error("Error setting up referral stats:", e);
      // Initialize referral stats if corrupted
      const newReferralStats = {
        [username]: { members: 0, earnings: 0 }
      };
      localStorage.setItem("referral_stats", JSON.stringify(newReferralStats));
      sessionStorage.setItem("referral_stats", JSON.stringify(newReferralStats));
    }
    
    // Log user in
    loginUser(username, userData);
    
    return { success: true };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, error: "Registration failed" };
  }
};

export const getAllUsers = (): UserStore => {
  if (!isStorageAvailable()) return {};
  
  try {
    // Try to get from either storage
    const allUsersStr = localStorage.getItem("all_users") || sessionStorage.getItem("all_users");
    if (!allUsersStr) return {};
    
    try {
      return JSON.parse(allUsersStr) as UserStore;
    } catch (e) {
      console.error("Error parsing all_users:", e);
      return {};
    }
  } catch (error) {
    console.error("Error getting all users:", error);
    return {};
  }
};
