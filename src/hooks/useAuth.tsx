import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthCheck = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    try {
      console.log("Running auth check...");
      
      // Check if the user is logged in - use direct access to avoid type coercion
      const isLoggedInValue = localStorage.getItem("isLoggedIn");
      const activeUser = localStorage.getItem("activeUser");
      
      console.log("Auth check - isLoggedIn value:", isLoggedInValue, "activeUser:", activeUser);
      
      // Make sure we have both isLoggedIn flag and activeUser
      if (isLoggedInValue !== "true" || !activeUser) {
        console.log("Auth check failed: User not properly logged in", 
          "isLoggedIn:", isLoggedInValue, 
          "activeUser:", activeUser);
        navigate("/login");
        return;
      }
      
      // Get users from localStorage with better error handling
      try {
        const usersStr = localStorage.getItem("allUsers");
        console.log("Auth check - raw users string:", usersStr);
        
        if (!usersStr || usersStr === "undefined" || usersStr === "null") {
          console.error("No users found in localStorage or invalid data");
          // Clear invalid state
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("activeUser");
          navigate("/login");
          return;
        }
        
        const allUsers = JSON.parse(usersStr);
        console.log("Auth check - available users:", Object.keys(allUsers));
        
        // Verify that the active user exists in our storage
        if (!allUsers || !allUsers[activeUser]) {
          console.log("Auth check failed: Active user data not found", activeUser);
          // Clear invalid state
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("activeUser");
          navigate("/login");
        } else {
          console.log("Auth check passed for user:", activeUser);
          setIsAuthenticated(true);
          
          // Update last activity timestamp to keep track of session
          try {
            allUsers[activeUser].lastActivity = new Date().toISOString();
            localStorage.setItem("allUsers", JSON.stringify(allUsers));
            console.log("Updated last activity for user:", activeUser);
          } catch (error) {
            console.error("Error updating last activity:", error);
          }
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
        // Clear potentially corrupted data
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("activeUser");
        navigate("/login");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      navigate("/login");
    }
  }, [navigate]);
  
  return isAuthenticated;
};
