"use client";

import { useStateContext } from "@/context/StateProvider";
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function ExampleUsage() {
  const { gameData, timeLeft, currentQuestion, clues, clueCount, fetchClues } =
    useStateContext();
  if (!currentQuestion) {
    return <div>No current question available.</div>;
  }
  const { destinationId, clue, totalClues, options } = currentQuestion;
  console.log("🚀 ~ ExampleUsage ~ currentQuestion:", currentQuestion);

  return (
    <div className="border border-red-500 flex flex-col items-center justify-center p-12 w-[50%] gap-4">
      <section className=" header-section flex justify-between items-center flex-start w-full">
        <p className="flex items-center gap-2">
          <ArrowLeftIcon /> Exit Game
        </p>
        <div className="flex items-center gap-2">
          <p>Score: {gameData.score}</p>
          <p>Time Left: {timeLeft}</p>
        </div>
      </section>

      <section className="glass-card rounded-xl p-6 flex flex-col gap-2 w-full bg-black">
        <p className="text-2xl font-bold">Where in the world is this?</p>
        <p className="text-sm text-muted-foreground">
          Guess the destination based on the clue
        </p>
        <div className="flex flex-col gap-2 glass-card rounded-xl p-6">
          {clues.map((clue, index) => (
            <p key={index} className="text-lg font-semibold">
              Clue {index + 1}: {clue}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {options.map((option, index) => (
            <p
              className="glass-card font-bold rounded-xl p-2 hover:bg-gray-800 cursor-pointer"
              key={index}
            >
              {option}
            </p>
          ))}
        </div>
        <Button
          disabled={clueCount === totalClues}
          className="glass-card rounded-xl p-2 hover:bg-blue-400 cursor-pointer"
          onClick={() => fetchClues(destinationId)}
        >
          Next Clue (-10 points)
        </Button>
      </section>

      <section className="footer-section flex  justify-between w-full">
        <p className="flex items-center gap-2">
          <CheckCircleIcon className="text-green-500" />{" "}
          {gameData.correctAnswers} Correct
        </p>
        <p className="flex items-center gap-2">
          <XCircleIcon className="text-red-500" /> {gameData.incorrectAnswers}{" "}
          Incorrect
        </p>
      </section>
    </div>
  );
}
