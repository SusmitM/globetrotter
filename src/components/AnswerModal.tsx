'use client'
import { useStateContext } from "@/context/StateProvider";
import { useState } from "react";
import { Button } from "./ui/button";

type AnswerDataType = {
  isCorrect: boolean;
  correctAnswer: {
    city: string;
    country: string;
  };
  funFacts: string[];
  trivia: string[];
  pointsAwarded: number;
};

export default function AnswerModal() {
  const { answerData,handleFinishGame,fetchQuestionDetails } = useStateContext();
  const typedAnswerData = answerData as unknown as AnswerDataType;
  
  const handleNextQuestion = () => {
    fetchQuestionDetails()
  }
  
  if (!answerData) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay with blur effect */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
       
      ></div>
      
      {/* Modal content */}
      <div className="glass-card rounded-xl p-6 flex flex-col gap-4 w-11/12 max-w-md bg-black/80 relative z-10 border border-gray-700 shadow-xl">
        {typedAnswerData ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold">
                {typedAnswerData.isCorrect ? "🎉 Correct Answer" : "😢 Incorrect Answer"}
              </h1>
            </div>
            
            <p className="text-lg mb-4"> 
              The correct answer is <span className="font-bold">{typedAnswerData.correctAnswer.city}, {typedAnswerData.correctAnswer.country}</span>
            </p>
            
            <div className="space-y-4 ">
              <div>
                <h2 className="text-lg font-semibold mb-2">Fun Facts:</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {typedAnswerData.funFacts.map((fact, index) => (
                    <li key={index}>{fact}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-2">Trivia:</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {typedAnswerData.trivia.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-center">
                  {typedAnswerData.isCorrect 
                    ? `You earned ${typedAnswerData.pointsAwarded} points!` 
                    : "Better luck next time!"}
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-center">
              <Button onClick={handleFinishGame} variant="outline">Finish Game</Button>

                <Button onClick={handleNextQuestion}>Next Question</Button>
          
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}