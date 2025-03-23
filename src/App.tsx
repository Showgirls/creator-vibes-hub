
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Token from "./pages/Token";
import Login from "./pages/Login";
import MemberArea from "./pages/MemberArea";
import Models from "./pages/Models";
import Contact from "./pages/Contact";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AntiTraffickingStatement from "./pages/AntiTraffickingStatement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Index isRegister />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/token" element={<Token />} />
          <Route path="/member-area" element={<MemberArea />} />
          <Route path="/models" element={<Models />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/anti-trafficking" element={<AntiTraffickingStatement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
