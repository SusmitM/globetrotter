import { Button } from "@/components/ui/button";
import { GamepadIcon, MapPin, SettingsIcon, TrophyIcon, UserPlusIcon } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {

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
        <h1 className="text-3xl text-blue-500 font-bold">Globetrotter</h1>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {dashboardItems.map((item) => (
          <div key={item.title} className="glass-card rounded-xl p-6 flex flex-col gap-2">
            <h2 className="text-lg font-semibold flex items-center gap-2">{item.icon}{item.title}</h2>
            <p className="text-sm text-muted-foreground">{item.description}</p>
            {item.redirection}
          </div>
        ))}
      </div>
    </div>
  );
}