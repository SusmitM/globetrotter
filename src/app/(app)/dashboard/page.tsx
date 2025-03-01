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
    <div className="min-h-screen hero-pattern px-4 flex flex-col gap-4 justify-center items-center">

      <div className="flex flex-col items-center gap-2 mb-8">
        <MapPin className="h-12 w-12 text-blue-500 inline-block"/>
        <h1 className="text-4xl text-blue-500 font-bold">Globetrotter</h1>
        <p className="text-lg">Hey, {userDetails?.username}! Ready for a challenge?</p>
        {
          userDetails?.invitedBy && (
            <p className="text-md text-muted-foreground">Can you beat your friend {userDetails?.invitedBy?.username}'s score? <span className="text-blue-500 font-bold">{userDetails?.invitedBy?.highScore}</span></p>
          )
        }
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {dashboardItems.map((item: { title: string; description: string; icon: React.ReactNode; redirection: React.ReactNode; }) => (
          <DashboardTile key={item.title} item={item}/>
           
        ))}
      </div>
    </div>
  );
}