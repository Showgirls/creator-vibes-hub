
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@/utils/auth-types";
import { 
  getCurrentUser, 
  loginUser as login, 
  logoutUser as logout,
  registerUser as register,
  updateCurrentUser as update,
  getAllUsers as getUsers
} from "@/utils/auth-service";

import {
  setReferral as setRef,
  getReferral as getRef,
  clearReferral as clearRef,
  getReferralStats as getStats
} from "@/utils/referral-service";

// Re-export everything from the service
export const loginUser = login;
export const logoutUser = logout;
export const registerUser = register;
export const updateCurrentUser = update;
export const getAllUsers = getUsers;
export const setReferral = setRef;
export const getReferral = getRef;
export const clearReferral = clearRef;
export const getReferralStats = getStats;

// Auth check hook
export const useAuthCheck = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Get current user from storage
        const user = getCurrentUser();
        console.log("Auth check for user:", user?.username);
        
        if (!user) {
          console.log("No authenticated user found");
          setIsAuthenticated(false);
          setCurrentUser(null);
          return;
        }
        
        // User is valid
        setIsAuthenticated(true);
        setCurrentUser(user);
      } catch (error) {
        console.error("Error during auth check:", error);
        setIsAuthenticated(false);
        setCurrentUser(null);
      } finally {
        setIsChecking(false);
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  return { isAuthenticated, isChecking, currentUser };
};

// Custom hook to get and update current user
export const useUser = () => {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  
  const refreshUser = () => {
    setUser(getCurrentUser());
  };
  
  const updateUser = (data: Partial<User>) => {
    const success = updateCurrentUser(data);
    if (success) {
      refreshUser();
    }
    return success;
  };
  
  return {
    user,
    refreshUser,
    updateUser
  };
};
