
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
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

// Signup form schema
const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  age: z.boolean().refine((val) => val === true, {
    message: "You must confirm that you are 18 or older",
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the Terms of Service and Privacy Policy",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

interface IndexProps {
  isRegister?: boolean;
}

const Index = ({ isRegister = false }: IndexProps) => {
  const navigate = useNavigate();
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  // Get referral information from localStorage on component mount
  useEffect(() => {
    const referralCode = localStorage.getItem('referredBy');
    if (referralCode) {
      setReferredBy(referralCode);
      console.log('User was referred by:', referralCode, new Date().toISOString());
    }
  }, []);

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: false,
      terms: false,
    },
  });

  const onSignupSubmit = (values: z.infer<typeof signupSchema>) => {
    // Reset any previous error
    setRegistrationError(null);
    
    // Check if username or email already exists
    const usernameExists = localStorage.getItem(`user_${values.username}`);
    
    // Check if email is already used
    let emailExists = false;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('user_')) {
        try {
          const userData = JSON.parse(localStorage.getItem(key) || '{}');
          if (userData.email === values.email) {
            emailExists = true;
            break;
          }
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }
    }
    
    if (usernameExists) {
      setRegistrationError("Username already exists");
      toast.error("Username already exists");
      return;
    }
    
    if (emailExists) {
      setRegistrationError("Email already in use");
      toast.error("Email already in use");
      return;
    }
    
    // Create user object with credentials
    const userObject = {
      username: values.username,
      email: values.email,
      password: values.password,
      createdAt: new Date().toISOString(),
      isPremium: false
    };
    
    try {
      // Save user data with username as key for easier lookup
      localStorage.setItem(`user_${values.username}`, JSON.stringify(userObject));
      
      // Set active user
      localStorage.setItem("activeUser", values.username);
      localStorage.setItem("isLoggedIn", "true");
      
      // Initialize referral stats for this user
      const initialStats = {
        members: 0,
        earnings: 0
      };
      localStorage.setItem(`referralStats_${values.username}`, JSON.stringify(initialStats));
      
      console.log(`New user registered: ${values.username}`);
      
      // If the user was referred, increment referrer's stats
      if (referredBy) {
        console.log(`Processing referral completion for referrer: ${referredBy}`);
        
        try {
          const referrerStats = localStorage.getItem(`referralStats_${referredBy}`);
          if (referrerStats) {
            const stats = JSON.parse(referrerStats);
            console.log(`Current stats for ${referredBy} before signup credit:`, stats);
            
            // We specifically want to increment the members count
            stats.members = Number(stats.members) + 1;
            
            localStorage.setItem(`referralStats_${referredBy}`, JSON.stringify(stats));
            console.log(`Updated stats for ${referredBy} after signup:`, stats);
            
            // Dispatch storage event to notify other tabs/windows
            window.dispatchEvent(new StorageEvent('storage', {
              key: `referralStats_${referredBy}`,
              newValue: JSON.stringify(stats)
            }));
          } else {
            // Initialize stats for this referrer with one member
            console.log(`No existing stats found for ${referredBy}, creating new entry`);
            const newStats = {
              members: 1,
              earnings: 0
            };
            localStorage.setItem(`referralStats_${referredBy}`, JSON.stringify(newStats));
            
            // Dispatch storage event to notify other tabs/windows
            window.dispatchEvent(new StorageEvent('storage', {
              key: `referralStats_${referredBy}`,
              newValue: JSON.stringify(newStats)
            }));
          }
        } catch (error) {
          console.error('Error updating referrer stats on signup:', error);
        }
      }
      
      toast.success("Account created successfully!");
      navigate("/member-area");
    } catch (e) {
      console.error('Error saving user data:', e);
      setRegistrationError("An error occurred during registration");
      toast.error("An error occurred during registration");
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
          {referredBy && (
            <div className="bg-[#f9166f]/10 p-3 rounded-md border border-[#f9166f]/30 mb-4">
              <p className="text-sm text-white">You were referred by: <span className="font-semibold">{referredBy}</span></p>
            </div>
          )}
          
          {registrationError && (
            <div className="bg-red-500/10 p-3 rounded-md border border-red-500/30 mb-4">
              <p className="text-sm text-white">{registrationError}</p>
            </div>
          )}
          
          <div className="text-right mb-4">
            <Link to="/login">
              <Button variant="outline" className="border-[#f9166f] text-white hover:bg-[#f9166f]/10">
                Member Login
              </Button>
            </Link>
          </div>
          <Form {...signupForm}>
            <form
              onSubmit={signupForm.handleSubmit(onSignupSubmit)}
              className="space-y-6"
            >
              <FormField
                control={signupForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Username</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe" {...field} />
                    </FormControl>
                    <FormMessage className="text-white" />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage className="text-white" />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage className="text-white" />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage className="text-white" />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="age"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-white">
                        I confirm that I am 18 years or older
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-white">
                        I accept the Terms of Service and Privacy Policy
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
          </Form>

          <div className="text-center">
            <Link to="/login">
              <Button
                variant="link"
                className="text-white"
              >
                Already have an account? Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
