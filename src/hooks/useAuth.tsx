
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// User type definition for better type safety
interface User {
  username: string;
  email: string;
  password: string;
  createdAt: string;
  lastLogin: string;
  isPremium: boolean;
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
  
  useEffect(() => {
    // Check for authentication
    if (!isStorageAvailable()) {
      console.error("Local storage is not available");
      navigate("/login");
      return;
    }
    
    try {
      const username = localStorage.getItem("user_username");
      console.log("Auth check for username:", username);
      
      if (!username) {
        console.log("No authenticated user found, redirecting to login");
        localStorage.clear(); // Clear all potentially corrupted data
        setIsAuthenticated(false);
        navigate("/login");
        return;
      }
      
      // Verify the user exists in the all_users data
      const allUsersStr = localStorage.getItem("all_users");
      if (!allUsersStr) {
        console.log("No users database found, logging out");
        logoutUser();
        navigate("/login");
        return;
      }
      
      try {
        const allUsers = JSON.parse(allUsersStr);
        if (!allUsers[username]) {
          console.log("User exists in session but not in all_users, logging out");
          logoutUser();
          navigate("/login");
          return;
        }
        
        // Successfully authenticated
        console.log("User authenticated:", username);
        setIsAuthenticated(true);
      } catch (e) {
        console.error("Error parsing user data:", e);
        logoutUser();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during authentication check:", error);
      logoutUser();
      navigate("/login");
    }
  }, [navigate]);
  
  return isAuthenticated;
};

// Helper functions for authentication
export const loginUser = (username: string, userData: Partial<User>): boolean => {
  if (!isStorageAvailable()) return false;
  
  try {
    console.log("Attempting to login user:", username);
    
    // Save user data with timestamp
    localStorage.setItem("user_username", username);
    
    // Update the timestamp
    const updatedUserData = {
      ...userData,
      lastLogin: new Date().toISOString()
    };
    
    localStorage.setItem("user_data", JSON.stringify(updatedUserData));
    
    // Make sure all_users includes this user
    const allUsersStr = localStorage.getItem("all_users") || "{}";
    try {
      const allUsers = JSON.parse(allUsersStr);
      
      if (!allUsers[username]) {
        allUsers[username] = updatedUserData;
      } else {
        // Update existing user data
        allUsers[username] = {
          ...allUsers[username],
          ...updatedUserData
        };
      }
      
      localStorage.setItem("all_users", JSON.stringify(allUsers));
      console.log("User logged in successfully:", username);
      return true;
    } catch (e) {
      console.error("Error parsing all_users:", e);
      // Initialize all_users if it's corrupted
      const newAllUsers = {
        [username]: updatedUserData
      };
      localStorage.setItem("all_users", JSON.stringify(newAllUsers));
      return true;
    }
  } catch (error) {
    console.error("Error saving user data:", error);
    return false;
  }
};

export const logoutUser = (): void => {
  if (!isStorageAvailable()) return;
  
  try {
    console.log("Logging out user");
    localStorage.removeItem("user_username");
    localStorage.removeItem("user_data");
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error during logout:", error);
    // If error occurs during logout, try to clear everything
    try {
      localStorage.clear();
    } catch (e) {
      console.error("Failed to clear localStorage:", e);
    }
  }
};

export const getCurrentUser = () => {
  if (!isStorageAvailable()) return null;
  
  try {
    const username = localStorage.getItem("user_username");
    if (!username) return null;
    
    const userData = localStorage.getItem("user_data");
    if (!userData) return { username };
    
    try {
      return {
        username,
        ...JSON.parse(userData)
      };
    } catch (e) {
      console.error("Error parsing user data:", e);
      return { username };
    }
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
    
    // Update user data in localStorage
    const updatedData = {
      ...currentUser,
      ...userData,
      lastActivity: new Date().toISOString()
    };
    
    // Update in both places for consistency
    localStorage.setItem("user_data", JSON.stringify(updatedData));
    
    // Also update in all_users
    const allUsersStr = localStorage.getItem("all_users");
    if (!allUsersStr) {
      // Initialize all_users if it doesn't exist
      const newAllUsers = {
        [username]: updatedData
      };
      localStorage.setItem("all_users", JSON.stringify(newAllUsers));
      return true;
    }
    
    try {
      const allUsers = JSON.parse(allUsersStr);
      if (allUsers[username]) {
        allUsers[username] = {
          ...allUsers[username],
          ...userData,
          lastActivity: new Date().toISOString()
        };
        localStorage.setItem("all_users", JSON.stringify(allUsers));
      }
      return true;
    } catch (e) {
      console.error("Error parsing all_users:", e);
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
    
    // Initialize all_users if it doesn't exist
    const allUsersStr = localStorage.getItem("all_users") || "{}";
    let allUsers;
    
    try {
      allUsers = JSON.parse(allUsersStr);
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
    const userData = {
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
      const referralStatsStr = localStorage.getItem("referral_stats") || "{}";
      const referralStats = JSON.parse(referralStatsStr);
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
    const users = localStorage.getItem("all_users");
    if (!users) return {};
    
    try {
      return JSON.parse(users);
    } catch (e) {
      console.error("Error parsing all_users:", e);
      return {};
    }
  } catch (error) {
    console.error("Error getting all users:", error);
    return {};
  }
};
