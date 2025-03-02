
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
            <p className="text-white text-xl mb-2 font-bold">Intro Offer ends in:</p>
            <div className="flex justify-center gap-4 text-[#f9166f]">
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
              <Button size="lg" className="w-full bg-[#f9166f] hover:bg-[#d01359] text-white px-8 py-6 text-lg h-auto">
                Register Now
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto flex-1">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full border-[#f9166f] text-[#D6BCFA] hover:bg-[#f9166f]/10 px-8 py-6 text-lg h-auto"
              >
                Login
              </Button>
            </Link>
          </div>
          
          {/* New content sections */}
          <div className="mt-16 space-y-12">
            {/* First section */}
            <div className="bg-[#2D3748]/30 rounded-lg p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Welcome to FkiTT – The First Revenue-Sharing Adult Platform!
              </h2>
              <p className="text-lg text-[#D6BCFA] leading-relaxed">
                Why pay per creator when you can pay once and access them all? For just one monthly fee, 
                you unlock unlimited content from every creator on the platform. No extra charges, 
                no hidden fees—just pure, unrestricted access.
              </p>
            </div>
            
            {/* Second section */}
            <div className="bg-[#2D3748]/30 rounded-lg p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Creators Wanted!
              </h2>
              <p className="text-lg text-[#D6BCFA] leading-relaxed">
                Models can apply directly in the members area and start earning.
              </p>
            </div>
            
            {/* Duplicate action buttons after creators section */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
              <Link to="/register" className="w-full sm:w-auto flex-1">
                <Button size="lg" className="w-full bg-[#f9166f] hover:bg-[#d01359] text-white px-8 py-6 text-lg h-auto">
                  Register Now
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto flex-1">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full border-[#f9166f] text-[#D6BCFA] hover:bg-[#f9166f]/10 px-8 py-6 text-lg h-auto"
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
