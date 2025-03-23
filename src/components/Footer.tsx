
import { Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-[#1A1F2C] text-[#8E9196] py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <ul className="space-y-2">
              <li><Link to="/login" className="hover:text-[#D6BCFA]">Affiliates</Link></li>
              <li><Link to="/contact" className="hover:text-[#D6BCFA]">Contact</Link></li>
              <li><a href="#" className="hover:text-[#D6BCFA]">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li><Link to="/terms" className="hover:text-[#D6BCFA]">Terms of Use</Link></li>
              <li><Link to="/terms" className="hover:text-[#D6BCFA]">DMCA</Link></li>
              <li><Link to="/terms" className="hover:text-[#D6BCFA]">USC 2257</Link></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li><Link to="/terms" className="hover:text-[#D6BCFA]">Anti-Trafficking Statement</Link></li>
              <li><a href="#" className="hover:text-[#D6BCFA]">Fan-Creator Contract</a></li>
              <li><a href="#" className="hover:text-[#D6BCFA]">Complaints Policy</a></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li><Link to="/terms" className="hover:text-[#D6BCFA]">Acceptable Use Policy</Link></li>
              <li><Link to="/token" className="hover:text-[#D6BCFA]">Token</Link></li>
              <li><Link to="/models" className="hover:text-[#D6BCFA]">Models</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <p className="text-sm mb-4 md:mb-0">©2025 Fkitt. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="https://t.me/fkittt" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#D6BCFA]">
              <img 
                src="/lovable-uploads/7cf1fb93-6f35-4b25-a1dd-5358aaa35b12.png" 
                alt="Telegram" 
                className="w-6 h-6 filter brightness-0 invert hover:brightness-100 hover:invert-0 transition-all" 
              />
            </a>
            <a href="https://www.instagram.com/fkittcom/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#D6BCFA]">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://x.com/fkittcom" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#D6BCFA]">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
