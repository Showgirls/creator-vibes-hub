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
import { registerUser, getReferral, setReferral, getCurrentUser } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [referredBy, setReferredByState] = useState<string | null>(null);
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  // Check for referral in URL and if user is logged in
  useEffect(() => {
    const init = async () => {
      try {
        // Check if user is already logged in
        const currentUser = await getCurrentUser();
        if (currentUser) {
          // If user is already logged in, redirect to member area
          navigate("/member-area");
          return;
        }
        
        // Check URL for referral code
        const urlParams = new URLSearchParams(location.search);
        const ref = urlParams.get('ref');
        
        if (ref) {
          console.log('Setting referral from URL:', ref);
          await setReferral(ref);
          setReferredByState(ref);
        } else {
          // Check storage if no URL parameter
          const storedReferral = await getReferral();
          if (storedReferral) {
            console.log('Using stored referral:', storedReferral);
            setReferredByState(storedReferral);
          }
        }
      } catch (error) {
        console.error("Error checking referral:", error);
      }
    };
    
    init();
  }, [location, navigate]);

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

  const onSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
    // Reset any previous error
    setRegistrationError(null);
    setIsLoading(true);
    
    try {
      console.log("Attempting to register user:", values.username);
      
      // Register the new user
      const result = await registerUser(values.username, values.email, values.password);
      
      if (result.success) {
        console.log("Registration successful for:", values.username);
        toast.success("Account created successfully!");
        navigate("/member-area");
      } else {
        console.error("Registration failed:", result.error);
        setRegistrationError(result.error || "Registration failed");
        toast.error(result.error || "Registration failed");
      }
    } catch (e) {
      console.error('Error during registration:', e);
      setRegistrationError("An error occurred during registration");
      toast.error("An error occurred during registration");
    } finally {
      setIsLoading(false);
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
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
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
