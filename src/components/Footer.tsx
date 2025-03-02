
import { Twitter, Instagram } from "lucide-react";
import { FaTiktok } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-[#1A1F2C] text-[#8E9196] py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#D6BCFA]">Affiliates</a></li>
              <li><a href="#" className="hover:text-[#D6BCFA]">Contact</a></li>
              <li><a href="#" className="hover:text-[#D6BCFA]">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#D6BCFA]">Terms of Use</a></li>
              <li><a href="#" className="hover:text-[#D6BCFA]">DMCA</a></li>
              <li><a href="#" className="hover:text-[#D6BCFA]">USC 2257</a></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#D6BCFA]">Anti-Trafficking Statement</a></li>
              <li><a href="#" className="hover:text-[#D6BCFA]">Fan-Creator Contract</a></li>
              <li><a href="#" className="hover:text-[#D6BCFA]">Complaints Policy</a></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#D6BCFA]">Acceptable Use Policy</a></li>
              <li><Link to="/token" className="hover:text-[#D6BCFA]">Token</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <p className="text-sm mb-4 md:mb-0">©2025 Fkitt. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-white hover:text-[#D6BCFA]">
              <FaTiktok className="w-6 h-6" />
            </a>
            <a href="#" className="text-white hover:text-[#D6BCFA]">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-white hover:text-[#D6BCFA]">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
