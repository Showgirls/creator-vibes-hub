
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Token from "./pages/Token";
import MemberArea from "./pages/MemberArea";
import Models from "./pages/Models";
import Contact from "./pages/Contact";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AntiTraffickingStatement from "./pages/AntiTraffickingStatement";
import FanCreatorContract from "./pages/FanCreatorContract";
import ComplaintsPolicy from "./pages/ComplaintsPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/token" element={<Token />} />
          <Route path="/member-area" element={<MemberArea />} />
          <Route path="/models" element={<Models />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/anti-trafficking" element={<AntiTraffickingStatement />} />
          <Route path="/fan-creator-contract" element={<FanCreatorContract />} />
          <Route path="/complaints" element={<ComplaintsPolicy />} />
          {/* Redirect any login/register attempts to home page */}
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
