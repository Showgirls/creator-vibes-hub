
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Home = () => {
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
          
          {/* Timer placeholder - could be replaced with an actual countdown timer */}
          <div className="bg-[#2D3748]/50 rounded-lg p-6 mb-10 inline-block">
            <p className="text-white text-lg">Limited Time Offer</p>
            <div className="text-4xl font-bold text-[#9b87f5]">48:00:00</div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-4">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-6 text-lg h-auto">
                Register Now
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-[#9b87f5] text-[#D6BCFA] hover:bg-[#9b87f5]/10 px-8 py-6 text-lg h-auto"
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
