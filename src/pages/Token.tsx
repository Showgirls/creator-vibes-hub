
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Token = () => {
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
        <div className="w-full max-w-4xl mx-auto glass-card p-5 sm:p-10 rounded-lg mb-8 sm:mb-12">
          {/* What is FkiTTLeroue Token? Section */}
          <section className="mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              What is FkiTTLeroue Token?
            </h1>
            <p className="text-lg sm:text-xl text-[#D6BCFA] mb-8 leading-relaxed">
              The FkiTT Token is the backbone of our ecosystem, designed to empower users and enhance their experience on the platform. 
              As a utility token, payments within the FkiTT platform are made solely with the FkiTT Token. 
              By holding or using the FkiTT Token, users can enjoy seamless integration with the platform while benefiting from a range of incentives. 
              It's more than just a token – it's a key to the FkiTT Network. 
              Join our growing community and leverage the power of the FkiTT Token to maximize your potential.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <a href="https://fkitt.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-[#f9166f] hover:bg-[#d01359] text-white px-4 sm:px-8 py-4 text-base sm:text-lg h-auto">
                  GET STARTED
                </Button>
              </a>
              <a href="https://fkitt.com/buy" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full border-[#f9166f] text-[#D6BCFA] hover:bg-[#f9166f]/10 px-4 sm:px-8 py-4 text-base sm:text-lg h-auto"
                >
                  BUY $LEROUE
                </Button>
              </a>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-12 bg-[#2D3748]/30 rounded-lg p-5 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Benefits of FkiTT Token
            </h2>
            <p className="text-base sm:text-lg text-[#D6BCFA] mb-6 leading-relaxed">
              The FkiTT Token offers numerous benefits that make it an essential part of our ecosystem. Token holders gain exclusive access to our platform. 
              $FkiTT is the sole payment provider within the network. When a member pays his one monthly fee in $FkiTT Token he has access to all models 
              and creators completely unrestricted. Unlike other platforms where you pay subscriptions to each model/creator. This means the $FkiTT token is 
              required to access the platform. Payment into the network is in $FkiTT Token, a portion goes back into the market, the vast majority gets 
              transferred to SOL and sent to models ($85%) and affiliates (5%), while 5% is for admin and 5% is burned, insuring an ever shrinking supply, 
              which is good new for holders. Holding FkiTT Tokens also provides a stake in the future growth of the ecosystem, fostering a sense of community 
              and shared success. With its utility-driven design, The FkiTT Token empowers users to get the most out of the platform while enjoying unparalleled 
              advantages within the FkiTT ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <a href="https://fkitt.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-[#f9166f] hover:bg-[#d01359] text-white px-4 sm:px-8 py-4 text-base sm:text-lg h-auto">
                  GET STARTED
                </Button>
              </a>
              <a href="https://fkitt.com/token/buy" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full border-[#f9166f] text-[#D6BCFA] hover:bg-[#f9166f]/10 px-4 sm:px-8 py-4 text-base sm:text-lg h-auto"
                >
                  BUY $LEROUE
                </Button>
              </a>
            </div>
          </section>

          {/* Tokenomics Section */}
          <section className="mb-12 bg-[#2D3748]/30 rounded-lg p-5 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Tokenomics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <ul className="space-y-3 text-[#D6BCFA]">
                  <li><span className="font-semibold">Name:</span> FkiTT</li>
                  <li><span className="font-semibold">Ticker:</span> $FkiTT</li>
                  <li><span className="font-semibold">Total Supply:</span> 1,000,000,000</li>
                  <li><span className="font-semibold">Freeze:</span> Revoked</li>
                  <li><span className="font-semibold">Mint:</span> Revoked</li>
                </ul>
              </div>
              <div>
                <ul className="space-y-3 text-[#D6BCFA]">
                  <li><span className="font-semibold">Ownership:</span> Revoked</li>
                  <li><span className="font-semibold">Distribution:</span> Liquidity 100%</li>
                  <li><span className="font-semibold">Liquidity Locked:</span> 100% locked and burned</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <a href="https://fkitt.com/token/contract" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-[#f9166f] hover:bg-[#d01359] text-white px-4 sm:px-8 py-4 text-base sm:text-lg h-auto">
                  CONTRACT
                </Button>
              </a>
              <a href="https://fkitt.com/token/buy" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full border-[#f9166f] text-[#D6BCFA] hover:bg-[#f9166f]/10 px-4 sm:px-8 py-4 text-base sm:text-lg h-auto"
                >
                  BUY
                </Button>
              </a>
            </div>
          </section>

          {/* Roadmap Section */}
          <section className="bg-[#2D3748]/30 rounded-lg p-5 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              RoadMap
            </h2>
            <p className="text-base sm:text-lg text-[#D6BCFA] mb-6 leading-relaxed">
              The FkiTT Token roadmap outlines a strategic plan to build, scale, and accelerate the growth and adoption of our platform and ecosystem. 
              The roadmap is divided into three key phases: Foundation and Community Growth, Scaling Operations and Enhancing Services, and Accelerating
              Growth and Adoption.
              <br /><br />
              Each phase encompasses specific goals and initiatives designed to achieve our vision of creating a robust, engaged, and sustainable community
              around the FkITT Token.
            </p>
            <div className="flex justify-center">
              <a href="https://fkitt.com/token/paper" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-[#f9166f] hover:bg-[#d01359] text-white px-4 sm:px-8 py-4 text-base sm:text-lg h-auto">
                  More info
                </Button>
              </a>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Token;
