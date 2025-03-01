'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Clock, TrophyIcon } from "lucide-react";

export function GameRules() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="border-none">
          Game Rules 👀
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">Game Rules</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="space-y-4">
              <div className="mb-2">
                <span className="font-bold text-white font-lg flex items-center gap-2">
                  <TrophyIcon className="h-4 w-4 text-blue-500"/> Scoring:
                </span>
              </div>
              <ul className="list-disc pl-5">
                <li>Each correct answer is worth 50 points</li>
                <li>Extra clues cost 10 points each</li>
                <li>Try to get the highest score possible!</li>
              </ul>

              <div className="mb-2 mt-4">
                <span className="font-bold text-white font-lg flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500"/> Gameplay:
                </span>
              </div>
              <ul className="list-disc pl-5">
                <li>You&apos;ll be shown a clue about a famous destination</li>
                <li>Choose from 4 possible answers</li>
                <li>If you need help, you can request an additional clue</li>
                <li>After answering, you&apos;ll see if you were correct and learn a fun fact</li>
                <li>You have 2 minutes to answer as many questions as possible</li>
              </ul>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
