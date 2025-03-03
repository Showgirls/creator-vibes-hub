
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { ExternalLink, Copy, Check, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useAuthCheck } from "@/hooks/useAuth";

const MemberArea = () => {
  // Add authentication check
  useAuthCheck();
  
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const affiliateLink = "https://fkitt.com/ref/user123";
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    toast.success("Affiliate link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Member Area
            </h1>
            <Button 
              variant="outline" 
              className="border-[#f9166f] text-white hover:bg-[#f9166f]/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Model Sign up Section */}
          <Card className="glass-card mb-12">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Model Sign Up
              </h2>
              <p className="text-foreground mb-6">
                Use the button below to sign up as a model/creator so you can get started as soon as we go live on April 28th. All models that sign up before April 28th get an additional 3.5% of the total revenue share!
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
          <Card className="glass-card mb-12">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Buy Lifetime Membership
              </h2>
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-4">
                <span className="text-xl font-bold text-[#f9166f]">Limited time only $48</span>
                <span className="text-muted-foreground">Normal price: $28 per month or $280 per year</span>
              </div>
              <p className="text-muted-foreground mb-6">
                *Payment is with $FkiTT token. To learn how and where to buy $FkiTT Token 
                <Link to="/token" className="text-[#D6BCFA] ml-1 hover:underline">
                  click here
                </Link>
              </p>
              <div className="flex justify-start">
                <Button 
                  size="lg" 
                  className="w-full sm:w-[180px] bg-[#f9166f] hover:bg-[#d01359] text-white px-4 sm:px-8 py-4 text-base sm:text-lg h-auto"
                >
                  BUY NOW
                </Button>
              </div>
            </CardContent>
          </Card>

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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted p-4 rounded-md">
                      <p className="text-muted-foreground text-sm">Referred Members</p>
                      <p className="text-2xl font-bold text-foreground">0</p>
                    </div>
                    <div className="bg-muted p-4 rounded-md">
                      <p className="text-muted-foreground text-sm">Referred Models</p>
                      <p className="text-2xl font-bold text-foreground">0</p>
                    </div>
                    <div className="bg-muted p-4 rounded-md">
                      <p className="text-muted-foreground text-sm">Total Earnings</p>
                      <p className="text-2xl font-bold text-foreground">$0.00</p>
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
