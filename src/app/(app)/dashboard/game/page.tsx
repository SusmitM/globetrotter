'use client'
import ExampleUsage from "@/components/GamePlay";
import GameIntro from "@/components/GameIntro";
import GameResults from "@/components/GameResults";
import { useStateContext } from "@/context/StateProvider";
import { useState } from "react";


export default function Game() {
  const {userDetails,gameState}=useStateContext();

//  gameState: 'NOT-STARTED'|'PLAYING'|'FINISED'

  return (
    <div className="min-h-screen hero-pattern pt-20 px-4 flex flex-col items-center justify-center">
      
      
      {gameState === 'NOT-STARTED' ? (
        <GameIntro/>
      ) : gameState === 'PLAYING' ? (
        <ExampleUsage/>
      ) : gameState === 'FINISED' ? (
        <GameResults/>
      ) : null}
    </div>
  );
}