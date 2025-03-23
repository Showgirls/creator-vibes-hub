
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
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
              Privacy Policy
            </h1>
            
            <div className="text-lg text-left space-y-4">
              <p className="text-center">
                <strong>Effective Date: 3rd March 2025</strong><br />
                <strong>Last Updated: 23rd March 2025</strong>
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">General</h2>
              <p>
                FkiTT Ltd (hereinafter referred to as "FkiTT") has established this Privacy Policy to govern the collection, use, and disclosure of your information when using our website, https://fkitt.com (hereinafter referred to as "Site"). By accessing and continuing to use the Site, you acknowledge that you have read and understand this Privacy Policy and agree to be bound by it.
              </p>
              <p>
                FkiTT reserves the right, at its sole discretion, to change, modify, add, or delete portions of this Privacy Policy. Any changes will be reflected by modifying the "Last Updated" date at the top of this page. Your continued use of the Site after such changes indicates your acceptance of the updated Privacy Policy. If you do not agree to the changes, you must discontinue your use of the Site immediately.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Information We Collect</h2>
              <p>
                We collect the following types of information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Information:</strong> When you register on the Site, you provide us with personal details such as your name, email address, phone number, date of birth, and payment details.</li>
                <li><strong>Usage Data:</strong> We collect information on how you use the Site, such as browsing behavior, time spent on the Site, and device information.</li>
                <li><strong>Payment Information:</strong> Payment transactions are processed through third-party payment providers. We do not store your full payment details.</li>
                <li><strong>Cookies & Tracking Technologies:</strong> We use cookies and other tracking technologies to enhance your experience on our Site.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">How We Use Your Information</h2>
              <p>
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our services</li>
                <li>To verify user identity and prevent fraud</li>
                <li>To process transactions and payments</li>
                <li>To communicate with users about updates, offers, and new features</li>
                <li>To ensure compliance with our Terms of Use</li>
                <li>To analyze user trends and improve our services</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Who We Share Your Information With</h2>
              <p>
                FkiTT may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payment processors to facilitate transactions</li>
                <li>Law enforcement agencies if required by law</li>
                <li>Third-party analytics providers to improve our Site functionality</li>
                <li>Affiliated companies for business operations</li>
              </ul>
              <p>
                We do not sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Age Restrictions</h2>
              <p>
                Minors under the age of 18 are strictly prohibited from using this Site. By using the Site, you declare under penalty of perjury that you are at least 18 years old.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Security Measures</h2>
              <p>
                We implement appropriate security measures to protect your data. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Your Rights & Choices</h2>
              <p>
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access, update, or delete your personal data</li>
                <li>Object to data processing or request data portability</li>
                <li>Withdraw consent for marketing communications</li>
                <li>Request restrictions on data processing</li>
              </ul>
              <p>
                To exercise these rights, please contact us at support@fkitt.com.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Third-Party Links</h2>
              <p>
                Our Site may contain links to third-party websites. We are not responsible for the privacy policies or practices of these third-party sites.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Cookies Policy</h2>
              <p>
                We use cookies to enhance user experience. You can adjust your browser settings to refuse cookies, but some features of the Site may not function properly.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Changes to This Privacy Policy</h2>
              <p>
                FkiTT reserves the right to update this Privacy Policy at any time. We encourage users to review this page periodically for changes.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Contact Us</h2>
              <p>
                For any questions regarding this Privacy Policy, you may contact us at:
              </p>
              <p>
                Email: support@fkitt.com<br />
                Website: https://fkitt.com
              </p>
              <p>
                By using the Site, you agree to the terms outlined in this Privacy Policy.
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

export default PrivacyPolicy;
