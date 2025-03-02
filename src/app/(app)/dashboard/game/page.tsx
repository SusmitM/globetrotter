'use client'
import ExampleUsage from "@/components/GamePlay";
import GameIntro from "@/components/GameIntro";
import GameResults from "@/components/GameResults";
import { useStateContext } from "@/context/StateProvider";
import { useState } from "react";
import GamePlay from "@/components/GamePlay";


export default function Game() {
  const {userDetails, gameState} = useStateContext();

//  gameState: 'NOT-STARTED'|'PLAYING'|'FINISED'

  return (
    <div className="min-h-screen hero-pattern pt-16 md:pt-20 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl mx-auto">
        {gameState === 'NOT-STARTED' ? (
          <GameIntro/>
        ) : gameState === 'PLAYING' ? (
          <GamePlay/>
        ) : gameState === 'FINISED' ? (
          <GameResults/>
        ) : null}
      </div>
    </div>
  );
}