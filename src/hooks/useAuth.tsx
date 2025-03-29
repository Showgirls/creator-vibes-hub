
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

// Simple storage access helper
const getStorage = (key: string): any => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error(`Error getting ${key} from storage:`, e);
    return null;
  }
};

const setStorage = (key: string, value: any): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error(`Error setting ${key} in storage:`, e);
    return false;
  }
};

// Auth check hook
export const useAuthCheck = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    try {
      const username = localStorage.getItem("user_username");
      console.log("Auth check for username:", username);
      
      if (!username) {
        console.log("No authenticated user found");
        setIsAuthenticated(false);
        setIsChecking(false);
        navigate("/login");
        return;
      }
      
      // Verify the user exists
      const allUsers = getAllUsers();
      if (!allUsers[username]) {
        console.log("User not found in storage");
        logoutUser();
        setIsAuthenticated(false);
        setIsChecking(false);
        navigate("/login");
        return;
      }
      
      // User is valid
      setIsAuthenticated(true);
      setIsChecking(false);
    } catch (error) {
      console.error("Error during authentication check:", error);
      setIsAuthenticated(false);
      setIsChecking(false);
      navigate("/login");
    }
  }, [navigate]);
  
  return { isAuthenticated, isChecking };
};

// Get all users from storage
export const getAllUsers = (): UserStore => {
  const allUsers = getStorage("all_users");
  return allUsers || {};
};

// Login user
export const loginUser = (username: string, userData: User): boolean => {
  try {
    // Get all users
    const allUsers = getAllUsers();
    
    // Make sure user exists
    if (!allUsers[username]) {
      return false;
    }
    
    // Update user data with login time
    allUsers[username] = {
      ...allUsers[username],
      lastLogin: new Date().toISOString()
    };
    
    // Save updated users
    setStorage("all_users", allUsers);
    
    // Set current user
    localStorage.setItem("user_username", username);
    setStorage("user_data", allUsers[username]);
    
    return true;
  } catch (error) {
    console.error("Error during login:", error);
    return false;
  }
};

// Logout user
export const logoutUser = (): void => {
  try {
    localStorage.removeItem("user_username");
    localStorage.removeItem("user_data");
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

// Get current user data
export const getCurrentUser = () => {
  try {
    const username = localStorage.getItem("user_username");
    if (!username) return null;
    
    const userData = getStorage("user_data");
    if (!userData) return null;
    
    return {
      username,
      ...userData
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Update current user data
export const updateCurrentUser = (userData: Partial<User>): boolean => {
  try {
    const username = localStorage.getItem("user_username");
    if (!username) return false;
    
    const allUsers = getAllUsers();
    if (!allUsers[username]) return false;
    
    // Update user
    allUsers[username] = {
      ...allUsers[username],
      ...userData
    };
    
    // Save changes
    setStorage("all_users", allUsers);
    setStorage("user_data", allUsers[username]);
    
    return true;
  } catch (error) {
    console.error("Error updating user data:", error);
    return false;
  }
};

// Register a new user
export const registerUser = (username: string, email: string, password: string) => {
  try {
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
    setStorage("all_users", allUsers);
    
    // Set up referral stats
    const referralStats = getStorage("referral_stats") || {};
    referralStats[username] = { members: 0, earnings: 0 };
    setStorage("referral_stats", referralStats);
    
    // Process referral if exists
    const referredBy = localStorage.getItem("referredBy");
    if (referredBy && referredBy !== username) {
      processReferral(referredBy);
    }
    
    // Log in the user
    loginUser(username, newUser);
    
    return { success: true };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, error: "Registration failed" };
  }
};

// Process a referral
const processReferral = (referrer: string) => {
  try {
    const referralStats = getStorage("referral_stats") || {};
    
    if (!referralStats[referrer]) {
      referralStats[referrer] = { members: 0, earnings: 0 };
    }
    
    // Increment members count
    referralStats[referrer].members = (referralStats[referrer].members || 0) + 1;
    
    // Save updated stats
    setStorage("referral_stats", referralStats);
    console.log("Updated referral stats for:", referrer);
    
    // Clear the referral after processing
    localStorage.removeItem("referredBy");
  } catch (e) {
    console.error("Error processing referral:", e);
  }
};
