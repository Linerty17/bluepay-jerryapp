import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "../stores/userStore";
import { toast } from "@/hooks/use-toast";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Withdraw = () => {
  const navigate = useNavigate();
  const { userData, balance, updateBalance, addTransaction } = useUserStore();
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bank, setBank] = useState("");
  const [amount, setAmount] = useState("");
  const [bpcCode, setBpcCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nigerianBanks = [
    "Access Bank",
    "Zenith Bank",
    "First Bank",
    "GTBank",
    "UBA",
    "Fidelity Bank",
    "Ecobank",
    "Sterling Bank",
    "Union Bank",
    "Wema Bank",
    "FCMB",
    "Polaris Bank",
    "Stanbic IBTC",
    "Heritage Bank",
    "Keystone Bank",
    "Jaiz Bank",
    "Unity Bank",
    "Providus Bank",
    "TAJBank",
    "SunTrust Bank",
    "Globus Bank",
    "Premium Trust Bank",
    // Mobile Banks
    "Kuda Bank",
    "Moniepoint",
    "PalmPay",
    "OPay",
    "VFD Microfinance Bank",
    "Brass Bank",
    "Carbon",
    "Sparkle",
    "Rubies Bank",
    "Mint Digital Bank",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!accountName || !accountNumber || !bank || !amount) {
      toast({
        variant: "destructive",
        description: "Please fill in all required fields",
      });
      setIsSubmitting(false);
      return;
    }

    // Validate BPC code
    if (bpcCode !== "BPC7319111") {
      toast({
        variant: "destructive",
        description: "Invalid BPC code. Please enter a valid code.",
      });
      setIsSubmitting(false);
      return;
    }

    const amountValue = parseFloat(amount);
    
    // Update balance in userStore
    updateBalance(-amountValue);
    
    // Add to transaction history
    addTransaction({
      id: Date.now(),
      type: "Bank Transfer",
      amount: `-₦${amountValue.toLocaleString()}`,
      date: new Date().toLocaleString(),
      status: "Completed",
      recipient: `${accountName} - ${accountNumber} (${bank})`,
    });
    
    toast({
      description: "Transfer initiated successfully!",
    });
    
    // Navigate to processing page with transaction data
    navigate("/withdraw/processing", {
      state: {
        amount: amountValue,
        accountName,
        accountNumber,
        bank
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white py-5 px-5 text-center">
        <h1 className="text-2xl font-bold">Transfer To Bank</h1>
      </header>

      <div className="p-5">
        <h2 className="text-3xl font-bold mb-6">Bank Details</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full border-2 border-blue-600 rounded-lg p-4 text-lg"
              placeholder="Account Name"
            />
          </div>
          
          <div className="relative">
            <Input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full border-2 border-blue-600 rounded-lg p-4 text-lg"
              placeholder="Account Number (10 digits)"
              maxLength={10}
            />
          </div>

          <div className="relative">
            <Select value={bank} onValueChange={setBank}>
              <SelectTrigger className="w-full border-2 border-blue-600 rounded-lg p-4 h-14 text-lg">
                <SelectValue placeholder="Select Bank" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {nigerianBanks.map((bankName) => (
                  <SelectItem key={bankName} value={bankName}>
                    {bankName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="relative">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border-2 border-blue-600 rounded-lg p-4 text-lg"
              placeholder="Amount"
            />
          </div>
          
          <div className="relative">
            <Input
              type="text"
              value={bpcCode}
              onChange={(e) => setBpcCode(e.target.value)}
              className="w-full border-2 border-blue-600 rounded-lg p-4 text-lg"
              placeholder="BPC CODE (Buy BPC)"
            />
          </div>
          
          <div 
            className="text-blue-600 text-lg font-semibold cursor-pointer"
            onClick={() => navigate("/buy-bpc")}
          >
            <p>Buy BPC code</p>
          </div>
          
          <div className="mt-8">
            <p className="text-2xl font-bold">Available Balance: ₦{balance.toLocaleString()}</p>
          </div>
          
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-xl py-6 mt-4"
          >
            {isSubmitting ? "Processing..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Withdraw;
