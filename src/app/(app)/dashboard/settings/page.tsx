'use client'
import { useStateContext } from "@/context/StateProvider";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Settings() {
  const { userDetails } = useStateContext();
  
  if (!userDetails) {
    return (
      <div className="min-h-screen hero-pattern pt-20 px-4 flex justify-center">
        <div className="glass-card p-6 rounded-lg shadow-xl w-full max-w-md">
          <p className="text-center text-white">Loading user details...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen hero-pattern pt-20 px-4 flex justify-center items-center">
      <div className="glass-card p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <Link href="/dashboard">
            <div className="flex items-center gap-2 text-sm hover:underline cursor-pointer">
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white text-center">User Profile</h1>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-300">Username</span>
            <span className="text-white font-medium">{userDetails.username}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-300">Highscore</span>
            <span className="text-white font-medium">{userDetails.highScore}</span>
          </div>
          
          {userDetails.invitedBy && (
           <>
            <div className="flex justify-between">
              <span className="text-gray-300">Invited By</span>
              <span className="text-white font-medium">{userDetails.invitedBy.username}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">{userDetails.invitedBy.username}'s Highscore</span>
              <span className="text-white font-medium">{userDetails.invitedBy.highScore}</span>
            </div>
           </>
          )}
        </div>
      </div>
    </div>
  );
}