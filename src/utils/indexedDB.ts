
/**
 * IndexedDB wrapper with proper error handling
 */

// Database configuration
const DB_NAME = "creatorSpaceDB";
const DB_VERSION = 1;
const USERS_STORE = "users";
const REFERRALS_STORE = "referrals";
const CURRENT_USER_STORE = "currentUser";

// Initialize the database
const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = (event) => {
      console.error("Error opening database:", event);
      reject("Could not open database");
    };
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create users store
      if (!db.objectStoreNames.contains(USERS_STORE)) {
        const usersStore = db.createObjectStore(USERS_STORE, { keyPath: "username" });
        usersStore.createIndex("email", "email", { unique: true });
      }
      
      // Create referrals store
      if (!db.objectStoreNames.contains(REFERRALS_STORE)) {
        const referralsStore = db.createObjectStore(REFERRALS_STORE, { keyPath: "username" });
      }
      
      // Create current user store
      if (!db.objectStoreNames.contains(CURRENT_USER_STORE)) {
        db.createObjectStore(CURRENT_USER_STORE, { keyPath: "id" });
      }
    };
  });
};

// Generic database operation wrapper
const dbOperation = async <T>(
  storeName: string,
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => IDBRequest<T>
): Promise<T> => {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, mode);
      const store = transaction.objectStore(storeName);
      const request = operation(store);
      
      request.onsuccess = () => {
        resolve(request.result);
      };
      
      request.onerror = (event) => {
        console.error(`Error in ${mode} operation on ${storeName}:`, event);
        reject(request.error);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error(`Failed to perform ${mode} operation on ${storeName}:`, error);
    throw error;
  }
};

// Database API for users
export const dbUsers = {
  getAll: async () => {
    try {
      const db = await initDB();
      return new Promise<Record<string, any>>((resolve, reject) => {
        const transaction = db.transaction(USERS_STORE, "readonly");
        const store = transaction.objectStore(USERS_STORE);
        const request = store.getAll();
        
        request.onsuccess = () => {
          const users = request.result.reduce((acc: Record<string, any>, user) => {
            acc[user.username] = user;
            return acc;
          }, {});
          resolve(users);
        };
        
        request.onerror = () => {
          reject(request.error);
        };
        
        transaction.oncomplete = () => {
          db.close();
        };
      });
    } catch (error) {
      console.error("Error getting all users:", error);
      return {};
    }
  },
  
  get: async (username: string) => {
    try {
      return await dbOperation(USERS_STORE, "readonly", (store) => 
        store.get(username)
      );
    } catch (error) {
      console.error(`Error getting user ${username}:`, error);
      return null;
    }
  },
  
  set: async (user: any) => {
    try {
      await dbOperation(USERS_STORE, "readwrite", (store) => 
        store.put(user)
      );
      return true;
    } catch (error) {
      console.error(`Error saving user ${user.username}:`, error);
      return false;
    }
  },
  
  remove: async (username: string) => {
    try {
      await dbOperation(USERS_STORE, "readwrite", (store) => 
        store.delete(username)
      );
      return true;
    } catch (error) {
      console.error(`Error removing user ${username}:`, error);
      return false;
    }
  }
};

// Database API for referrals
export const dbReferrals = {
  get: async (username: string) => {
    try {
      return await dbOperation(REFERRALS_STORE, "readonly", (store) => 
        store.get(username)
      );
    } catch (error) {
      console.error(`Error getting referral for ${username}:`, error);
      return null;
    }
  },
  
  getAll: async () => {
    try {
      const db = await initDB();
      return new Promise<Record<string, any>>((resolve, reject) => {
        const transaction = db.transaction(REFERRALS_STORE, "readonly");
        const store = transaction.objectStore(REFERRALS_STORE);
        const request = store.getAll();
        
        request.onsuccess = () => {
          const referrals = request.result.reduce((acc: Record<string, any>, ref) => {
            acc[ref.username] = ref;
            return acc;
          }, {});
          resolve(referrals);
        };
        
        request.onerror = () => {
          reject(request.error);
        };
        
        transaction.oncomplete = () => {
          db.close();
        };
      });
    } catch (error) {
      console.error("Error getting all referrals:", error);
      return {};
    }
  },
  
  set: async (referral: any) => {
    try {
      await dbOperation(REFERRALS_STORE, "readwrite", (store) => 
        store.put(referral)
      );
      return true;
    } catch (error) {
      console.error(`Error saving referral for ${referral.username}:`, error);
      return false;
    }
  },
  
  remove: async (username: string) => {
    try {
      await dbOperation(REFERRALS_STORE, "readwrite", (store) => 
        store.delete(username)
      );
      return true;
    } catch (error) {
      console.error(`Error removing referral for ${username}:`, error);
      return false;
    }
  }
};

// Database API for current user
export const dbCurrentUser = {
  get: async () => {
    try {
      return await dbOperation(CURRENT_USER_STORE, "readonly", (store) => 
        store.get("current")
      );
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  },
  
  set: async (username: string) => {
    try {
      await dbOperation(CURRENT_USER_STORE, "readwrite", (store) => 
        store.put({ id: "current", username })
      );
      return true;
    } catch (error) {
      console.error(`Error saving current user ${username}:`, error);
      return false;
    }
  },
  
  remove: async () => {
    try {
      await dbOperation(CURRENT_USER_STORE, "readwrite", (store) => 
        store.delete("current")
      );
      return true;
    } catch (error) {
      console.error("Error removing current user:", error);
      return false;
    }
  }
};

// Generic storage for referral string
export const dbRefString = {
  get: async () => {
    try {
      const result = await dbOperation(REFERRALS_STORE, "readonly", (store) => 
        store.get("referredBy")
      );
      return result ? result.value : null;
    } catch (error) {
      console.error("Error getting referral string:", error);
      return null;
    }
  },
  
  set: async (referrer: string) => {
    try {
      await dbOperation(REFERRALS_STORE, "readwrite", (store) => 
        store.put({ username: "referredBy", value: referrer })
      );
      return true;
    } catch (error) {
      console.error(`Error saving referral string ${referrer}:`, error);
      return false;
    }
  },
  
  remove: async () => {
    try {
      await dbOperation(REFERRALS_STORE, "readwrite", (store) => 
        store.delete("referredBy")
      );
      return true;
    } catch (error) {
      console.error("Error removing referral string:", error);
      return false;
    }
  }
};
