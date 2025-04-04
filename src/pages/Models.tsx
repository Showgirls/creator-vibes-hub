
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Models = () => {
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
            {/* Title moved inside the container */}
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
              Model Benefits!
            </h1>
            
            <p className="text-lg">
              FkiTT is revolutionizing the adult content industry with a fair and transparent 
              revenue-sharing model. Unlike other platforms where subscribers pay a separate 
              subscription for each creator, FkiTT gives subscribers unlimited access to all 
              creators for one low monthly fee—no extra charges, no hidden costs.
            </p>
            
            <p className="text-lg">
              For creators, FkiTT offers a higher revenue share than other platforms (88%), 
              distributing earnings based on their popularity within the site. Plus, creators 
              can go live, chat, and connect with fans instantly, with 100% of live cam earnings 
              going directly to them instantly. There are no restrictions as to the links and 
              other socials and accounts so you can add links to all of your other accounts and websites.
            </p>
            
            <p className="text-lg">
              Daily payouts direct to you daily. If you wish to have paid live chats activated 
              on your profile then you get the funds sent directly to you from the subscriber 
              via the FkiTT platform.
            </p>
            
            <p className="text-lg font-bold text-center text-[#f9166f]">
              YOU GET PAID FAST, AT A HIGHER RATE THAN EVER BEFORE!
            </p>
            
            <p className="text-lg">
              Subscribers have an added incentive to join FkiTT because they get more options 
              for 1 fee, which means more subs, which means more $$$ for you!
            </p>
            
            <div className="text-center pt-4">
              <p className="text-xl italic mb-8">
                Seamless, fast, and fair—more money for creators, unlimited content for for subs!. Just FkiTT!
              </p>
              
              <Link to="/member-area">
                <Button size="lg" className="bg-[#f9166f] hover:bg-[#f9166f]/80 text-white font-bold py-3 px-8 rounded-md">
                  Sign Up Now
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

export default Models;
