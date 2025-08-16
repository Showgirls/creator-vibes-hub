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
import { resetPassword } from "@/hooks/useSupabaseAuth";
import { useIsMobile } from "@/hooks/use-mobile";
import { Mail } from "lucide-react";

// Forgot password form schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const isMobile = useIsMobile();
  
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    setIsLoading(true);
    
    try {
      const result = await resetPassword(values.email);
      
      if (result.success) {
        setEmailSent(true);
        toast.success("Password reset email sent! Check your inbox.");
      } else {
        toast.error(result.error || "Failed to send reset email");
      }
    } catch (e) {
      console.error('Error during password reset:', e);
      toast.error("An error occurred while sending reset email");
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <img 
            src="/lovable-uploads/ed9037d0-d55e-4bd5-b525-febf2587d57b.png" 
            alt="Creator Space Logo" 
            className={`mb-8 ${isMobile ? "h-16 w-auto" : "h-24 w-auto"}`}
          />
          <div className="w-full max-w-md space-y-8 glass-card p-8 rounded-lg text-center">
            <div className="mb-6">
              <Mail className="mx-auto h-12 w-12 text-primary mb-4" />
              <h1 className="text-2xl font-bold">Check Your Email</h1>
              <p className="text-muted-foreground mt-2">
                We've sent a password reset link to your email address.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={() => navigate("/login")}
                className="w-full"
              >
                Back to Login
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setEmailSent(false)}
                className="w-full"
              >
                Send Another Email
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold">Reset Password</h1>
            <p className="text-muted-foreground mt-2">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>
          
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="email@example.com" className="pl-10" {...field} />
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
                {isLoading ? "Sending..." : "Send Reset Email"}
              </Button>
            </form>
          </Form>

          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link to="/login">
                <Button
                  variant="link"
                  className="text-primary p-0"
                >
                  Sign in
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

export default ForgotPassword;