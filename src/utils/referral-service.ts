
import { ReferralStatsStore, STORAGE_KEYS } from './auth-types';
import { storage } from './storage';
import { getAllUsers } from './auth-service';

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

// Get referral stats for a user
export const getReferralStats = (username: string) => {
  try {
    const stats = storage.get<ReferralStatsStore>(STORAGE_KEYS.REFERRAL_STATS) || {};
    return stats[username] || { members: 0, earnings: 0 };
  } catch (error) {
    console.error("Error getting referral stats:", error);
    return { members: 0, earnings: 0 };
  }
};
