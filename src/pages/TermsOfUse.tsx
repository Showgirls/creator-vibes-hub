
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const TermsOfUse = () => {
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
              Terms of Use
            </h1>
            
            <div className="text-lg text-left space-y-4">
              <p className="font-bold text-center">BY USING OUR WEBSITE YOU AGREE TO THESE TERMS – PLEASE READ THEM CAREFULLY</p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Introduction</h2>
              <p>
                These Terms of Use govern your use of FkiTT and your agreement with us. Here are a few key things to note:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We can modify these Terms of Service at any time.</li>
                <li>If you purchase a Subscription, it will automatically renew for additional periods of the same duration unless you cancel it.</li>
                <li>Your rights may vary depending on where you are resident when you access FkiTT.</li>
                <li>If a dispute arises between you and us, you agree to notify us and agree to mediation before bringing any claim against us.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Interpretation</h2>
              <p>
                In the Terms of Service:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We refer to our website as "FkiTT", including when accessed via the URL https://fkitt.com;</li>
                <li>References to "we", "our", "us" are references to FkiTT, the operator of the platform;</li>
                <li>"Business User": a User who uses FkiTT for commercial reasons, whether acting on their own behalf or through someone else, including Referring Users;</li>
                <li>"Consumer": all Users who are not Business Users;</li>
                <li>"Content": any material uploaded to FkiTT by any User, including any photos, videos, audio, livestream material, data, text, metadata, images, interactive features, emojis, GIFs, memes, and any other material whatsoever;</li>
                <li>"Contract between Fan and Creator": the terms which govern each Creator Interaction;</li>
                <li>"Creator": a User who has set up their FkiTT account to post Content for Fans to view;</li>
                <li>"Creator Earnings": the portion of a Fan Payment payable to a Creator pursuant to these Terms of Service after deducting all fees and applying all relevant tax laws;</li>
                <li>"Creator Interaction": an interaction on FkiTT that grants access to a Creator's Content, including: (i) a Subscription; (ii) a payment for pay-per-view Content; and (iii) any other interaction or payment between a User and a Creator's account or Content, including direct messages;</li>
                <li>"Fan": a User who has registered for an account and who can access a Creators' Content via a Creator Interaction;</li>
                <li>"Fan Payment": any payment related to a Creator Interaction;</li>
                <li>"Include", "Includes", and "Including" also mean "without limitation";</li>
                <li>"Indirect Sales Taxes": any Tax that is statutorily applied to Fan Payments in any relevant jurisdiction;</li>
                <li>"Notice", "Notify", and "Notification": our attempt to share information with you by: sending a message to your FkiTT account, or sending an email to an address you provide, or posting a letter to the physical address you provide, or sending a text message to or calling a phone number you provide;</li>
                <li>"Referring User": a User who participates in the FkiTT Referral Program;</li>
                <li>"Subscription": a Fan's binding agreement to obtain access for a specific period of time to all content that a Creator makes available to Fans in exchange for authorised automatic renewal payments. This excludes individually priced content;</li>
                <li>"Tax": all forms of tax and statutory, governmental charges, duties, imposts, contributions, levies, withholdings, or liabilities wherever chargeable in any applicable jurisdiction;</li>
              </ul>
              
              <p>
                "Terms of Service" (also called "your agreement with us"): the legally binding agreement between you and us which consists of:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>(i) these Terms of Use;</li>
                <li>(ii) Acceptable Use Policy;</li>
                <li>(iii) Referral Program Terms;</li>
                <li>(iv) Platform to Business Regulation Terms;</li>
                <li>(v) Complaints Policy;</li>
                <li>(vi) Appeals Policy;</li>
                <li>(vii) VAT Policy;</li>
                <li>(viii) Community Guidelines;</li>
              </ul>
              
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>"Upload": publish, display, post, type, input, or otherwise share any photos, videos, audio, livestream material, data, text, metadata, images, interactive features, emojis, GIFs, memes, and any other material whatsoever;</li>
                <li>"User": any user of FkiTT, whether a Creator or a Fan or both (also referred to as "you" or "your").</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Who We Are and How to Contact Us</h2>
              <p>
                FkiTT is operated by FkiTT Ltd. If you have any questions, please email us at support@fkitt.com or use our Contact Form.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">We May Change the Terms of Service</h2>
              <p>
                Where permitted, we may change any part of the Terms of Service without Notice:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To reflect changes in applicable laws and regulations; and/or</li>
                <li>To address a risk to FkiTT, to us, to Users, or to relevant third parties.</li>
              </ul>
              <p>
                We may also make other changes and will Notify you so you may delete your account before the changes take effect. Once updated, you will be bound by the effective Terms of Service if you continue to use FkiTT.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Registering with FkiTT</h2>
              <p>
                By registering with and using FkiTT, you agree to the Terms of Service. If you do not agree, your sole remedy is to not register or stop being a FkiTT User. We may reject an account application for any reason. To use FkiTT, you must register and open an account. You must provide a valid email address, a username, and a password or authenticate using an approved third-party.
              </p>
              <p className="mt-4">
                To register as a User and open a Fan account:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must be at least 18 years old;</li>
                <li>You must be able to be legally bound by a contract with us;</li>
                <li>You must be legally permitted to join, view Content, and to use any functionality provided by FkiTT;</li>
                <li>You must not be convicted of committing a serious crime; and</li>
                <li>You agree to pay (where required) for Creator Interactions in accordance with the Terms of Service and the Contract between Fan and Creator.</li>
              </ul>
              <p className="mt-4">
                If you do not meet the above requirements, you must not access or use FkiTT. You may also be asked to provide additional information prior to account approval.
              </p>
              <p className="mt-4">
                To open a Creator account, you must also:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Upload a valid form of ID and two photos of you;</li>
                <li>Add a bank account, payment details for your bank account, or a payment method;</li>
                <li>Select a method ("Payout Option") for us to transfer Creator Earnings to you;</li>
                <li>Submit additional age or identity verification information any time we ask for it;</li>
                <li>Provide any additional information we request, which may vary depending on where you live or your nationality.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Adult Material</h2>
              <p>
                Some Content on FkiTT contains adult material, and you acknowledge and agree to this when you access FkiTT. We are not responsible for any loss or damage you suffer as a result of how or where you view Content.
              </p>
              
              <h2 className="text-2xl font-semibold text-[#D6BCFA] mt-6">Fan Subscriptions and Purchases</h2>
              <p>
                FkiTT offers a unique revenue-sharing model where Fans pay one monthly fee for unlimited access to all creators on the platform.
              </p>
              <p>
                Creators are paid based on their popularity and engagement within the site.
              </p>
              <p>
                Fans also have the option to engage in live cam interactions, with payments going directly to the creator in real time.
              </p>
              <p className="mt-4">
                For the full Terms of Service, please visit https://fkitt.com.
              </p>
              <p>
                If you have any questions or concerns, contact support@fkitt.com.
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

export default TermsOfUse;
