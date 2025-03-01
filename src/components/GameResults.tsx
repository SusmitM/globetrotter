import { useEffect, useState } from "react";
import { useStateContext } from "@/context/StateProvider";
import { Button } from "./ui/button";
import { TrophyIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";
import Link from "next/link";

export default function GameResults() {
    const { gameData, userDetails, handlePlayAgain, refreshUserDetails } = useStateContext();


   
    const handleInviteFriend = () => {
        // Logic to invite a friend (e.g., copy link or open invite modal)
        alert("Invite your friends to join the game!");
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 glass-card rounded-xl">
            <h1 className="text-2xl font-bold mb-4">Game Over</h1>
            <div className="flex flex-col gap-3 items-center mb-4">
                <p className="text-lg flex items-center gap-2">
                    <TrophyIcon className="h-6 w-6 text-yellow-500 mr-2" /> 
                    Your Score: <span className="font-semibold">{gameData.score}</span>
                </p>
                <p className="text-lg flex items-center gap-2">
                    <TrophyIcon className="h-6 w-6 text-blue-500 mr-2" />
                    High Score: <span className="font-semibold"> {userDetails?.highScore  !== null ? userDetails?.highScore  : "Loading..."}</span>
                </p>
                <p className="text-lg flex items-center gap-2">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
                    Correct Answers: <span className="font-semibold">{gameData.correctAnswers}</span>
                </p>
                <p className="text-lg flex items-center gap-2">
                    <XCircleIcon className="h-6 w-6 text-red-500 mr-2" />
                    Incorrect Answers: <span className="font-semibold">{gameData.incorrectAnswers}</span>
                </p>
            </div>
            <div className="flex gap-4 mt-4">
                <Button onClick={handlePlayAgain} variant="outline">Play Again</Button>
                <Link href="/dashboard/challenge"> <Button  variant="outline">Challenge a Friend</Button></Link>
                
                <Link href="/dashboard"> <Button variant="outline">Back to Dashboard</Button></Link>
            </div>
        </div>
    );
}