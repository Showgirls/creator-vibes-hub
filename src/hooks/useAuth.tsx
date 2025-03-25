
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

// User type definition for better type safety
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  lastLogin: string;
  lastActivity?: string;
  isPremium: boolean;
}

// Create a more robust authentication checking hook
export const useAuthCheck = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    // Check for authentication using Supabase session
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("No authenticated session found, redirecting to login");
          setIsAuthenticated(false);
          setIsChecking(false);
          navigate("/login");
          return;
        }
        
        // Get user profile data from the users table
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (userError || !userData) {
          console.log("User exists in auth but not in profile table, logging out");
          await logoutUser();
          setIsChecking(false);
          navigate("/login");
          return;
        }
        
        // Successfully authenticated
        console.log("User authenticated:", userData.username);
        setIsAuthenticated(true);
        setIsChecking(false);
        
        // Update last_login time
        await supabase
          .from('users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', session.user.id);
      } catch (error) {
        console.error("Error during authentication check:", error);
        setIsAuthenticated(false);
        setIsChecking(false);
        navigate("/login");
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  return { isAuthenticated, isChecking };
};

// Helper functions for authentication
export const loginUser = async (username: string, password: string): Promise<{ success: boolean, error?: string }> => {
  try {
    console.log("Attempting to login user:", username);
    
    // First, get the email associated with the username
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('email')
      .eq('username', username)
      .single();
    
    if (userError || !userData) {
      console.error("User not found:", username);
      return { success: false, error: "Invalid username or password" };
    }
    
    // Now sign in with email/password
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: password,
    });
    
    if (error) {
      console.error("Login error:", error.message);
      return { success: false, error: "Invalid username or password" };
    }
    
    // Update last login time
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', data.user.id);
    
    console.log("User logged in successfully:", username);
    return { success: true };
  } catch (error) {
    console.error("Error during login:", error);
    return { success: false, error: "An error occurred during login" };
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await supabase.auth.signOut();
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();
    
    if (error || !data) return null;
    
    return {
      id: data.id,
      username: data.username,
      email: data.email,
      createdAt: data.created_at,
      lastLogin: data.last_login,
      lastActivity: data.last_activity,
      isPremium: data.is_premium
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const updateCurrentUser = async (userData: Partial<User>): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return false;
    
    // Convert from camelCase to snake_case for database
    const { error } = await supabase
      .from('users')
      .update({
        username: userData.username,
        email: userData.email,
        last_login: new Date().toISOString(),
        last_activity: userData.lastActivity,
        is_premium: userData.isPremium
      })
      .eq('id', session.user.id);
    
    if (error) {
      console.error("Error updating user data:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error updating user data:", error);
    return false;
  }
};

export const registerUser = async (username: string, email: string, password: string) => {
  try {
    console.log("Registering new user:", username);
    
    // Check if username already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('username')
      .eq('username', username);
    
    if (checkError) {
      console.error("Error checking existing username:", checkError);
      return { success: false, error: "Error checking username availability" };
    }
    
    if (existingUser && existingUser.length > 0) {
      console.log("Username already exists:", username);
      return { success: false, error: "Username already exists" };
    }
    
    // Register user with Supabase Auth
    console.log("Attempting to sign up with Supabase Auth");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username
        }
      }
    });
    
    if (error) {
      console.error("Registration error:", error.message);
      return { success: false, error: error.message };
    }
    
    if (!data.user) {
      console.error("Registration failed: No user returned");
      return { success: false, error: "Registration failed" };
    }
    
    console.log("Auth signup successful, creating user profile");
    
    // Create user profile in the users table
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: data.user.id,
        username,
        email,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
        is_premium: false
      });
    
    if (profileError) {
      console.error("Error creating user profile:", profileError);
      return { success: false, error: "Error creating user profile" };
    }
    
    // Set up initial referral stats
    const { error: referralError } = await supabase
      .from('referral_stats')
      .insert({
        username,
        members: 0,
        earnings: 0
      });
    
    if (referralError) {
      console.error("Error setting up referral stats:", referralError);
      // Continue anyway as this is not critical
    }
    
    console.log("User registered successfully:", username);
    return { success: true };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, error: "Registration failed due to a server error" };
  }
};

export const getReferralStats = async (username: string) => {
  try {
    const { data, error } = await supabase
      .from('referral_stats')
      .select('*')
      .eq('username', username)
      .single();
    
    if (error) {
      console.error("Error getting referral stats:", error);
      return { members: 0, earnings: 0 };
    }
    
    return {
      members: data.members || 0,
      earnings: data.earnings || 0
    };
  } catch (error) {
    console.error("Error getting referral stats:", error);
    return { members: 0, earnings: 0 };
  }
};

// Function to process referrals when a new user registers
export const processReferral = async (referredBy: string) => {
  if (!referredBy) return;
  
  try {
    console.log("Processing referral for:", referredBy);
    
    // Update the referrer's stats
    const { data, error } = await supabase
      .from('referral_stats')
      .select('*')
      .eq('username', referredBy)
      .single();
    
    if (error) {
      // Create stats if they don't exist
      await supabase
        .from('referral_stats')
        .insert({
          username: referredBy,
          members: 1,
          earnings: 0
        });
    } else {
      // Update existing stats
      await supabase
        .from('referral_stats')
        .update({
          members: (data.members || 0) + 1
        })
        .eq('username', referredBy);
    }
    
    console.log("Updated referral stats for:", referredBy);
  } catch (e) {
    console.error("Error updating referral stats:", e);
  }
};
