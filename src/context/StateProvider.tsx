"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useToast } from "@/hooks/use-toast";
import { UserScoreResponse } from "@/types/ApiResponse";

type CurrentQuestionType = {
  destinationId: string;
  clue: string;
  clueNumber: number;
  totalClues: number;
  options: string[];
} | null;

type StateContextType = {
  gameState: "NOT-STARTED" | "PLAYING" | "FINISED";
  setGameState: (gameState: "NOT-STARTED" | "PLAYING" | "FINISED") => void;
  gameData: { score: number; correctAnswers: number; incorrectAnswers: number };
  setGameData: (gameData: {
    score: number;
    correctAnswers: number;
    incorrectAnswers: number;
  }) => void;
  timeLeft: number;
  setTimeLeft: (timeLeft: number) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  userDetails: UserScoreResponse | null;
  isLoadingUserDetails: boolean;
  refreshUserDetails: () => Promise<void>;
  currentQuestion: CurrentQuestionType;
  clues: string[];
  clueCount: number;
  fetchClues: (destinationId: string) => Promise<void>;
  checkAnswer: (destinationId: string, answer: string) => Promise<void>;
  answerData: CurrentQuestionType | null;
  showAnswerModal: boolean;
  setShowAnswerModal: (showAnswerModal: boolean) => void;
  handleFinishGame: () => void;
  handlePlayAgain: () => void;
  fetchQuestionDetails: () => Promise<void>;
};

const StateContext = createContext<StateContextType | undefined>(undefined);

export function StateProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<
    "NOT-STARTED" | "PLAYING" | "FINISED"
  >("PLAYING");

  const [gameData, setGameData] = useState<{
    score: number;
    correctAnswers: number;
    incorrectAnswers: number;
  }>({ score: 0, correctAnswers: 0, incorrectAnswers: 0 });

  const [answerData, setAnswerData] = useState<any | null>(null);

  const [timeLeft, setTimeLeft] = useState(120);
  const [seenQuestions, setSeenQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestionType | null>(null);

  const [clues, setClues] = useState<string[]>([]);
  const [clueCount, setClueCount] = useState(1);
  const [showAnswerModal,setShowAnswerModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserScoreResponse | null>(
    null
  );
  const [isLoadingUserDetails, setIsLoadingUserDetails] =
    useState<boolean>(true);

  const fetchUserDetails = async () => {
    setIsLoadingUserDetails(true);
    try {
      const response = await fetch("/api/game/user-details");

      if (!response.ok) {
        throw new Error(`Failed to fetch user details: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setUserDetails(result.data);
      } else {
        throw new Error(result.message || "Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to load user details",
        variant: "destructive",
      });
      setUserDetails(null);
    } finally {
      setIsLoadingUserDetails(false);
    }
  };

  const fetchQuestionDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/game/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ seenQuestions }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch question details: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setCurrentQuestion(result.data);
        setSeenQuestions([...seenQuestions, result.data.destinationId]);
        setClueCount(1);
        setClues([result.data.clue]);
      } else {
        throw new Error(result.message || "Failed to fetch question details");
      }
    } catch (error) {
      console.error("Error fetching question details:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to load question details",
        variant: "destructive",
      });
      setCurrentQuestion(null);
    } finally {
      setShowAnswerModal(false);
      setIsLoading(false);
    }
  };

  const refreshUserDetails = async () => {
    await fetchUserDetails();
  };

  const checkAnswer = async (destinationId: string, answer: string) => {
    setIsLoading(true);
    console.log("Inside check answer")
    try {
      const response = await fetch("/api/game/check-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ destinationId, answer,score:gameData.score,clueCount }),
      });

      if (!response.ok) {
        throw new Error(`Failed to check answer: ${response.status}`);
      }

      const result = await response.json();
      
      
      if (result.success) {
        setAnswerData(result.data);

        if (result.data.isCorrect) {
          setGameData({
            ...gameData,
            score: gameData.score + result.data.pointsAwarded,
            correctAnswers: gameData.correctAnswers + 1,
          });
        } else {
          setGameData({
            ...gameData,
            incorrectAnswers: gameData.incorrectAnswers + 1,
          });
        }
      } else {
        throw new Error(result.message || "Failed to check answer");
      }
    } catch (error) {
      console.error("Error checking question:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to check question",
        variant: "destructive",
      });
      setCurrentQuestion(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchClues = async (destinationId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/game/next-clue?destinationId=${encodeURIComponent(
          destinationId
        )}&clueNumber=${clueCount}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch clues: ${response.status}`);
      }
      const result = await response.json();
      if (result.success) {
        setClues((prev) => [...prev, result.data.clue]);
        setClueCount((prev) => prev + 1);
      } else {
        throw new Error(result.message || "Failed to fetch clues");
      }
    } catch (error) {
      console.error("Error fetching clues:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to load clues",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

    const handleFinishGame = () => {
      setShowAnswerModal(false);
      setGameState("FINISED");
      setTimeLeft(120); 
      setIsLoading(false);
      setCurrentQuestion(null);
      setClues([]);
      setClueCount(1);
      setAnswerData(null);
      setSeenQuestions([]);
      refreshUserDetails();
  };
  const handlePlayAgain = () => {
    handleFinishGame()
    setGameState("PLAYING");
    setShowAnswerModal(false);
    setGameData({ score: 0, correctAnswers: 0, incorrectAnswers: 0 });
    fetchQuestionDetails();
  }
  

  const value = {
    gameData,
    setGameData,
    timeLeft,
    setTimeLeft,
    isLoading,
    setIsLoading,
    userDetails,
    isLoadingUserDetails,
    refreshUserDetails,
    gameState,
    setGameState,
    currentQuestion,
    clues,
    clueCount,
    fetchClues,
    checkAnswer,
    answerData,
    showAnswerModal,
    setShowAnswerModal,
    handleFinishGame,
    handlePlayAgain,
    fetchQuestionDetails
  };



  useEffect(() => {
    fetchUserDetails();
    fetchQuestionDetails()
  }, []);

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
}

export function useStateContext() {
  const context = useContext(StateContext);

  if (context === undefined) {
    throw new Error("useStateContext must be used within a StateProvider");
  }

  return context;
}
