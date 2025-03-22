
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
      const username = localStorage.getItem("user_username");
      console.log("Auth check for username:", username);
      
      if (!username) {
        console.log("No authenticated user found, redirecting to login");
        // Clean up any partial data
        localStorage.removeItem("user_username");
        localStorage.removeItem("user_data");
        setIsAuthenticated(false);
        setIsChecking(false);
        navigate("/login");
        return;
      }
      
      // Verify the user exists in the all_users data
      const allUsersStr = localStorage.getItem("all_users");
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
        const userDataStr = localStorage.getItem("user_data");
        if (!userDataStr) {
          // If user_data is missing but user exists in all_users, restore it
          localStorage.setItem("user_data", JSON.stringify(allUsers[username]));
        } else {
          try {
            const userData = JSON.parse(userDataStr);
            // If userData doesn't match or is outdated, update from all_users
            if (JSON.stringify(userData) !== JSON.stringify(allUsers[username])) {
              localStorage.setItem("user_data", JSON.stringify(allUsers[username]));
            }
          } catch (e) {
            console.error("Error parsing user_data, restoring from all_users:", e);
            localStorage.setItem("user_data", JSON.stringify(allUsers[username]));
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
    
    // Always save the username and user data consistently
    localStorage.setItem("user_username", username);
    
    // Update the timestamp
    const updatedUserData = {
      ...userData,
      lastLogin: new Date().toISOString()
    };
    
    // Store user_data for the current session
    localStorage.setItem("user_data", JSON.stringify(updatedUserData));
    
    // Update all_users to ensure consistency across sessions
    let allUsers: UserStore = {};
    
    try {
      const allUsersStr = localStorage.getItem("all_users");
      if (allUsersStr) {
        allUsers = JSON.parse(allUsersStr);
      }
    } catch (e) {
      console.error("Error parsing all_users, creating new user store");
      allUsers = {};
    }
    
    // Update or create the user in all_users
    allUsers[username] = updatedUserData;
    
    // Save updated all_users
    localStorage.setItem("all_users", JSON.stringify(allUsers));
    console.log("User logged in successfully:", username);
    
    return true;
  } catch (error) {
    console.error("Error saving user data:", error);
    return false;
  }
};

export const logoutUser = (): void => {
  if (!isStorageAvailable()) return;
  
  try {
    const username = localStorage.getItem("user_username");
    console.log("Logging out user:", username);
    
    // Clear current user data
    localStorage.removeItem("user_username");
    localStorage.removeItem("user_data");
    
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error during logout:", error);
    // If error occurs during logout, try to clear everything
    try {
      localStorage.removeItem("user_username");
      localStorage.removeItem("user_data");
    } catch (e) {
      console.error("Failed to clear user data:", e);
    }
  }
};

export const getCurrentUser = () => {
  if (!isStorageAvailable()) return null;
  
  try {
    const username = localStorage.getItem("user_username");
    if (!username) return null;
    
    // First try to get from user_data (current session)
    const userDataStr = localStorage.getItem("user_data");
    if (userDataStr) {
      try {
        return {
          username,
          ...JSON.parse(userDataStr)
        };
      } catch (e) {
        console.error("Error parsing user_data:", e);
      }
    }
    
    // If user_data is missing, try to get from all_users
    const allUsersStr = localStorage.getItem("all_users");
    if (allUsersStr) {
      try {
        const allUsers = JSON.parse(allUsersStr);
        if (allUsers[username]) {
          // Found user in all_users, update user_data for consistency
          localStorage.setItem("user_data", JSON.stringify(allUsers[username]));
          return {
            username,
            ...allUsers[username]
          };
        }
      } catch (e) {
        console.error("Error parsing all_users:", e);
      }
    }
    
    // If we get here, we couldn't find valid user data
    return { username };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const updateCurrentUser = (userData: Partial<User>): boolean => {
  if (!isStorageAvailable()) return false;
  
  try {
    const username = localStorage.getItem("user_username");
    if (!username) return false;
    
    // First get current user data
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    // Update user data
    const updatedData = {
      ...currentUser,
      ...userData,
      lastActivity: new Date().toISOString()
    };
    
    // Update in user_data for current session
    localStorage.setItem("user_data", JSON.stringify(updatedData));
    
    // Also update in all_users for persistence across sessions
    try {
      let allUsers: UserStore = {};
      const allUsersStr = localStorage.getItem("all_users");
      
      if (allUsersStr) {
        allUsers = JSON.parse(allUsersStr);
      }
      
      allUsers[username] = {
        ...updatedData
      };
      
      localStorage.setItem("all_users", JSON.stringify(allUsers));
      return true;
    } catch (e) {
      console.error("Error updating all_users:", e);
      return false;
    }
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
    let allUsers: UserStore = {};
    
    try {
      const allUsersStr = localStorage.getItem("all_users");
      if (allUsersStr) {
        allUsers = JSON.parse(allUsersStr);
      }
    } catch (e) {
      console.error("Error parsing all_users, resetting:", e);
      allUsers = {};
    }
    
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
    
    // Save users
    localStorage.setItem("all_users", JSON.stringify(allUsers));
    console.log("User registered successfully:", username);
    
    // Set up initial referral stats
    try {
      let referralStats = {};
      const referralStatsStr = localStorage.getItem("referral_stats");
      
      if (referralStatsStr) {
        referralStats = JSON.parse(referralStatsStr);
      }
      
      referralStats[username] = { members: 0, earnings: 0 };
      localStorage.setItem("referral_stats", JSON.stringify(referralStats));
    } catch (e) {
      console.error("Error setting up referral stats:", e);
      // Initialize referral stats if corrupted
      const newReferralStats = {
        [username]: { members: 0, earnings: 0 }
      };
      localStorage.setItem("referral_stats", JSON.stringify(newReferralStats));
    }
    
    // Log user in
    loginUser(username, userData);
    
    return { success: true };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, error: "Registration failed" };
  }
};

export const getAllUsers = () => {
  if (!isStorageAvailable()) return {};
  
  try {
    const allUsersStr = localStorage.getItem("all_users");
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
