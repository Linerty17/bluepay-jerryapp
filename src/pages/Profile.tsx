
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Upload, Sun, Moon, Circle, CircleHelp, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "../stores/userStore";
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userData, setUserData, themeMode, setThemeMode } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Apply theme on component mount and when themeMode changes
  useEffect(() => {
    applyTheme(themeMode);
  }, [themeMode]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserData({
          ...userData!,
          profileImage: reader.result as string
        });
        toast({
          title: "Profile updated",
          description: "Your profile image has been updated successfully",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleThemeChange = (value: string) => {
    setThemeMode(value as 'dark' | 'light' | 'system' | 'device');
    toast({
      title: "Theme updated",
      description: `Theme has been set to ${value} mode`,
    });
  };

  // Function to apply theme to the document
  const applyTheme = (mode: string) => {
    const root = document.documentElement;
    
    // Remove all theme classes first
    root.classList.remove('dark', 'light', 'system', 'device');
    
    if (mode === 'dark') {
      root.classList.add('dark');
    } else if (mode === 'system') {
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.add('light');
      }
      
      // Add listener for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        if (e.matches) {
          root.classList.remove('light');
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
          root.classList.add('light');
        }
      };
      
      // Remove any existing listener to prevent duplicates
      try {
        mediaQuery.removeEventListener('change', handleChange);
      } catch (e) {
        console.log('No existing listener');
      }
      
      // Add new listener
      mediaQuery.addEventListener('change', handleChange);
    } else if (mode === 'device') {
      root.classList.add('device');
    } else {
      // Light mode is default
      root.classList.add('light');
    }
  };

  return (
    <div className="min-h-screen bg-bluepay-blue text-white">
      <header className="p-4 flex items-center">
        <button onClick={() => navigate(-1)} className="flex items-center text-white">
          <ArrowLeft className="h-6 w-6 mr-2" />
        </button>
        <h1 className="text-2xl font-bold flex-1 text-center">Profile</h1>
        <div className="w-6"></div>
      </header>

      <div className="flex flex-col items-center p-6">
        <div className="relative mb-4">
          <Avatar className="w-28 h-28 border-2 border-white">
            {userData?.profileImage ? (
              <AvatarImage src={userData.profileImage} alt="Profile" className="object-cover" />
            ) : (
              <AvatarFallback className="bg-yellow-500 text-white text-4xl">
                <User className="h-12 w-12" />
              </AvatarFallback>
            )}
          </Avatar>
          <div 
            className="absolute bottom-0 right-0 bg-white text-bluepay-blue rounded-full p-2 cursor-pointer"
            onClick={triggerFileUpload}
          >
            <Upload className="h-4 w-4" />
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImageUpload} 
              className="hidden" 
              accept="image/*"
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold">{userData?.fullName || "User"}</h2>
        <p className="text-gray-300 mb-8">{userData?.email || "No email set"}</p>

        <div className="w-full max-w-md bg-white rounded-xl p-6 text-gray-800">
          <h3 className="text-xl font-semibold mb-6">Account Information</h3>
          
          <div className="space-y-6">
            <div>
              <p className="text-gray-500 mb-1">Full Name</p>
              <div className="flex items-center">
                <User className="h-5 w-5 mr-3 text-gray-400" />
                <p className="text-lg">{userData?.fullName || "Not set"}</p>
              </div>
              <div className="h-px bg-gray-200 my-4"></div>
            </div>
            
            <div>
              <p className="text-gray-500 mb-1">Email Address</p>
              <p className="text-lg">{userData?.email || "Not set"}</p>
              <div className="h-px bg-gray-200 my-4"></div>
            </div>
            
            <div>
              <p className="text-gray-500 mb-1">Account Level</p>
              <p className="text-lg">Basic</p>
              <div className="h-px bg-gray-200 my-4"></div>
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 mb-1">Theme</p>
                  <div className="flex items-center">
                    {themeMode === 'light' && <Sun className="h-5 w-5 mr-2 text-gray-500" />}
                    {themeMode === 'dark' && <Moon className="h-5 w-5 mr-2 text-gray-500" />}
                    {themeMode === 'system' && <CircleHelp className="h-5 w-5 mr-2 text-gray-500" />}
                    {themeMode === 'device' && <Smartphone className="h-5 w-5 mr-2 text-gray-500" />}
                    <p className="text-lg">{themeMode === 'light' ? 'Light Mode' : 
                                           themeMode === 'dark' ? 'Dark Mode' : 
                                           themeMode === 'system' ? 'System Mode' : 'Device Mode'}</p>
                  </div>
                </div>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="bg-gray-100">
                      Toggle
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-80">
                    <SheetHeader className="mb-4">
                      <SheetTitle>Select Theme</SheetTitle>
                      <SheetDescription>
                        Choose your preferred app appearance
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-6 py-4">
                      <div className="space-y-4">
                        <div 
                          className={`flex items-center justify-between p-3 rounded-lg ${themeMode === 'light' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}
                          onClick={() => handleThemeChange('light')}
                        >
                          <div className="flex items-center">
                            <Sun className="h-5 w-5 mr-3 text-blue-600" />
                            <div>
                              <p className="font-medium">Light Mode</p>
                              <p className="text-sm text-gray-500">Standard light appearance</p>
                            </div>
                          </div>
                          {themeMode === 'light' && <div className="h-3 w-3 bg-blue-500 rounded-full"></div>}
                        </div>

                        <div 
                          className={`flex items-center justify-between p-3 rounded-lg ${themeMode === 'dark' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}
                          onClick={() => handleThemeChange('dark')}
                        >
                          <div className="flex items-center">
                            <Moon className="h-5 w-5 mr-3 text-blue-600" />
                            <div>
                              <p className="font-medium">Dark Mode</p>
                              <p className="text-sm text-gray-500">Easier on the eyes in low light</p>
                            </div>
                          </div>
                          {themeMode === 'dark' && <div className="h-3 w-3 bg-blue-500 rounded-full"></div>}
                        </div>

                        <div 
                          className={`flex items-center justify-between p-3 rounded-lg ${themeMode === 'system' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}
                          onClick={() => handleThemeChange('system')}
                        >
                          <div className="flex items-center">
                            <CircleHelp className="h-5 w-5 mr-3 text-blue-600" />
                            <div>
                              <p className="font-medium">System Mode</p>
                              <p className="text-sm text-gray-500">Match your system settings</p>
                            </div>
                          </div>
                          {themeMode === 'system' && <div className="h-3 w-3 bg-blue-500 rounded-full"></div>}
                        </div>

                        <div 
                          className={`flex items-center justify-between p-3 rounded-lg ${themeMode === 'device' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}
                          onClick={() => handleThemeChange('device')}
                        >
                          <div className="flex items-center">
                            <Smartphone className="h-5 w-5 mr-3 text-blue-600" />
                            <div>
                              <p className="font-medium">Device Mode</p>
                              <p className="text-sm text-gray-500">Optimized for your device</p>
                            </div>
                          </div>
                          {themeMode === 'device' && <div className="h-3 w-3 bg-blue-500 rounded-full"></div>}
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>

        <Button
          variant="destructive"
          className="mt-10 w-full max-w-md"
          onClick={() => navigate("/")}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
