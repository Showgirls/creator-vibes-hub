import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { ExternalLink, Copy, Check, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useAuthCheck, logoutUser, getCurrentUser, updateCurrentUser } from "@/hooks/useAuth";
import SolanaPayment from "@/components/SolanaPayment";

const MemberArea = () => {
  // Add authentication check
  const { isAuthenticated, isChecking } = useAuthCheck();
  
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [username, setUsername] = useState("");
  const [referralStats, setReferralStats] = useState({
    members: 0,
    earnings: 0
  });
  
  // Get affiliate link based on username
  const affiliateLink = `${window.location.origin}/?ref=${username}`;
  
  // Token and admin addresses for payment
  const tokenAddress = "3SXgM5nXZ5HZbhPyzaEjfVu5uShDjFPaM7a8TFg9moFm";
  const adminAddress = "44o43y41gytnCtJhaENskAYFoZqg5WyMVskMirbK6bZx";
  
  // Function to load the latest stats from localStorage
  const loadUserData = () => {
    // Get the current user
    const currentUser = getCurrentUser();
    if (!currentUser) {
      console.log("No current user found, redirecting to login");
      navigate("/login");
      return;
    }
    
    const currentUsername = currentUser.username;
    console.log("Loading data for user:", currentUsername);
    
    // Update the username state
    if (username !== currentUsername) {
      setUsername(currentUsername);
    }
    
    // Check premium status from current user data
    setIsPremium(currentUser.isPremium === true);
    console.log("Premium status:", currentUser.isPremium);
    
    // Load referral stats from both storages
    try {
      let referralStatsStr = sessionStorage.getItem("referral_stats");
      if (!referralStatsStr) {
        referralStatsStr = localStorage.getItem("referral_stats");
        // Sync to sessionStorage if found in localStorage
        if (referralStatsStr) {
          sessionStorage.setItem("referral_stats", referralStatsStr);
        }
      }
      
      if (referralStatsStr && referralStatsStr !== "undefined" && referralStatsStr !== "null") {
        const allStats = JSON.parse(referralStatsStr);
        if (allStats && allStats[currentUsername]) {
          console.log(`Loaded stats for ${currentUsername}:`, allStats[currentUsername]);
          setReferralStats(allStats[currentUsername]);
        } else {
          console.log("No referral stats found for user, initializing empty stats");
          setReferralStats({ members: 0, earnings: 0 });
          
          // Initialize stats for this user
          allStats[currentUsername] = { members: 0, earnings: 0 };
          const newStatsStr = JSON.stringify(allStats);
          localStorage.setItem("referral_stats", newStatsStr);
          sessionStorage.setItem("referral_stats", newStatsStr);
        }
      } else {
        // Initialize referral stats if not found
        const newReferralStats = {
          [currentUsername]: { members: 0, earnings: 0 }
        };
        const newStatsStr = JSON.stringify(newReferralStats);
        localStorage.setItem("referral_stats", newStatsStr);
        sessionStorage.setItem("referral_stats", newStatsStr);
      }
    } catch (error) {
      console.error('Error parsing referral stats:', error);
      // Initialize referral stats if corrupted
      const newReferralStats = {
        [currentUsername]: { members: 0, earnings: 0 }
      };
      const newStatsStr = JSON.stringify(newReferralStats);
      localStorage.setItem("referral_stats", newStatsStr);
      sessionStorage.setItem("referral_stats", newStatsStr);
    }
  };
  
  useEffect(() => {
    if (isAuthenticated && !isChecking) {
      // Load initial user data and stats
      loadUserData();
    }
  }, [isAuthenticated, isChecking, navigate]);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    toast.success("Affiliate link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleLogout = () => {
    logoutUser();
    toast.success("Logged out successfully");
    navigate("/login");
  };
  
  const handlePaymentSuccess = () => {
    // Update premium status in the current user's data
    const success = updateCurrentUser({ isPremium: true });
    
    if (success) {
      setIsPremium(true);
      toast.success("Premium membership activated!");
    } else {
      toast.error("Error updating membership status");
    }
  };

  if (isChecking) {
    return <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Loading...</p>
    </div>;
  }

  if (!isAuthenticated) {
    return null; // Don't render anything if not authenticated
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/ed9037d0-d55e-4bd5-b525-febf2587d57b.png" 
                alt="FkiTT Logo" 
                className="h-12 md:h-16"
              />
            </div>
            <Button 
              variant="outline" 
              className="border-[#f9166f] text-white hover:bg-[#f9166f]/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Premium Status Banner (shows only if premium) */}
          {isPremium && (
            <div className="mb-8 px-6 py-4 rounded-lg bg-gradient-to-r from-[#f9166f]/20 to-[#f9166f]/5 border border-[#f9166f]/30">
              <h2 className="text-2xl md:text-3xl font-bold text-[#FFD700]">
                PREMIUM LIFETIME MEMBER
              </h2>
              <p className="text-foreground mt-2">
                Thank you for your support! You now have lifetime access to all content.
              </p>
            </div>
          )}

          {/* Model Sign up Section */}
          <Card className="glass-card mb-12">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Model Sign Up
              </h2>
              <p className="text-foreground mb-6">
                Use the button below to sign up as a model/creator so you can get started as soon as we go live on April 28th. All models that sign up before April 28th get an additional 3.5% of the total revenue share!
              </p>
              <p className="text-foreground mb-6">
                To learn more about becoming a model/creator and to learn the benefits <a href="https://fkitt.com/models" target="_blank" rel="noopener noreferrer" className="text-[#f9166f] hover:underline">CLICK HERE</a>
              </p>
              <div className="flex justify-start">
                <a href="https://fkitt.com/model-signup" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-[180px] bg-[#f9166f] hover:bg-[#d01359] text-white px-4 sm:px-8 py-4 text-base sm:text-lg h-auto"
                  >
                    SIGN UP NOW
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Buy Lifetime Membership Section */}
          {!isPremium ? (
            <Card className="glass-card mb-12">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Buy Lifetime Membership
                </h2>
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-4">
                  <span className="text-xl font-bold text-[#f9166f]">Limited time only $20</span>
                  <span className="text-muted-foreground italic">[Normal price: $28 per month or $280 per year]</span>
                </div>
                <p className="text-muted-foreground mb-6">
                  *Payment is with FkiTT token. Make sure you have Phantom wallet installed with the token available.
                  <Link to="/token" className="text-[#D6BCFA] ml-1 hover:underline">
                    Learn more
                  </Link>
                </p>
                <div className="flex justify-start">
                  <SolanaPayment 
                    onPaymentSuccess={handlePaymentSuccess}
                    tokenAddress={tokenAddress}
                    adminAddress={adminAddress}
                    amount={20}
                    className="w-full sm:w-[180px] bg-[#f9166f] hover:bg-[#d01359] text-white px-4 sm:px-8 py-4 text-base sm:text-lg h-auto"
                  >
                    BUY NOW
                  </SolanaPayment>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass-card mb-12">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  Membership Status
                </h2>
                <p className="text-foreground mb-6">
                  You are a <span className="text-[#FFD700] font-bold">PREMIUM LIFETIME MEMBER</span>. 
                  Thank you for your support! You have unlimited access to all content on the platform.
                </p>
              </CardContent>
            </Card>
          )}

          {/* How it works Section */}
          <Card className="glass-card mb-12">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                How it works?
              </h2>
              <p className="text-foreground mb-6">
                FkiTT is revolutionizing the adult content industry with a fair and transparent revenue-sharing model. Unlike other platforms where you pay a separate subscription for each creator, FkiTT gives you unlimited access to all creators for one low monthly fee—no extra charges, no hidden costs.
              </p>
              <p className="text-foreground mb-6">
                For creators, FkiTT offers a higher revenue share than other platforms, distributing earnings based on their popularity within the site. Plus, creators can go live, chat, and connect with fans instantly, with 100% of live cam earnings going directly to them instantly.
              </p>
              <p className="text-foreground mb-6">
                Seamless, fast, and fair—more money for creators, unlimited content for you. Just FkiTT.
              </p>
            </CardContent>
          </Card>

          {/* Affiliate Link Section */}
          <Card className="glass-card">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Affiliate Link
              </h2>
              <p className="text-foreground mb-6">
                Refer members and get 5% over everything they spend until eternity. With the same link you get 5% of all earnings by any model you refer.
              </p>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 p-3 bg-sidebar rounded-md flex items-center">
                    <span className="text-sm text-foreground font-mono truncate">
                      {affiliateLink}
                    </span>
                  </div>
                  <Button
                    onClick={handleCopyLink}
                    variant="outline"
                    className="border-[#f9166f] text-white hover:bg-[#f9166f]/10"
                  >
                    {copied ? <Check className="mr-2" /> : <Copy className="mr-2" />}
                    {copied ? "Copied!" : "Copy Link"}
                  </Button>
                </div>
                <div className="p-4 bg-sidebar rounded-md">
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Your Stats</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-md">
                      <p className="text-muted-foreground text-sm">Referred Members</p>
                      <p className="text-2xl font-bold text-foreground">{referralStats.members}</p>
                    </div>
                    <div className="bg-muted p-4 rounded-md">
                      <p className="text-muted-foreground text-sm">Total Earnings</p>
                      <p className="text-2xl font-bold text-foreground">${referralStats.earnings.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MemberArea;
