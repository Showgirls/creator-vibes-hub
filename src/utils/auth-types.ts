
export interface User {
  username: string;
  email: string;
  password: string;
  createdAt: string;
  lastLogin: string;
  isPremium: boolean;
}

export interface UserStore {
  [username: string]: User;
}

export interface ReferralStats {
  members: number;
  earnings: number;
}

export interface ReferralStatsStore {
  [username: string]: ReferralStats;
}

export const STORAGE_KEYS = {
  ALL_USERS: "all_users",
  CURRENT_USER: "user_username",
  USER_DATA: "user_data",
  REFERRAL: "referredBy",
  REFERRAL_STATS: "referral_stats"
};
