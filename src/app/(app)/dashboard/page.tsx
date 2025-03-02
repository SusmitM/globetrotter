'use client'
import { Button } from "@/components/ui/button";
import { GamepadIcon, MapPin, SettingsIcon, TrophyIcon, UserPlusIcon } from "lucide-react";
import Link from "next/link";
import { useStateContext } from "@/context/StateProvider";
import DashboardTile from "@/components/DashboardTile";

export default function Dashboard() {
  const {userDetails}=useStateContext();

  const dashboardItems = [
    {
      title: "Start Game",
      description: "Test your knowledge of famous destinations with cryptic clues.",
      icon: <GamepadIcon className="h-6 w-6 text-blue-500"/>,
      redirection: <Link href="/dashboard/game">
      <Button variant="outline" className="bg-blue-500 text-white hover:bg-blue-600">
        Play Now
      </Button>
    </Link>
    },
    {
      title: "Leaderboard",
      description: "See how you rank against other players.",
      icon: <TrophyIcon className="h-6 w-6 text-blue-500"/>,
      redirection: <Link href="/dashboard/leaderboard">
      <Button variant="outline">
        View Ranking
      </Button>
    </Link>
    },
    {
      title:"Challenge a Friend",
      description: "Send a challenge link to friends and compete for the highest score.",
      icon: <UserPlusIcon className="h-6 w-6 text-blue-500"/>,
      redirection: <Link href="/dashboard/challenge">
      <Button variant="outline">
        Send Challenge
      </Button>
    </Link>
    },
    {
      title: "Settings",
      description: "View and update your profile information.",
      icon: <SettingsIcon className="h-6 w-6 text-blue-500"/>,
      redirection: <Link href="/dashboard/settings">
      <Button variant="outline">
        View Profile
      </Button>
    </Link>
    },
    
  ]

  return (
    <div className="min-h-screen hero-pattern pt-16 md:pt-20 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Welcome, {userDetails ? userDetails.username : "Player"}!
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {dashboardItems.map((item, index) => (
              <DashboardTile
                key={index}
                title={item.title}
                description={item.description}
                icon={item.icon}
                redirection={item.redirection}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}