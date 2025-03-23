
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Logo at the top */}
          <div className="text-center mb-8">
            <img 
              src="/lovable-uploads/ed9037d0-d55e-4bd5-b525-febf2587d57b.png" 
              alt="FkiTT Logo" 
              className="h-16 md:h-20 mx-auto" 
            />
          </div>
          
          <div className="glass-card p-6 md:p-8 rounded-lg space-y-6 text-white">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
              Contact Us
            </h1>
            
            <p className="text-lg text-center">
              To contact the team at FkiTT please use the details below:
            </p>
            
            <div className="space-y-4 py-4">
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-semibold text-[#D6BCFA] mb-2">Email</h2>
                <a href="mailto:support@fkitt.com" className="text-lg hover:text-[#D6BCFA] transition-colors">
                  support@fkitt.com
                </a>
              </div>
              
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-semibold text-[#D6BCFA] mb-2">Telegram Support Group</h2>
                <a 
                  href="https://t.me/fkittt" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-lg hover:text-[#D6BCFA] transition-colors"
                >
                  https://t.me/fkittt
                </a>
              </div>
              
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-semibold text-[#D6BCFA] mb-2">Telegram Admin Chat</h2>
                <a 
                  href="https://t.me/phuxx" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-lg hover:text-[#D6BCFA] transition-colors"
                >
                  https://t.me/phuxx
                </a>
              </div>
            </div>
            
            <div className="text-center pt-4">
              <Link to="/">
                <Button size="lg" className="bg-[#f9166f] hover:bg-[#f9166f]/80 text-white font-bold py-3 px-8 rounded-md">
                  Back to Home
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

export default Contact;
