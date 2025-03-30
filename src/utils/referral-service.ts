
import { STORAGE_KEYS } from './auth-types';
import { dbRefString, dbReferrals } from './indexedDB';
import { getAllUsers } from './auth-service';

// Helper function to store referral information
export const setReferral = async (referrer: string): Promise<boolean> => {
  try {
    // Validate the referrer exists
    const allUsers = await getAllUsers();
    if (!allUsers[referrer]) {
      console.warn(`Attempted to set referral for non-existent user: ${referrer}`);
      return false;
    }
    
    await dbRefString.set(referrer);
    console.log(`Set referral to: ${referrer}`);
    return true;
  } catch (error) {
    console.error("Error setting referral:", error);
    return false;
  }
};

// Get the current referral
export const getReferral = async (): Promise<string | null> => {
  return await dbRefString.get();
};

// Clear referral data
export const clearReferral = async (): Promise<void> => {
  await dbRefString.remove();
};

// Get referral stats for a user
export const getReferralStats = async (username: string) => {
  try {
    const stats = await dbReferrals.get(username);
    return stats || { members: 0, earnings: 0 };
  } catch (error) {
    console.error("Error getting referral stats:", error);
    return { members: 0, earnings: 0 };
  }
};
