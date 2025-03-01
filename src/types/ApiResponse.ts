export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
}

export interface CheckAnswerResponse {
    isCorrect: boolean;
    correctAnswer: {
        city: string;
        country: string;
    };
    funFacts: string[];
    trivia: string[];
    pointsAwarded: number;
}

export interface NextClueResponse {
    clue: string;
    clueNumber: number;
    totalClues: number;
}

export interface QuestionResponse {
    destinationId: string;
    clue: string;
    clueNumber: number;
    totalClues: number;
    imageUrl?: string;
}

export interface UpdateScoreResponse {
    newScore: number;
    highScore: number;
}