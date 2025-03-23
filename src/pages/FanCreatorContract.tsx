
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const FanCreatorContract = () => {
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
              Fan-Creator Contract
            </h1>
            
            <div className="text-lg text-left space-y-4">
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Introduction</h2>
              <p>
                This Contract between Fan and Creator ("this Agreement") governs each interaction between a Fan and a Creator on FkiTT.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Scope</h2>
              <p>
                This Agreement is legally binding and applies each time a Creator Interaction is initiated on FkiTT. It applies to the exclusion of any other terms that the Fan or Creator may propose.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Parties</h2>
              <p>
                The only parties to this Agreement are the Fan and Creator participating in the Creator Interaction. FkiTT and/or its subsidiaries are not parties to this Agreement or any Creator Interaction, except as set forth below.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Interpretation</h2>
              <p>
                In this Agreement, the following definitions apply:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>"Company": FkiTT</li>
                <li>"Content": Any material uploaded to FkiTT by any User, including photos, videos, audio, livestream material, data, text, metadata, images, interactive features, emojis, GIFs, memes, and any other material.</li>
                <li>"Creator": A User who has set up their FkiTT account to post Content for Fans to view.</li>
                <li>"Creator Earnings": The portion of a Fan Payment payable to a Creator under the Terms of Use.</li>
                <li>"Creator Interaction": An interaction on FkiTT that grants access to a Creator's Content, including:
                  <ul className="list-disc pl-6 mt-2">
                    <li>A Subscription</li>
                    <li>A payment for pay-per-view Content</li>
                    <li>Any other interaction or payment between a User and a Creator's account or Content, including direct messages.</li>
                  </ul>
                </li>
                <li>"Creator Interaction Licence": The non-transferable, non-sublicensable, and non-exclusive rights a Creator grants to Relevant Content.</li>
                <li>"Fan": A User who has registered for an account and who can access a Creator's Content via a Creator Interaction.</li>
                <li>"Fan Payment": Any payment related to a Creator Interaction.</li>
                <li>"FkiTT Fee": The percentage fee deducted from Fan Payments before distributing earnings to Creators, in accordance with the Terms of Use.</li>
                <li>"Subscription": A Fan's binding agreement to obtain access for a specific period to all Content that a Creator makes available in exchange for authorized automatic renewal payments.</li>
                <li>"Tax": Any applicable sales tax, VAT, or statutory charges.</li>
                <li>"Upload": To publish, display, post, type, input, or otherwise share Content on FkiTT.</li>
                <li>"User": Any User of FkiTT, whether a Creator or a Fan, or both.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Pricing and Payment</h2>
              <p>
                The Fan entering into a Creator Interaction agrees to pay the applicable Fan Payment, plus any applicable taxes, which FkiTT is authorized to collect. FkiTT is also authorized to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Deduct the FkiTT Fee</li>
                <li>Pay out Creator Earnings</li>
                <li>Pay applicable referral payments</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Subscriptions and Renewals</h2>
              <p>
                When you select "Subscribe," you agree to start a Subscription. A Subscription automatically renews at the current rate (plus any applicable taxes).
              </p>
              <p className="mt-4">
                By selecting "Subscribe," you authorize FkiTT to charge your payment method after each Subscription period, unless:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your payment is declined and you do not provide another valid payment method.</li>
                <li>The Creator increases the Subscription price (in which case you must manually renew).</li>
                <li>You turn off Auto-Renew in your account settings.</li>
                <li>You close your FkiTT account before the next billing period begins.</li>
              </ul>
              <p className="mt-4">
                By subscribing, you acknowledge that no further notice of renewal is required.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Licence of Content</h2>
              <p>
                As part of a Creator Interaction, the Creator grants a Creator Interaction Licence.
              </p>
              <p>
                This licence allows the Fan to access the Creator's Relevant Content.
              </p>
              <p>
                The Fan does not receive ownership rights to the Relevant Content.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Expiry of Licence</h2>
              <p>
                The Creator Interaction Licence expires automatically and without notice if:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The Fan Payment is unsuccessful, charged back, or reversed.</li>
                <li>The Creator deletes the Relevant Content or closes their account.</li>
                <li>The Fan's Subscription period ends.</li>
                <li>The Fan's account is suspended or terminated.</li>
                <li>The Fan violates FkiTT's Terms of Service.</li>
                <li>The Relevant Content is removed from FkiTT for any reason.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Content Removal</h2>
              <p>
                FkiTT reserves the right to remove any Content from a Creator's account at any time.
              </p>
              <p>
                Fans acknowledge that Creators may remove Content, including pay-per-view Content, at any time.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Cancellations and Refunds</h2>
              <p>
                Regarding every Creator Interaction:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The Fan will gain access to the Relevant Content within 14 days of purchase.</li>
                <li>The Fan waives their right to cancel under the Consumer Rights Act 2015, the UK Consumer Contracts Regulations 2013, and EU Directive 2011/83, except in cases of a Subscription.</li>
                <li>Refunds are subject to applicable laws and FkiTT's Terms of Use.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Obligations Between Creator and Fan</h2>
              <p>
                <strong>Creators Agree to:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Comply with FkiTT's Terms of Service.</li>
                <li>Post Relevant Content in exchange for Fan Payments.</li>
                <li>Own or hold all necessary rights to the Content they upload.</li>
                <li>Ensure their account adheres to FkiTT's Acceptable Use Policy.</li>
              </ul>
              
              <p className="mt-4">
                <strong>Fans Agree to:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Make Fan Payments for Paid Content.</li>
                <li>Not share, distribute, or sell Creator Content outside of FkiTT.</li>
                <li>Not initiate chargebacks or disputes unless there is a legitimate issue with the Creator Interaction.</li>
                <li>Assume all risks when accessing Relevant Content, unless the Creator engages in negligence or a legal violation.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">No Guarantees</h2>
              <p>
                Fans acknowledge that access to Relevant Content is not guaranteed, and circumstances may prevent access, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Temporary platform outages or maintenance.</li>
                <li>Creator account deletions or suspensions.</li>
                <li>Content removal by the Creator or FkiTT.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Applicable Law & Dispute Resolution</h2>
              <p>
                This Agreement is governed by the laws of England and Wales.
              </p>
              <p>
                Where claims can be brought:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fans in the UK or EU may file claims in England and Wales or their home country.</li>
                <li>Fans outside the UK or EU must file claims in the courts of England and Wales.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Severability Clause</h2>
              <p>
                If any provision of this Agreement is found invalid or unenforceable by a court of law, the rest of the Agreement remains in full force and effect.
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

export default FanCreatorContract;
