
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthCheck = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    try {
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
      
      // Verify that the active user exists in our storage
      const allUsers = JSON.parse(localStorage.getItem("allUsers") || "{}");
      console.log("Auth check - available users:", Object.keys(allUsers));
      
      if (!allUsers[activeUser]) {
        console.log("Auth check failed: Active user data not found");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("activeUser");
        navigate("/login");
      } else {
        console.log("Auth check passed for user:", activeUser);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      navigate("/login");
    }
  }, [navigate]);
  
  return null;
};
