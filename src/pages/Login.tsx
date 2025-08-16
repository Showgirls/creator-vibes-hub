
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { connectWallet, signInWithWallet, useWalletAuth } from "@/hooks/useWalletAuth";
import { useIsMobile } from "@/hooks/use-mobile";
import { Wallet } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [needsUsername, setNeedsUsername] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const isMobile = useIsMobile();
  
  const { isAuthenticated, isChecking } = useWalletAuth();

  // Check if user is already logged in
  useEffect(() => {
    if (!isChecking && isAuthenticated) {
      navigate("/member-area");
    }
  }, [isAuthenticated, isChecking, navigate]);

  const handleWalletLogin = async () => {
    setLoginError(null);
    setIsLoading(true);
    
    try {
      // First connect wallet
      const connectResult = await connectWallet();
      
      if (!connectResult.success) {
        setLoginError(connectResult.error || "Failed to connect wallet");
        toast.error(connectResult.error || "Failed to connect wallet");
        return;
      }
      
      const walletAddr = connectResult.walletAddress!;
      setWalletAddress(walletAddr);
      
      // Try to sign in with wallet
      const result = await signInWithWallet(walletAddr);
      
      if (result.success) {
        if (result.isNewUser) {
          toast.success("Account created successfully!");
        } else {
          toast.success("Login successful!");
        }
        navigate("/member-area");
      } else if (result.needsUsername) {
        setNeedsUsername(true);
        toast.info("Please choose a username for your new account");
      } else {
        setLoginError(result.error || "Login failed");
        toast.error(result.error || "Login failed");
      }
    } catch (e) {
      console.error('Error during wallet login:', e);
      setLoginError("An error occurred during wallet login");
      toast.error("An error occurred during wallet login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameSubmit = async () => {
    if (!username.trim()) {
      toast.error("Please enter a username");
      return;
    }
    
    if (!walletAddress) {
      toast.error("Wallet not connected");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await signInWithWallet(walletAddress, username);
      
      if (result.success) {
        toast.success("Account created successfully!");
        navigate("/member-area");
      } else {
        setLoginError(result.error || "Failed to create account");
        toast.error(result.error || "Failed to create account");
      }
    } catch (e) {
      console.error('Error creating account:', e);
      setLoginError("An error occurred while creating account");
      toast.error("An error occurred while creating account");
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
          <div className="text-center">
            <h1 className="text-2xl font-bold">Member Login</h1>
            <p className="text-muted-foreground mt-2">Connect your Solana wallet to access your member area</p>
          </div>
          
          {loginError && (
            <div className="bg-red-500/10 p-3 rounded-md border border-red-500/30 mb-4">
              <p className="text-sm text-white">{loginError}</p>
            </div>
          )}
          
          {!needsUsername ? (
            <div className="space-y-6">
              <Button 
                onClick={handleWalletLogin}
                className="w-full bg-[#f9166f] hover:bg-[#d01359] flex items-center gap-2"
                disabled={isLoading}
              >
                <Wallet className="h-4 w-4" />
                {isLoading ? "Connecting..." : "Connect Solana Wallet"}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Choose a Username</label>
                <Input 
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button 
                onClick={handleUsernameSubmit}
                className="w-full bg-[#f9166f] hover:bg-[#d01359]"
                disabled={isLoading || !username.trim()}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
              <Button 
                onClick={() => {
                  setNeedsUsername(false);
                  setWalletAddress(null);
                  setUsername("");
                }}
                variant="outline"
                className="w-full"
              >
                Back
              </Button>
            </div>
          )}

          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              New to Solana wallets?{" "}
              <a 
                href="https://phantom.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Get Phantom Wallet
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
