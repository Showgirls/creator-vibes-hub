
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthCheck = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const activeUser = localStorage.getItem("activeUser");
    
    // Make sure we have both isLoggedIn flag and activeUser
    if (!isLoggedIn || !activeUser) {
      console.log("Auth check failed: User not properly logged in");
      navigate("/login");
      return;
    }
    
    // Verify that the active user exists in our storage
    const userData = localStorage.getItem(`user_${activeUser}`);
    if (!userData) {
      console.log("Auth check failed: Active user data not found");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("activeUser");
      navigate("/login");
    }
  }, [navigate]);
  
  return null;
};
