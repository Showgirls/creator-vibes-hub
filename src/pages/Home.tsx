import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const location = useLocation();

  useEffect(() => {
    // Check for referral in URL
    const queryParams = new URLSearchParams(location.search);
    const referralCode = queryParams.get('ref');
    
    if (referralCode) {
      // Store the referral in localStorage
      localStorage.setItem('referredBy', referralCode);
      console.log(`User was referred by: ${referralCode}`);
      
      // In a real implementation, you'd call your backend API here to track this referral
      // For now, we'll just simulate by incrementing stats in localStorage
      const referrerStats = localStorage.getItem(`referralStats_${referralCode}`);
      if (referrerStats) {
        const stats = JSON.parse(referrerStats);
        stats.members += 1;
        localStorage.setItem(`referralStats_${referralCode}`, JSON.stringify(stats));
      } else {
        // Initialize stats for this referrer
        localStorage.setItem(`referralStats_${referralCode}`, JSON.stringify({
          members: 1,
          models: 0,
          earnings: 0
        }));
      }
    }
  }, [location]);

  useEffect(() => {
    // Set target date: April 28th 2025 at 8pm UTC
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
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center p-4 sm:p-8 bg-gradient-to-b from-[#1A1F2C] to-[#2D3748]">
        {/* Logo */}
        <img 
          src="/lovable-uploads/ed9037d0-d55e-4bd5-b525-febf2587d57b.png" 
          alt="Fkitt Logo" 
          className="h-16 sm:h-28 mb-6 sm:mb-12 mt-4 sm:mt-8"
        />
        
        {/* Main content container */}
        <div className="w-full max-w-4xl mx-auto text-center glass-card p-5 sm:p-10 rounded-lg mb-8 sm:mb-12">
          {/* Main heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f9166f] mb-4 sm:mb-6">
            FkiTT is Coming – The Future of Adult Content is Here!
          </h1>
          
          {/* Subheader - UPDATED TEXT HERE */}
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 sm:mb-12 leading-relaxed">
            Join now for a lifetime membership at just $20 (normally $28/month or $280/year)! 
            Offer ends when the clock stops. Secure your spot before launch and 
            enjoy unlimited access while supporting creators like never before! <em>*Offer is limited to the first 5000 $FkiTT holders!</em>
          </p>
          
          {/* Countdown timer - Improved for mobile - UPDATED COLORS HERE */}
          <div className="bg-[#2D3748]/50 rounded-lg p-4 sm:p-6 mb-8 sm:mb-10 w-full sm:inline-block">
            <p className="text-[#f9166f] text-xl sm:text-2xl mb-2 font-bold">FkiTT is live in:</p>
            <div className="flex justify-center gap-2 sm:gap-4 text-white">
              <div className="text-center">
                <div className="text-3xl sm:text-5xl font-bold">{formatNumber(timeLeft.days)}</div>
                <div className="text-xs sm:text-sm">DAYS</div>
              </div>
              <div className="text-3xl sm:text-5xl font-bold">:</div>
              <div className="text-center">
                <div className="text-3xl sm:text-5xl font-bold">{formatNumber(timeLeft.hours)}</div>
                <div className="text-xs sm:text-sm">HOURS</div>
              </div>
              <div className="text-3xl sm:text-5xl font-bold">:</div>
              <div className="text-center">
                <div className="text-3xl sm:text-5xl font-bold">{formatNumber(timeLeft.minutes)}</div>
                <div className="text-xs sm:text-sm">MINS</div>
              </div>
              <div className="text-3xl sm:text-5xl font-bold">:</div>
              <div className="text-center">
                <div className="text-3xl sm:text-5xl font-bold">{formatNumber(timeLeft.seconds)}</div>
                <div className="text-xs sm:text-sm">SECS</div>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-4">
            <Link to="/register" className="w-full sm:w-auto flex-1">
              <Button size="lg" className="w-full bg-[#f9166f] hover:bg-[#d01359] text-white px-4 sm:px-8 py-4 sm:py-6 text-base sm:text-lg h-auto">
                Register Now
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto flex-1">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full border-[#f9166f] text-white hover:bg-[#f9166f]/10 px-4 sm:px-8 py-4 sm:py-6 text-base sm:text-lg h-auto"
              >
                Login
              </Button>
            </Link>
          </div>
          
          {/* New content sections */}
          <div className="mt-12 space-y-8 sm:space-y-12">
            {/* First section */}
            <div className="bg-[#2D3748]/30 rounded-lg p-5 sm:p-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f9166f] mb-3 sm:mb-4">
                Welcome to FkiTT – The First Revenue-Sharing Adult Platform!
              </h2>
              <p className="text-base sm:text-lg text-white leading-relaxed">
                Why pay per creator when you can pay once and access them all? For just one monthly fee, 
                you unlock unlimited content from every creator on the platform. No extra charges, 
                no hidden fees—just pure, unrestricted access.
              </p>
            </div>
            
            {/* Second section */}
            <div className="bg-[#2D3748]/30 rounded-lg p-5 sm:p-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f9166f] mb-3 sm:mb-4">
                Creators Wanted!
              </h2>
              <p className="text-base sm:text-lg text-white leading-relaxed">
                Models can apply directly in the members area and start earning.
              </p>
            </div>
            
            {/* Duplicate action buttons after creators section */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-6 sm:mt-8">
              <Link to="/register" className="w-full sm:w-auto flex-1">
                <Button size="lg" className="w-full bg-[#f9166f] hover:bg-[#d01359] text-white px-4 sm:px-8 py-4 sm:py-6 text-base sm:text-lg h-auto">
                  Register Now
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto flex-1">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full border-[#f9166f] text-white hover:bg-[#f9166f]/10 px-4 sm:px-8 py-4 sm:py-6 text-base sm:text-lg h-auto"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
