
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
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

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
        const publicKey = response.publicKey.toString();
        setWalletAddress(publicKey);
        setWalletConnected(true);
        return publicKey;
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
      let userPublicKey;
      if (!walletConnected) {
        userPublicKey = await connectWallet();
        if (!userPublicKey) return;
      } else {
        userPublicKey = walletAddress;
      }
      
      // Use Solana connection
      const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
      
      toast.info("Preparing transaction...");
      
      try {
        // Converting the addresses to PublicKey objects
        const fromPublicKey = new PublicKey(userPublicKey as string);
        const toPublicKey = new PublicKey(adminAddress);
        
        // Create a simple SOL transfer transaction (as a placeholder)
        // In a production app, this would be a proper SPL token transfer
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: fromPublicKey,
            toPubkey: toPublicKey,
            lamports: LAMPORTS_PER_SOL * amount / 100, // Converting $48 to SOL equivalent
          })
        );
        
        // Setting the most recent blockhash
        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = fromPublicKey;
        
        // Send the transaction to the user's wallet for signing
        toast.info("Please confirm the transaction in your wallet");
        const signedTransaction = await provider.signTransaction(transaction);
        
        // Send the signed transaction to the network
        const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        
        // Wait for transaction confirmation
        toast.info("Processing payment, please wait...");
        await connection.confirmTransaction(signature, "confirmed");
        
        toast.success("Payment successful! You are now a premium member!");
        
        // Save premium status to localStorage
        localStorage.setItem("isPremiumMember", "true");
        
        // Call the success callback
        onPaymentSuccess();
      } catch (error) {
        console.error("Transaction error:", error);
        toast.error("Transaction failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
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
