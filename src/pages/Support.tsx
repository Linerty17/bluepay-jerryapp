
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, MessageSquare, Phone, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";

const Support = () => {
  const navigate = useNavigate();

  const handleLiveChatClick = () => {
    window.open('https://t.me/Bluepay2025_bot', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-[#222222] text-white py-4 px-5 flex justify-between items-center sticky top-0 z-10">
        <button onClick={() => navigate("/dashboard")} className="text-xl">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-semibold">Support</h1>
        <div className="w-8 h-8"></div>
      </header>

      <div className="p-6 flex-1">
        <h2 className="text-2xl font-bold mb-6">How can we help you?</h2>
        
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Email Support</h3>
                <p className="text-gray-500 text-sm">Get help via email</p>
              </div>
            </div>
            <Button 
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
              onClick={() => window.open('mailto: bluepaycustomerservice25@gmail.com')}
            >
              Contact via Email
            </Button>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Telegram Support</h3>
                <p className="text-gray-500 text-sm">Chat with us on Telegram</p>
              </div>
            </div>
            <Button 
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
              onClick={() => window.open('https://t.me/Officialbluepay')}
            >
              Open Telegram
            </Button>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">WhatsApp Support</h3>
                <p className="text-gray-500 text-sm">Message us on WhatsApp</p>
              </div>
            </div>
            <Button 
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
              onClick={() => window.open('https://wa.me/2348189668037')}
            >
              Chat on WhatsApp
            </Button>
          </div>
          
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <LifeBuoy className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Live Chat Support</h3>
                <p className="text-gray-500 text-sm">Chat with a support agent</p>
              </div>
            </div>
            <Button 
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
              onClick={handleLiveChatClick}
            >
              Start Live Chat
            </Button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500">Available 24/7 for your support needs</p>
          <p className="text-blue-600 font-medium mt-2">bluepaycustomerservice25@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Support;
