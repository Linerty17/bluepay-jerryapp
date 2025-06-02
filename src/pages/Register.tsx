import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useUserStore } from "../stores/userStore";

const Register = () => {
  const navigate = useNavigate();
  const { setUserData } = useUserStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save user data to store
    setUserData({
      fullName: formData.fullName,
      email: formData.email
    });
    navigate("/setup-pin");
  };

  const handleHelpClick = () => {
    window.open("https://t.me/Officialbluepay", "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-bluepay-blue text-white">
      <header className="p-4">
        <button onClick={() => navigate("/")} className="flex items-center text-white">
          <ArrowLeft className="h-5 w-5 mr-2" />
        </button>
        <div className="absolute top-4 right-4">
          <span className="text-white cursor-pointer" onClick={handleHelpClick}>You Need Help?</span>
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-center p-6">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-white text-center">BLUEPAY</h1>
          <h2 className="text-2xl font-bold mb-4 text-white">Welcome!</h2>
          <p className="text-gray-100 mb-6">
            Get your account ready and instantly start buying, selling airtime and data online and start paying all your bills in cheaper price.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="fullName"
              placeholder="Your Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="rounded-md bg-white/10 border-white/20 px-4 py-3 text-white placeholder:text-gray-300"
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="rounded-md bg-white/10 border-white/20 px-4 py-3 text-white placeholder:text-gray-300"
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="rounded-md bg-white/10 border-white/20 px-4 py-3 text-white placeholder:text-gray-300"
              required
            />

            <p className="text-sm text-gray-200">
              Any further actions indicates that you agree with our terms & conditions!
            </p>

            <Button
              type="submit"
              className="w-full bg-white hover:bg-gray-100 text-bluepay-blue py-3 font-bold rounded-full"
            >
              Create account
            </Button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-gray-200">Already have an account? </span>
            <button 
              onClick={() => navigate("/pin")} 
              className="text-white font-medium underline"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
