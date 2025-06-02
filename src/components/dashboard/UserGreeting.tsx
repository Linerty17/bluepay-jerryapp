
import React from "react";
import { Bell, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserData } from "../../types/user";
import TypewriterText from "../ui/TypewriterText";

interface UserGreetingProps {
  userData: UserData | null;
}

const UserGreeting = ({ userData }: UserGreetingProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12 border-2 border-white">
          {userData?.profileImage ? (
            <AvatarImage src={userData.profileImage} alt="Profile" className="object-cover" />
          ) : (
            <AvatarFallback className="bg-yellow-500">
              <User className="text-white" />
            </AvatarFallback>
          )}
        </Avatar>
        <h2 className="text-xl font-semibold">
          Hi, <TypewriterText text={userData?.fullName || "User"} speed={100} className="font-semibold" />
        </h2>
      </div>
      <div className="w-8 h-8 bg-bluepay-blue rounded-full flex items-center justify-center">
        <Bell size={20} className="text-white" />
      </div>
    </div>
  );
};

export default UserGreeting;
