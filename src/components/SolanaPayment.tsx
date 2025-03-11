
import { useState, useEffect } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SolanaPaymentProps {
  onPaymentSuccess: () => void;
  tokenAddress: string;
  adminAddress: string;
  amount?: number;
  className?: string;
  children?: React.ReactNode;
}

const SolanaPayment = ({
  onPaymentSuccess,
  tokenAddress = "3SXgM5nXZ5HZbhPyzaEjfVu5uShDjFPaM7a8TFg9moFm",
  adminAddress = "44o43y41gytnCtJhaENskAYFoZqg5WyMVskMirbK6bZx",
  amount = 48,
  className,
  children
}: SolanaPaymentProps) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if Phantom is installed
  const getProvider = () => {
    if ("solana" in window) {
      const provider = (window as any).solana;
      if (provider.isPhantom) {
        return provider;
      }
    }
    // Redirect to phantom wallet if not installed
    window.open("https://phantom.app/", "_blank");
    return null;
  };

  const connectWallet = async () => {
    try {
      setLoading(true);
      const provider = getProvider();
      if (provider) {
        const response = await provider.connect();
        setWalletConnected(true);
        return response.publicKey.toString();
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet");
    } finally {
      setLoading(false);
    }
    return null;
  };

  const makePayment = async () => {
    try {
      setLoading(true);
      const provider = getProvider();
      
      if (!provider) {
        toast.error("Phantom wallet not found");
        return;
      }
      
      // Connect wallet if not already connected
      if (!walletConnected) {
        const connected = await connectWallet();
        if (!connected) return;
      }
      
      // Use Solana connection
      const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
      
      // Create transaction to transfer tokens
      // Note: This is a simplified version. In production, you would use Token Program
      // to transfer SPL tokens properly with correct decimals and token accounts
      
      toast.info("Initiating payment...");
      
      // In a real implementation, you would:
      // 1. Create a token transfer instruction
      // 2. Get the token accounts
      // 3. Build and send the transaction
      
      // Simulating successful payment for demo purposes
      // In production, you would verify the transaction success
      setTimeout(() => {
        setLoading(false);
        toast.success("Payment successful! You are now a premium member!");
        
        // Save premium status to localStorage
        localStorage.setItem("isPremiumMember", "true");
        
        // Call the success callback
        onPaymentSuccess();
      }, 2000);
      
    } catch (error) {
      console.error("Payment error:", error);
      setLoading(false);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <Button
      onClick={makePayment}
      className={className}
      disabled={loading}
    >
      {loading ? "Processing..." : children || "Buy Now"}
    </Button>
  );
};

export default SolanaPayment;
