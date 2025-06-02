
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BuyBPCVerifying = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(9);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/buy-bpc/confirmation");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-[#222222] text-white py-4 px-5 flex justify-between items-center sticky top-0 z-10">
        <button className="text-xl">
          <span className="sr-only">Menu</span>
        </button>
        <h1 className="text-2xl font-semibold">BLUEPAY</h1>
        <div className="w-8 h-8">
          <span className="sr-only">Notifications</span>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-24 h-24 mb-8 relative">
          <div className="w-full h-full rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
            {countdown}
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-center">Verifying your payment</h1>
        <p className="text-lg text-gray-500 text-center">
          Please wait while we confirm your bank transfer...
        </p>
      </div>
    </div>
  );
};

export default BuyBPCVerifying;
