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
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const [hasRecordedVisit, setHasRecordedVisit] = useState(false);

  // Get referral information from URL or localStorage on component mount
  useEffect(() => {
    try {
      // First check URL for referral code
      const params = new URLSearchParams(location.search);
      const refCode = params.get('ref');
      
      if (refCode) {
        // Save the referral code to localStorage
        localStorage.setItem('referredBy', refCode);
        setReferredBy(refCode);
        console.log('User was referred by:', refCode);
        
        if (!hasRecordedVisit) {
          // Update referrer stats immediately when a user visits with their referral link
          updateReferrerStats(refCode, 'visit');
          setHasRecordedVisit(true);
        }
      } else {
        // Check localStorage if no URL param
        const storedRefCode = localStorage.getItem('referredBy');
        if (storedRefCode) {
          setReferredBy(storedRefCode);
          console.log('User was referred by (from storage):', storedRefCode);
        }
      }
    } catch (error) {
      console.error('Error processing referral:', error);
    }
  }, [location, hasRecordedVisit]);

  // Function to update referrer stats when someone uses their referral link
  const updateReferrerStats = (referrer: string, action: 'visit' | 'signup') => {
    try {
      console.log(`Updating stats for referrer: ${referrer}, Action: ${action}`);
      
      // Get current stats or initialize with default values
      let currentStats = {
        members: 0,
        earnings: 0
      };
      
      const referrerStatsString = localStorage.getItem(`referralStats_${referrer}`);
      if (referrerStatsString) {
        try {
          const parsedStats = JSON.parse(referrerStatsString);
          currentStats = {
            members: Number(parsedStats.members || 0),
            earnings: Number(parsedStats.earnings || 0)
          };
        } catch (e) {
          console.error('Error parsing referrer stats:', e);
        }
      }
      
      console.log(`Previous stats for ${referrer}:`, currentStats);
      
      // Update stats
      const updatedStats = {
        members: currentStats.members + 1,
        earnings: currentStats.earnings + 1.00
      };
      
      console.log(`Updated stats for ${referrer}:`, updatedStats);
      
      // Save updated stats back to localStorage
      localStorage.setItem(`referralStats_${referrer}`, JSON.stringify(updatedStats));
      
      // Dispatch a custom event to notify other components of the update
      window.dispatchEvent(new CustomEvent('referralStatsUpdated', { 
        detail: { referrer, stats: updatedStats }
      }));
      
      // Also dispatch a storage event for cross-tab updates
      window.dispatchEvent(new StorageEvent('storage', {
        key: `referralStats_${referrer}`,
        newValue: JSON.stringify(updatedStats),
        storageArea: localStorage
      }));
      
      console.log(`Successfully updated stats for referrer ${referrer} for ${action}`);
    } catch (error) {
      console.error('Error updating referrer stats:', error);
    }
  };

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
    try {
      // Save the user's information to localStorage
      localStorage.setItem("username", values.username);
      localStorage.setItem("email", values.email);
      localStorage.setItem("isLoggedIn", "true");
      
      // Initialize referral stats for this user
      const initialStats = {
        members: 0,
        earnings: 0
      };
      localStorage.setItem(`referralStats_${values.username}`, JSON.stringify(initialStats));
      
      // If the user was referred, update the referrer's stats again on signup
      if (referredBy) {
        console.log("Updating referrer stats on signup completion for:", referredBy);
        updateReferrerStats(referredBy, 'signup');
      }
      
      toast.success("Account created successfully!");
      navigate("/member-area");
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error("Something went wrong during signup. Please try again.");
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
