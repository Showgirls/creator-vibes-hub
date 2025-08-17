import { useState, useEffect, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface UserProfile {
  id: string;
  user_id: string;
  username: string;
  wallet_address: string;
  created_at: string;
  updated_at: string;
}

// Wallet auth check hook
export const useWalletAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  
  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
      setWalletAddress(data?.wallet_address || null);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }, []);
  
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session);
        
        // Fetch profile when user is authenticated
        if (session?.user) {
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setWalletAddress(null);
        }
        
        setIsChecking(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      
      setIsChecking(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchUserProfile]);
  
  return { isAuthenticated, isChecking, user, session, profile, walletAddress };
};

// Wallet connection functions
export const getPhantomProvider = () => {
  if ("solana" in window) {
    const provider = (window as any).solana;
    if (provider.isPhantom) {
      return provider;
    }
  }
  return null;
};

export const connectWallet = async () => {
  try {
    const provider = getPhantomProvider();
    if (!provider) {
      window.open("https://phantom.app/", "_blank");
      return { success: false, error: "Phantom wallet not found. Please install Phantom wallet." };
    }

    const response = await provider.connect();
    const walletAddress = response.publicKey.toString();
    
    return { success: true, walletAddress };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const signInWithWallet = async (walletAddress: string, username?: string) => {
  try {
    // Check if wallet already has an account
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('wallet_address', walletAddress)
      .maybeSingle();

    if (existingProfile) {
      // User exists, sign them in
      const { data, error } = await supabase.auth.signInAnonymously({
        options: {
          data: {
            wallet_address: walletAddress,
            username: existingProfile.username
          }
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data, isNewUser: false };
    } else {
      // New user, check if username is provided and available
      if (!username) {
        return { success: false, error: "Username required for new account", needsUsername: true };
      }

      const { data: usernameCheck } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .maybeSingle();

      if (usernameCheck) {
        return { success: false, error: "Username already exists" };
      }

      // Create new user
      const { data, error } = await supabase.auth.signInAnonymously({
        options: {
          data: {
            wallet_address: walletAddress,
            username: username
          }
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data, isNewUser: true };
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Custom hook to get and update current user
export const useWalletUser = () => {
  const { user, profile, walletAddress, isAuthenticated, isChecking } = useWalletAuth();
  
  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return { success: false, error: "Not authenticated" };
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('user_id', user.id);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };
  
  return {
    user,
    profile,
    walletAddress,
    isAuthenticated,
    isChecking,
    updateProfile
  };
};