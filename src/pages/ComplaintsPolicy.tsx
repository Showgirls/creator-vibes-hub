
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const ComplaintsPolicy = () => {
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
              Complaints Policy
            </h1>
            
            <div className="text-lg text-left space-y-4">
              <p className="font-bold text-center">BY USING OUR WEBSITE YOU AGREE TO THIS POLICY - PLEASE READ IT CAREFULLY</p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Introduction</h2>
              <p>
                This Policy forms part of your agreement with us. We will handle complaints in keeping with this Policy. Here are a few key things to note:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>By making a complaint, you confirm that you believe that the information you have provided is accurate and complete.</li>
                <li>This Policy explains how we handle complaints about:
                  <ul className="list-disc pl-6 mt-2">
                    <li>How we enforce our Terms of Service;</li>
                    <li>Content on FkiTT that may be illegal or in breach of our Terms of Service; and</li>
                    <li>Compliance with applicable laws.</li>
                  </ul>
                </li>
                <li>This Policy does not apply to complaints regarding Content or account moderation decisions or copyright infringement.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Contact Information</h2>
              <p>
                FkiTT is operated by FkiTT Ltd. If you have any complaints, please contact us at:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email: support@fkitt.com</li>
                <li>Website: https://fkitt.com</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Interpretation</h2>
              <p>
                Unless specifically defined in this Policy, the meanings given to words defined in the Terms of Use have the same meanings in this Policy.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Complaints About Content Moderation Decisions</h2>
              <p>
                We moderate Content according to our Terms of Service. To complain about a decision to deactivate Content, to deactivate an account, or to issue a final warning, you must complete a FkiTT Deactivation Appeal Form. Appeals against a Content moderation decision, including any decision to remove Content, deactivate an account, or ban you from using FkiTT due to a violation, are subject to our Appeals Policy.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Complaints About Copyright Infringement</h2>
              <p>
                Complaints about suspected copyright infringement are subject to our DMCA Takedown Policy.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">How to Make a Complaint About Anything Else</h2>
              <p>
                You can make a complaint in any of the following ways:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Using our Contact Form: Select the reason for your complaint from the drop-down menu and use the 'Enter your message' field to explain the issue you are complaining about.</li>
                <li>Using the "Report" function on the Content page: Select the reason for your complaint from the drop-down menu.</li>
                <li>Emailing: support@fkitt.com.</li>
              </ul>
              <p>
                You must provide enough information so we can investigate your complaint (including any relevant URLs). If a complaint is missing important information, we may not be able to properly consider it.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">How We Review Complaints</h2>
              <p>
                When reviewing a complaint:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We will review the relevant information and any supporting documents you have provided.</li>
                <li>We may request additional information or documents from you or from third parties to help us address your complaint.</li>
                <li>We will review your complaint in good faith and within any legally applicable time limit.</li>
                <li>If your complaint is regarding Content that appears on FkiTT and we determine that the Content constitutes a material violation of our Terms of Service, we will remove it.</li>
                <li>We will notify you when our review of your complaint is complete and of any action taken as a result of your complaint. If we determine that the Content complies with our Terms of Service and do not remove it, you can appeal our decision as described in our Appeals Policy.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Abuse of This Complaints Process</h2>
              <p>
                We do not tolerate complaints made in bad faith or complaints that are abusive, harassing, or otherwise intended to harm anyone. If you are a FkiTT User and make an abusive or unfounded complaint, we may terminate your account.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Regulatory Complaints Under Applicable Laws</h2>
              <p>
                If you are in the European Economic Area (EEA) and encounter an infringement of the EU's Digital Services Act while using FkiTT, you have the right to complain to the Digital Services Coordinator of the country where you are located. You may also report or complain to us under this Complaints Policy and dispute our decision under our Appeals Policy.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Your Statutory Rights</h2>
              <p>
                These provisions do not affect your statutory rights.
              </p>
              
              <p className="mt-4 text-right">
                <em>Last updated: March 2025</em>
              </p>
            </div>
            
            <div className="text-center pt-8">
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

export default ComplaintsPolicy;
