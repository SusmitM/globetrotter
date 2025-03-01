import { Clock, TrophyIcon } from "lucide-react";
import { Button } from "./ui/button";
import { GameRules } from "./GameRules";
import { useStateContext } from "@/context/StateProvider";

export default function GameIntro() {
  const {setGameState}=useStateContext();
  return (
   <>
    <div className="glass-card rounded-xl p-6 flex flex-col gap-2 mb-6">
      <h1 className="text-2xl font-bold">Ready to test your knowledge?</h1>
      <p className="text-sm text-muted-foreground">
        Guess destinations from cryptic clues and earn points!
      </p>
      <div className="flex  gap-12">
        <div className="flex flex-col gap-2 glass-card text-white p-4 rounded-md justify-center items-center">
        <TrophyIcon className="h-6 w-6 text-blue-500"/>
        <p>Each correct answer is worth 50 points!</p>
        </div>
        <div className="flex flex-col gap-2 glass-card text-white p-4 rounded-md justify-center items-center"> 
        <Clock className="h-6 w-6 text-blue-500"/>
        <p>Extra clues cost 10 points each</p>

        </div>
      </div>
      <Button onClick={()=>setGameState('PLAYING')} variant="outline" className="bg-blue-500 text-white hover:bg-blue-600">Start Game</Button>
    </div>

    <GameRules/>
   </>
  );
}
