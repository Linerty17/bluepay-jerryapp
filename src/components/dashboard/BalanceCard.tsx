
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface BalanceCardProps {
  balance: number;
}

const BalanceCard = ({ balance }: BalanceCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-bluepay-blue text-white rounded-xl p-5 mb-8">
      <p className="text-lg mb-2">Available Balance</p>
      <div className="flex justify-between items-center">
        <h3 className="text-4xl font-bold">₦{balance.toLocaleString()}</h3>
        <Button 
          className="bg-white text-bluepay-blue hover:bg-gray-100 font-semibold"
          onClick={() => navigate("/withdraw")}
        >
          Withdraw
        </Button>
      </div>
      <div className="mt-4 bg-white/10 rounded-lg p-3">
        <div className="flex justify-between items-center">
          <p className="text-sm">Daily spend target</p>
          <p className="text-sm font-semibold">₦200,000</p>
        </div>
        <div className="w-full bg-white/20 h-2 rounded-full mt-2">
          <div className="bg-white h-2 rounded-full" style={{width: "35%"}}></div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
