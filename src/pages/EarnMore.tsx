
import React, { useState } from "react";
import { ArrowLeft, TrendingUp, DollarSign, Gift, Users, Copy, Share2, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const EarnMore = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showReferralDetails, setShowReferralDetails] = useState(false);
  const [referralCode] = useState("BP" + Math.random().toString(36).substr(2, 6).toUpperCase());

  const handleStartReferring = () => {
    setShowReferralDetails(true);
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  const shareReferralLink = () => {
    const referralLink = `https://bluepay.app/register?ref=${referralCode}`;
    if (navigator.share) {
      navigator.share({
        title: 'Join BluePay and Earn!',
        text: `Use my referral code ${referralCode} and get ₦500 bonus when you join BluePay!`,
        url: referralLink,
      });
    } else {
      navigator.clipboard.writeText(referralLink);
      toast({
        title: "Link Copied!",
        description: "Referral link copied to clipboard",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-5">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-3 text-white hover:bg-blue-700"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">Earn More</h1>
        </div>
      </header>

      <div className="p-5 space-y-6">
        {/* Welcome Section */}
        <Card className="p-6 bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Start Earning Today!</h2>
            <p className="text-green-100">Multiple ways to earn money with BluePay</p>
          </div>
        </Card>

        {/* Earning Options */}
        <div className="space-y-4">
          <Card className="p-5 bg-white shadow-sm">
            <div className="flex items-center mb-3">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Referral Program</h3>
                <p className="text-sm text-gray-600">Earn ₦500 for each friend you refer</p>
              </div>
            </div>
            
            {!showReferralDetails ? (
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handleStartReferring}
              >
                Start Referring
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Your Referral Code</h4>
                  <div className="flex items-center gap-2 p-3 bg-white rounded border">
                    <span className="font-mono text-lg font-bold flex-1">{referralCode}</span>
                    <Button size="sm" variant="outline" onClick={copyReferralCode}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={shareReferralLink}
                  >
                    <Share2 className="h-4 w-4" />
                    Share Link
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={copyReferralCode}
                  >
                    <Copy className="h-4 w-4" />
                    Copy Code
                  </Button>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-blue-800">How it works:</h5>
                      <ul className="text-sm text-blue-700 mt-1 space-y-1">
                        <li>• Share your referral code with friends</li>
                        <li>• They sign up using your code</li>
                        <li>• You both get ₦500 bonus!</li>
                        <li>• No limit on referrals</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>

          <Card className="p-5 bg-white shadow-sm">
            <div className="flex items-center mb-3">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Daily Tasks</h3>
                <p className="text-sm text-gray-600">Complete daily tasks and earn rewards</p>
              </div>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              View Tasks
            </Button>
          </Card>

          <Card className="p-5 bg-white shadow-sm">
            <div className="flex items-center mb-3">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <Gift className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Bonus Rewards</h3>
                <p className="text-sm text-gray-600">Special bonuses and promotions</p>
              </div>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Claim Bonus
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EarnMore;
