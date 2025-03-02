'use client'
import { useStateContext } from "@/context/StateProvider";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Settings() {
  const { userDetails } = useStateContext();
  
  if (!userDetails) {
    return (
      <div className="min-h-screen hero-pattern pt-16 md:pt-20 px-4 flex justify-center">
        <div className="glass-card p-6 rounded-lg shadow-xl w-full max-w-md">
          <p className="text-center text-white">Loading user details...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen hero-pattern pt-16 md:pt-20 px-4 flex justify-center items-center">
      <div className="glass-card p-4 md:p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <Link href="/dashboard">
            <div className="flex items-center gap-2 text-sm hover:underline cursor-pointer mb-3 md:mb-0">
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </div>
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-white text-center">User Profile</h1>
        </div>
        
        <div className="space-y-4 md:space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-white">Account Information</h2>
            <div className="glass-card p-3 md:p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Username</span>
                  <span className="font-medium">{userDetails.username}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">High Score</span>
                  <span className="font-medium">{userDetails.highScore}</span>
                </div>
              </div>
            </div>
          </div>
          
          {userDetails.invitedBy && (
            <div className="space-y-2">
              <h2 className="text-lg font-medium text-white">Invited By</h2>
              <div className="glass-card p-3 md:p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Username</span>
                    <span className="font-medium">{userDetails.invitedBy.username}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">High Score</span>
                    <span className="font-medium">{userDetails.invitedBy.highScore}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}