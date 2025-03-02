'use client'
import { useStateContext } from "@/context/StateProvider";
import { Button } from "./ui/button";
import { TrophyIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";
import Link from "next/link";

export default function GameResults() {
    const { gameData, userDetails, handlePlayAgain, handleExitGame } = useStateContext();

    const handleBackToDashboard = () => {
        handleExitGame();
    }

    const handleInviteFriend = () => {
        // Logic to invite a friend
        alert("Invite your friends to join the game!");
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 md:p-6 glass-card rounded-xl">
            <h1 className="text-xl md:text-2xl font-bold mb-4">Game Over</h1>
            <div className="flex flex-col gap-3 items-center mb-4 w-full max-w-xs">
                <p className="text-base md:text-lg flex items-center gap-2">
                    <TrophyIcon className="h-5 w-5 md:h-6 md:w-6 text-yellow-500 mr-2" /> 
                    Your Score: <span className="font-semibold">{gameData.score}</span>
                </p>
                <p className="text-base md:text-lg flex items-center gap-2">
                    <TrophyIcon className="h-5 w-5 md:h-6 md:w-6 text-blue-500 mr-2" />
                    High Score: <span className="font-semibold"> {userDetails?.highScore !== null ? userDetails?.highScore : "Loading..."}</span>
                </p>
                <p className="text-base md:text-lg flex items-center gap-2">
                    <CheckCircleIcon className="h-5 w-5 md:h-6 md:w-6 text-green-500 mr-2" />
                    Correct Answers: <span className="font-semibold">{gameData.correctAnswers}</span>
                </p>
                <p className="text-base md:text-lg flex items-center gap-2">
                    <XCircleIcon className="h-5 w-5 md:h-6 md:w-6 text-red-500 mr-2" />
                    Incorrect Answers: <span className="font-semibold">{gameData.incorrectAnswers}</span>
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button 
                    onClick={handlePlayAgain} 
                    className="w-full bg-blue-500 text-white hover:bg-blue-600"
                >
                    Play Again
                </Button>
                <Button 
                    onClick={handleBackToDashboard} 
                    variant="outline" 
                    className="w-full"
                >
                    Back to Dashboard
                </Button>
            </div>
        </div>
    );
}