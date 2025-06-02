
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "../stores/userStore";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AirtimePurchase = () => {
  const navigate = useNavigate();
  const { balance, updateBalance, addTransaction } = useUserStore();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState("");
  const [bpcCode, setBpcCode] = useState("");
  
  const networks = ["MTN", "Airtel", "Glo", "9Mobile"];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || !amount || !network || !bpcCode) {
      toast({
        variant: "destructive",
        description: "Please fill in all required fields",
      });
      return;
    }

    // Validate phone number
    if (phoneNumber.length !== 11) {
      toast({
        variant: "destructive",
        description: "Please enter a valid 11-digit phone number",
      });
      return;
    }

    // Validate BPC code
    if (bpcCode !== "BPC7319111") {
      toast({
        variant: "destructive",
        description: "Invalid BPC code. Please enter a valid code.",
      });
      return;
    }

    const amountValue = parseFloat(amount);
    
    // Update balance in userStore
    updateBalance(-amountValue);
    
    // Add to transaction history
    addTransaction({
      id: Date.now(),
      type: `${network} Airtime`,
      amount: `-₦${amountValue.toLocaleString()}`,
      date: new Date().toLocaleString(),
      status: "Completed",
      recipient: phoneNumber,
    });
    
    toast({
      description: "Airtime purchase successful!",
    });
    
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white py-4 px-5">
        <div className="flex items-center">
          <button onClick={() => navigate("/dashboard")} className="mr-3">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">Buy Airtime</h1>
        </div>
      </header>

      <div className="p-5 flex-1">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2">Select Network</label>
            <Select value={network} onValueChange={setNetwork}>
              <SelectTrigger className="w-full border-2 border-blue-600 rounded-lg p-4 h-14 text-lg">
                <SelectValue placeholder="Select Network" />
              </SelectTrigger>
              <SelectContent>
                {networks.map((net) => (
                  <SelectItem key={net} value={net}>
                    {net}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <Input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border-2 border-blue-600 rounded-lg p-4 text-lg"
              placeholder="Enter 11-digit phone number"
              maxLength={11}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Amount</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border-2 border-blue-600 rounded-lg p-4 text-lg"
              placeholder="Enter amount"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">BPC CODE</label>
            <Input
              type="text"
              value={bpcCode}
              onChange={(e) => setBpcCode(e.target.value)}
              className="w-full border-2 border-blue-600 rounded-lg p-4 text-lg"
              placeholder="Enter BPC code"
            />
          </div>
          
          <div className="mt-8">
            <p className="text-2xl font-bold">Available Balance: ₦{balance.toLocaleString()}</p>
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-xl py-6 mt-4"
          >
            Purchase Airtime
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AirtimePurchase;
