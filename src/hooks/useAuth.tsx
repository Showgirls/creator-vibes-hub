
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create a more robust authentication checking hook
export const useAuthCheck = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check for authentication
    try {
      const username = localStorage.getItem("user_username");
      
      if (!username) {
        console.log("No authenticated user found, redirecting to login");
        // Clear any potentially corrupted data
        localStorage.removeItem("user_data");
        navigate("/login");
        return;
      }
      
      // Verify the user exists in the all_users data
      const allUsersStr = localStorage.getItem("all_users");
      if (allUsersStr) {
        const allUsers = JSON.parse(allUsersStr);
        if (!allUsers[username]) {
          console.log("User exists in session but not in all_users, logging out");
          logoutUser();
          navigate("/login");
          return;
        }
      }
      
      // Successfully authenticated
      console.log("User authenticated:", username);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error during authentication check:", error);
      logoutUser();
      navigate("/login");
    }
  }, [navigate]);
  
  return isAuthenticated;
};

// Helper functions for authentication
export const loginUser = (username, userData) => {
  try {
    // Save user data
    localStorage.setItem("user_username", username);
    localStorage.setItem("user_data", JSON.stringify(userData));
    
    // Make sure all_users includes this user
    const allUsers = getAllUsers();
    if (!allUsers[username]) {
      allUsers[username] = userData;
      localStorage.setItem("all_users", JSON.stringify(allUsers));
    }
    
    console.log("User logged in successfully:", username);
    return true;
  } catch (error) {
    console.error("Error saving user data:", error);
    return false;
  }
};

export const logoutUser = () => {
  try {
    localStorage.removeItem("user_username");
    localStorage.removeItem("user_data");
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

export const getCurrentUser = () => {
  try {
    const username = localStorage.getItem("user_username");
    if (!username) return null;
    
    const userData = localStorage.getItem("user_data");
    if (!userData) return { username };
    
    return {
      username,
      ...JSON.parse(userData)
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const updateCurrentUser = (userData) => {
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
    const allUsers = getAllUsers();
    if (allUsers[username]) {
      allUsers[username] = {
        ...allUsers[username],
        ...userData,
        lastActivity: new Date().toISOString()
      };
      localStorage.setItem("all_users", JSON.stringify(allUsers));
    }
    
    return true;
  } catch (error) {
    console.error("Error updating user data:", error);
    return false;
  }
};

export const registerUser = (username, email, password) => {
  try {
    // Check if username already exists
    const allUsers = getAllUsers();
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
    allUsers[username] = {
      email,
      password,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isPremium: false
    };
    
    // Save users
    localStorage.setItem("all_users", JSON.stringify(allUsers));
    console.log("User registered successfully:", username);
    
    // Set up initial referral stats
    const referralStats = JSON.parse(localStorage.getItem("referral_stats") || "{}");
    referralStats[username] = { members: 0, earnings: 0 };
    localStorage.setItem("referral_stats", JSON.stringify(referralStats));
    
    // Log user in
    loginUser(username, allUsers[username]);
    
    return { success: true };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, error: "Registration failed" };
  }
};

export const getAllUsers = () => {
  try {
    const users = localStorage.getItem("all_users");
    return users ? JSON.parse(users) : {};
  } catch (error) {
    console.error("Error getting all users:", error);
    return {};
  }
};
