
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const AntiTraffickingStatement = () => {
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
              Anti-Slavery and Anti-Trafficking Statement
            </h1>
            
            <div className="text-lg text-left space-y-4">
              <p>
                FkiTT (https://fkitt.com) is a subscription-based adult content platform designed to empower creators and provide fair revenue-sharing opportunities. FkiTT is committed to maintaining the highest ethical standards, ensuring a safe and responsible digital environment. We have a zero-tolerance policy toward modern slavery and human trafficking, both on our platform and throughout our supply chains.
              </p>
              
              <p>
                This statement is made in alignment with our Company values and goals, as well as in compliance with the UK Modern Slavery Act, Australian Modern Slavery Act, and the California Transparency in Supply Chains Act. It outlines the steps FkiTT has taken to prevent modern slavery and human trafficking in our business operations, partnerships, and supply chains.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Our Commitment</h2>
              <p>
                Modern slavery and human trafficking violate fundamental human rights and take many forms, including forced labor, servitude, and exploitation. FkiTT stands firmly against all forms of modern slavery and human trafficking.
              </p>
              <p>
                We are committed to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ensuring a safe and ethical work environment for our employees, partners, and contractors.</li>
                <li>Preventing and mitigating risks of modern slavery and human trafficking across our platform and business operations.</li>
                <li>Enforcing strict policies against exploitation, forced labor, and trafficking.</li>
                <li>Collaborating with law enforcement and NGOs to address and report human trafficking concerns.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Steps Taken to Prevent, Detect, and Report Modern Slavery & Human Trafficking Risks</h2>
              <p>
                In the past year, FkiTT has implemented the following measures:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mandatory modern slavery and trafficking training for all employees.</li>
                <li>Comprehensive policies and ethical guidelines to regulate business practices.</li>
                <li>Enhanced content moderation processes to detect and remove exploitative material.</li>
                <li>Independent safety audits and compliance reviews by third-party organizations.</li>
                <li>Stronger identity verification measures to prevent fraudulent and exploitative accounts.</li>
                <li>Increased partnerships with organizations that combat human trafficking.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Our Policies</h2>
              <p>
                At FkiTT, we enforce a strict Anti-Slavery and Anti-Trafficking Policy, which applies to all employees, partners, and users. Our key policies include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Code of Conduct & Business Ethics</strong> – Employees and partners must comply with ethical and legal standards, including anti-trafficking laws.</li>
                <li><strong>Terms of Service & Acceptable Use Policy</strong> – Our platform strictly prohibits content related to sex trafficking, escort services, or prostitution.</li>
                <li><strong>Creator Verification & Content Moderation</strong> – We employ state-of-the-art verification systems and manual moderation to detect and prevent exploitative content.</li>
                <li><strong>Whistleblower & Reporting Mechanisms</strong> – Users, employees, and partners can report concerns regarding modern slavery via support@fkitt.com.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Risk Assessment & Mitigation Efforts</h2>
              <p>
                We regularly evaluate risks of modern slavery across three key areas:
              </p>
              <p>
                <strong>1. Direct Business Operations</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Our employees and contractors are vetted and provided with fair working conditions.</li>
                <li>We train staff to recognize and report potential cases of modern slavery.</li>
              </ul>
              
              <p>
                <strong>2. Our Platform & Supply Chain</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Creator content moderation: AI-driven and human-reviewed 24/7 monitoring prevents exploitative material.</li>
                <li>User verification processes: Multi-layer ID and payment verification to prevent fraud.</li>
                <li>Strict content policies: All uploaded material must comply with ethical and legal standards.</li>
              </ul>
              
              <p>
                <strong>3. Partnerships & Third-Party Contractors</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Agreements with suppliers include anti-trafficking compliance clauses.</li>
                <li>Regular audits ensure all third-party vendors adhere to our ethical guidelines.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">How We Detect & Report Exploitative Content</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All content is screened using AI and human moderators before appearing on the platform.</li>
                <li>We do NOT allow end-to-end encryption, ensuring transparency and safety.</li>
                <li>Users can report content directly on the platform or via support@fkitt.com.</li>
                <li>Reports of trafficking or exploitation are immediately reviewed and escalated to law enforcement.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Law Enforcement & NGO Collaborations</h2>
              <p>
                If FkiTT detects any content related to human trafficking or modern slavery, we:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Suspend the associated account immediately.</li>
                <li>Report the case to relevant law enforcement agencies.</li>
                <li>Work with NGOs such as the National Center for Missing & Exploited Children (NCMEC) to assist investigations.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Transparency & Continuous Improvement</h2>
              <p>
                FkiTT is committed to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ongoing risk assessments of modern slavery risks across our operations.</li>
                <li>Strengthening safety protocols through new technologies and policies.</li>
                <li>Publishing annual transparency reports to verify our anti-slavery commitments.</li>
                <li>Encouraging a culture of transparency and accountability in our business practices.</li>
              </ul>
              
              <p>
                If you suspect modern slavery or human trafficking in connection with FkiTT, please report it immediately via:
              </p>
              <ul className="list-disc pl-6">
                <li>Email: support@fkitt.com</li>
              </ul>
              <p>
                We take all reports seriously and will investigate any concerns raised.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Our Ongoing Commitment</h2>
              <p>
                Modern slavery and human trafficking are global challenges that require continuous action. FkiTT remains committed to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Strengthening our detection, reporting, and prevention efforts.</li>
                <li>Enhancing collaborations with NGOs and law enforcement.</li>
                <li>Protecting all users, employees, and contractors from exploitation.</li>
              </ul>
              <p>
                We will continue to assess and improve our policies to ensure FkiTT remains a safe and ethical platform for everyone.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Responsibility for This Statement</h2>
              <p>
                Our Executive Leadership Team holds overall responsibility for compliance with this statement. Our Legal & Compliance Team oversees daily enforcement and ensures all employees, users, and suppliers adhere to our Anti-Slavery and Anti-Trafficking Policy.
              </p>
              <p>
                This statement has been approved by the Board of FkiTT.
              </p>
              <p className="mt-4">
                <strong>Last updated: March 2025</strong>
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

export default AntiTraffickingStatement;
