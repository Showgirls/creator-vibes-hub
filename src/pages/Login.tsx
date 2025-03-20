
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

// Login form schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    // In a real application, this would validate credentials against a backend
    // For demo purposes, we'll just simulate a successful login
    localStorage.setItem("isLoggedIn", "true");
    toast.success("Login successful!");
    navigate("/member-area");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <img 
          src="/lovable-uploads/ed9037d0-d55e-4bd5-b525-febf2587d57b.png" 
          alt="FkiTT Logo" 
          className="h-24 mb-8"
        />
        <div className="w-full max-w-md space-y-8 glass-card p-8 rounded-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Member Login</h1>
            <p className="text-muted-foreground mt-2">Log in to access your member area</p>
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
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
              <Button
                variant="link"
                className="text-primary p-0"
                onClick={() => navigate("/register")}
              >
                Sign up
              </Button>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
