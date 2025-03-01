
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

const Home = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date: May 8th 2025 at 8pm UTC
    const targetDate = new Date('2025-05-08T20:00:00Z');
    
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
      <div className="flex-1 flex flex-col items-center p-8 bg-gradient-to-b from-[#1A1F2C] to-[#2D3748]">
        {/* Logo */}
        <img 
          src="/lovable-uploads/ed9037d0-d55e-4bd5-b525-febf2587d57b.png" 
          alt="Fkitt Logo" 
          className="h-28 mb-12 mt-8"
        />
        
        {/* Main content container */}
        <div className="max-w-4xl w-full mx-auto text-center glass-card p-10 rounded-lg mb-12">
          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            FkiTT is Coming – The Future of Adult Content is Here!
          </h1>
          
          {/* Subheader */}
          <p className="text-xl md:text-2xl text-[#D6BCFA] mb-12 leading-relaxed">
            Join now for a lifetime membership at just $48 (normally $28/month)! 
            Offer ends when the clock stops. Secure your spot before launch and 
            enjoy unlimited access while supporting creators like never before!
          </p>
          
          {/* Countdown timer */}
          <div className="bg-[#2D3748]/50 rounded-lg p-6 mb-10 inline-block">
            <p className="text-white text-lg mb-2">Limited Time Offer - Until May 8th 2025</p>
            <div className="flex justify-center gap-4 text-[#9b87f5]">
              <div className="text-center">
                <div className="text-5xl font-bold">{formatNumber(timeLeft.days)}</div>
                <div className="text-sm">DAYS</div>
              </div>
              <div className="text-5xl font-bold">:</div>
              <div className="text-center">
                <div className="text-5xl font-bold">{formatNumber(timeLeft.hours)}</div>
                <div className="text-sm">HOURS</div>
              </div>
              <div className="text-5xl font-bold">:</div>
              <div className="text-center">
                <div className="text-5xl font-bold">{formatNumber(timeLeft.minutes)}</div>
                <div className="text-sm">MINS</div>
              </div>
              <div className="text-5xl font-bold">:</div>
              <div className="text-center">
                <div className="text-5xl font-bold">{formatNumber(timeLeft.seconds)}</div>
                <div className="text-sm">SECS</div>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-4">
            <Link to="/register" className="w-full sm:w-auto flex-1">
              <Button size="lg" className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-6 text-lg h-auto">
                Register Now
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto flex-1">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full border-[#9b87f5] text-[#D6BCFA] hover:bg-[#9b87f5]/10 px-8 py-6 text-lg h-auto"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
