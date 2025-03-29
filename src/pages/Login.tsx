
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { loginUser, getAllUsers } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserCircle, Lock } from "lucide-react";

// Login form schema
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();
  
  // Check if user is already logged in
  useEffect(() => {
    const currentUser = localStorage.getItem("user_username");
    if (currentUser) {
      // If user is already logged in, redirect to member area
      navigate("/member-area");
    }
  }, [navigate]);
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    // Reset any previous error
    setLoginError(null);
    setIsLoading(true);
    
    try {
      console.log("Login attempt for user:", values.username);
      
      // Get all registered users
      const allUsers = getAllUsers();
      console.log("Available users:", Object.keys(allUsers));
      
      // Check if user exists
      if (!allUsers[values.username]) {
        console.log(`Login failed: User ${values.username} not found`);
        setLoginError("Invalid username or password");
        toast.error("Invalid username or password");
        setIsLoading(false);
        return;
      }
      
      // Verify password
      const userData = allUsers[values.username];
      
      if (userData.password === values.password) {
        // Login the user
        console.log(`Password matched for user ${values.username}, logging in`);
        const success = loginUser(values.username, userData);
        
        if (success) {
          console.log(`User ${values.username} logged in successfully`);
          toast.success("Login successful!");
          navigate("/member-area");
        } else {
          console.error("Failed to save login data to localStorage");
          setLoginError("Login failed - please try again");
          toast.error("Login failed");
        }
      } else {
        console.log(`Login failed: Incorrect password for ${values.username}`);
        setLoginError("Invalid username or password");
        toast.error("Invalid username or password");
      }
    } catch (e) {
      console.error('Error during login process:', e);
      setLoginError("An error occurred during login");
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  // For debugging - will show available users in development mode
  const debugUsers = () => {
    try {
      const users = getAllUsers();
      console.log("Available users:", users);
      if (Object.keys(users).length === 0) {
        toast.info("No users registered yet. Please register first.");
      } else {
        toast.info(`Available users: ${Object.keys(users).join(', ')}`);
      }
    } catch (error) {
      console.error("Error accessing users:", error);
      toast.error("Error accessing user data");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <img 
          src="/lovable-uploads/ed9037d0-d55e-4bd5-b525-febf2587d57b.png" 
          alt="Creator Space Logo" 
          className={`mb-8 ${isMobile ? "h-16 w-auto" : "h-24 w-auto"}`}
        />
        <div className="w-full max-w-md space-y-8 glass-card p-8 rounded-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Member Login</h1>
            <p className="text-muted-foreground mt-2">Log in to access your member area</p>
          </div>
          
          {loginError && (
            <div className="bg-red-500/10 p-3 rounded-md border border-red-500/30 mb-4">
              <p className="text-sm text-white">{loginError}</p>
            </div>
          )}
          
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="johndoe" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input type="password" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-[#f9166f] hover:bg-[#d01359]"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <div className="text-center mt-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={debugUsers}
                >
                  Show Available Users
                </Button>
              </div>
            </form>
          </Form>

          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register">
                <Button
                  variant="link"
                  className="text-primary p-0"
                >
                  Sign up
                </Button>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
