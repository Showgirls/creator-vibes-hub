
import { useState } from "react";
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

// Login form schema
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    // Reset any previous error
    setLoginError(null);
    
    try {
      // Get all users from localStorage
      const allUsers = JSON.parse(localStorage.getItem("allUsers") || "{}");
      console.log("Available users:", Object.keys(allUsers));
      
      // Check if the user exists
      if (!allUsers[values.username]) {
        console.log(`Login failed: User ${values.username} not found`);
        setLoginError("Invalid username or password");
        toast.error("Invalid username or password");
        return;
      }
      
      // Verify the password
      const userData = allUsers[values.username];
      
      if (userData.password === values.password) {
        // Set active user in localStorage
        localStorage.setItem("activeUser", values.username);
        localStorage.setItem("isLoggedIn", "true");
        
        console.log(`User ${values.username} logged in successfully`);
        toast.success("Login successful!");
        navigate("/member-area");
      } else {
        console.log(`Login failed: Incorrect password for ${values.username}`);
        setLoginError("Invalid username or password");
        toast.error("Invalid username or password");
      }
    } catch (e) {
      console.error('Error during login process:', e);
      setLoginError("An error occurred during login");
      toast.error("An error occurred during login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <img 
          src="/lovable-uploads/ed9037d0-d55e-4bd5-b525-febf2587d57b.png" 
          alt="Creator Space Logo" 
          className="h-24 mb-8"
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
                      <Input placeholder="johndoe" {...field} />
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
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-[#f9166f] hover:bg-[#d01359]">
                Login
              </Button>
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
