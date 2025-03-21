import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthCheck = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    try {
      console.log("Running auth check...");
      
      // Check if the user is logged in
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const activeUser = localStorage.getItem("activeUser");
      
      console.log("Auth check - isLoggedIn:", isLoggedIn, "activeUser:", activeUser);
      
      // Make sure we have both isLoggedIn flag and activeUser
      if (!isLoggedIn || !activeUser) {
        console.log("Auth check failed: User not properly logged in");
        navigate("/login");
        return;
      }
      
      // Get users from localStorage with better error handling
      let allUsers = null;
      try {
        const usersStr = localStorage.getItem("allUsers");
        if (usersStr && usersStr !== "undefined" && usersStr !== "null") {
          allUsers = JSON.parse(usersStr);
          console.log("Auth check - available users:", Object.keys(allUsers));
        } else {
          console.error("No users found in localStorage or invalid data");
          navigate("/login");
          return;
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
        navigate("/login");
        return;
      }
      
      // Verify that the active user exists in our storage
      if (!allUsers || !allUsers[activeUser]) {
        console.log("Auth check failed: Active user data not found");
        navigate("/login");
      } else {
        console.log("Auth check passed for user:", activeUser);
        setIsAuthenticated(true);
        
        // Update last activity timestamp to keep track of session
        try {
          allUsers[activeUser].lastActivity = new Date().toISOString();
          localStorage.setItem("allUsers", JSON.stringify(allUsers));
        } catch (error) {
          console.error("Error updating last activity:", error);
        }
      }
    } catch (error) {
      console.error("Auth check error:", error);
      navigate("/login");
    }
  }, [navigate]);
  
  return isAuthenticated;
};
