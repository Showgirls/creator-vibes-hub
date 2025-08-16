import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Twitter, Mail, Copy, Check, ExternalLink, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuthCheck, signOut } from "@/hooks/useSupabaseAuth";

const MemberArea = () => {
  const { user, profile, isAuthenticated, isChecking } = useAuthCheck();
  const [copied, setCopied] = useState(false);
  const [showLimitedOfferDialog, setShowLimitedOfferDialog] = useState(false);
  const [referralStats, setReferralStats] = useState({
    members: 0,
    earnings: 0
  });
  const [isPremium, setIsPremium] = useState(false);
  
  // Show loading while checking auth
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  }
  
  const username = profile?.username || user?.email || "Member";
  
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) {
      toast.success("Logged out successfully");
      window.location.href = '/login';
    } else {
      toast.error("Error logging out");
    }
  };
  
  // Countdown timer effect
  useEffect(() => {
    // Set target date: April 28th 2025 at 8pm UTC - same as home page
    const targetDate = new Date('2025-04-28T20:00:00Z');
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        // Timer expired
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }
      
      // Calculate time units
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    };
    
    // Calculate initially
    calculateTimeLeft();
    
    // Update timer every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Cleanup
    return () => clearInterval(timer);
  }, []);
  
  // Format timer values to always show two digits
  const formatNumber = (num) => {
    return num.toString().padStart(2, '0');
  };

  const shareLink = "https://fkitt.com";
  const shareMessage = "FkiTT is Coming!!! Join the hottest revolution before it is too late!!! Hotties are waiting!\n\nJoin now: https://fkitt.com or join @fkittcom for info!\n#fkitt $fkitt";
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleCopyMessage = () => {
    navigator.clipboard.writeText(shareMessage);
    toast.success("Share message copied to clipboard!");
  };
  
  const handleShareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`;
    window.open(twitterUrl, '_blank');
  };
  
  const handleShareReddit = () => {
    const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(shareLink)}&title=${encodeURIComponent("FkiTT is Coming!!!")}`;
    window.open(redditUrl, '_blank');
  };
  
  const handleShareEmail = () => {
    const subject = encodeURIComponent("FkiTT is Coming!!!");
    const body = encodeURIComponent(shareMessage);
    const emailUrl = `mailto:?subject=${subject}&body=${body}`;
    window.open(emailUrl, '_blank');
  };
  
  const handleShareTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareLink)}&text=${encodeURIComponent(shareMessage)}`;
    window.open(telegramUrl, '_blank');
  };
  
  const handleBuyNowClick = () => {
    setShowLimitedOfferDialog(true);
  };

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
              <div className="flex gap-2">
                <Link to="/">
                  <Button 
                    variant="outline" 
                    className="border-[#f9166f] text-white hover:bg-[#f9166f]/10"
                  >
                    Back to Home
                  </Button>
                </Link>
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  className="border-red-500 text-red-500 hover:bg-red-500/10"
                >
                  Logout
                </Button>
              </div>
            </div>

          {/* Limited Offer Countdown Banner */}
          <div className="mb-8 px-6 py-4 rounded-lg bg-gradient-to-r from-[#f9166f]/30 to-[#f9166f]/10 border border-[#f9166f]/30">
            <h2 className="text-2xl md:text-3xl font-bold text-[#FFD700] mb-2">
              LIMITED LIFETIME MEMBERSHIP OFFER
            </h2>
            <p className="text-xl text-[#FFD700] font-semibold mb-4">Closing soon!</p>
            
            {/* Countdown timer */}
            <div className="bg-[#2D3748]/50 rounded-lg p-4 inline-block">
              <div className="flex justify-center gap-2 sm:gap-4 text-white">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">{formatNumber(timeLeft.days)}</div>
                  <div className="text-xs sm:text-sm">DAYS</div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold">:</div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">{formatNumber(timeLeft.hours)}</div>
                  <div className="text-xs sm:text-sm">HOURS</div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold">:</div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">{formatNumber(timeLeft.minutes)}</div>
                  <div className="text-xs sm:text-sm">MINS</div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold">:</div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">{formatNumber(timeLeft.seconds)}</div>
                  <div className="text-xs sm:text-sm">SECS</div>
                </div>
              </div>
            </div>
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
                To learn more about becoming a model/creator and to learn the benefits <Link to="/models" className="text-[#f9166f] hover:underline">CLICK HERE</Link>
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
                  <span className="text-xl font-bold text-[#f9166f]">Limited time only $20 worth of $FKITT Tokens</span>
                  <span className="text-muted-foreground italic">[Normal price: $28 per month or $280 per year]</span>
                </div>
                <p className="text-muted-foreground mb-6">
                  *Payment is with FkiTT token. Make sure you have Phantom wallet installed with the token available.
                  <Link to="/token" className="text-[#D6BCFA] ml-1 hover:underline">
                    Learn more
                  </Link>
                </p>
                <p className="italic text-muted-foreground mb-6">
                  **Offer is limited to the first 5000 holders of $FkiTT Token (MUST HOLD UNTIL LAUNCH TO BE ELIGIBLE).
                </p>
                <div className="flex justify-start">
                  <Button
                    onClick={handleBuyNowClick}
                    className="w-full sm:w-[180px] bg-[#f9166f] hover:bg-[#d01359] text-white px-4 sm:px-8 py-4 text-base sm:text-lg h-auto"
                  >
                    BUY NOW
                  </Button>

                  {/* Limited Offer Dialog */}
                  <Dialog open={showLimitedOfferDialog} onOpenChange={setShowLimitedOfferDialog}>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-center">Time is running out!</DialogTitle>
                        <DialogDescription className="text-center pt-4">
                          <p className="text-lg mb-6">
                            This limited lifetime offer is only for the first 5000 holders of FkiTT.
                          </p>
                          <Link to="/token">
                            <Button 
                              className="w-full sm:w-auto bg-[#f9166f] hover:bg-[#d01359] text-white px-8 py-3 text-lg font-semibold"
                            >
                              BUY $FKITT
                            </Button>
                          </Link>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
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

          {/* $FkiTT Token Section - Added with higher emphasis */}
          <Card className="glass-card mb-12">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                $FkiTT Token
              </h2>
              <p className="text-foreground mb-6">
                Payment on FkiTT is simple and instant. No nasty surprises on your credit card bill. We use our own token to accept payments and convert that to pay creators in USDT.
                Launch date: April 15th 2025 1pm UTC
              </p>
              <div className="flex justify-start">
                <Link to="/token" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-[180px] bg-[#f9166f] hover:bg-[#d01359] text-white px-4 sm:px-8 py-4 text-base sm:text-lg h-auto"
                  >
                    MORE INFO
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Phukk Me & Win Section */}
          <Card className="glass-card mb-12">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Phukk Me & Win!
              </h2>
              <p className="text-foreground mb-6">
                Do you want a chance to win $10,000 by swiping and voting for hotties? The game is simple, click below to access and vote via twitter. Each post/vote registers you 10 entries into the $10,000 contest.
              </p>
              <div className="flex justify-start">
                <a href="https://phukk.me" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-[180px] bg-[#f9166f] hover:bg-[#d01359] text-white px-4 sm:px-8 py-4 text-base sm:text-lg h-auto"
                  >
                    ENTER PHUKK ME
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Referral Contest Section */}
          <Card className="glass-card">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Generate a buzz and win $10,000
              </h2>
              <p className="text-foreground mb-6">
                Share the love by copying and pasting the link or by using the share buttons. 1 lucky winner will win $10,000. 
                To enter the 10k contest, please show proof of your submission {" "}
                <a 
                  href="https://fkitt.com/10k" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#f9166f] hover:underline flex items-center inline"
                >
                  here
                  <ExternalLink className="inline-block ml-1 w-4 h-4" />
                </a>
              </p>
              
              {/* Copy Link Section */}
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 p-3 bg-sidebar rounded-md flex items-center">
                    <span className="text-sm text-foreground font-mono truncate">
                      {shareLink}
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
                
                {/* Share Buttons */}
                <div className="p-4 bg-sidebar rounded-md">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Share on social media</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      onClick={handleShareTwitter} 
                      className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/80 w-[120px] h-[40px]"
                    >
                      <Twitter className="mr-2" />
                      Twitter
                    </Button>
                    <Button 
                      onClick={handleShareReddit} 
                      className="bg-[#FF4500] hover:bg-[#FF4500]/80 w-[120px] h-[40px]"
                    >
                      <Share2 className="mr-2" />
                      Reddit
                    </Button>
                    <Button 
                      onClick={handleShareEmail} 
                      className="bg-[#DB4437] hover:bg-[#DB4437]/80 w-[120px] h-[40px]"
                    >
                      <Mail className="mr-2" />
                      Email
                    </Button>
                    <Button 
                      onClick={handleShareTelegram} 
                      className="bg-[#0088cc] hover:bg-[#0088cc]/80 w-[120px] h-[40px]"
                    >
                      <img 
                        src="/lovable-uploads/7cf1fb93-6f35-4b25-a1dd-5358aaa35b12.png" 
                        alt="Telegram" 
                        className="w-4 h-4 mr-2" 
                      />
                      Telegram
                    </Button>
                    <Button 
                      onClick={handleCopyMessage} 
                      className="bg-[#333] hover:bg-[#333]/80 w-[120px] h-[40px]"
                    >
                      <Copy className="mr-2" />
                      Copy
                    </Button>
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
