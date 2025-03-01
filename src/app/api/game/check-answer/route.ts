import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import DestinationModel from "@/model/Destination";
import UserModel from "@/model/User";
import { ApiResponse, CheckAnswerResponse } from "@/types/ApiResponse";

export async function POST(request: NextRequest): Promise<Response> {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user._id) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  await dbConnect();

  try {
    const { destinationId, answer,score, clueCount } = await request.json();

    if (!destinationId || !answer) {
      return Response.json(
        { success: false, message: "Destination ID and answer are required" } as ApiResponse,
        { status: 400 }
      );
    }

    // Find the destination
    const destination = await DestinationModel.findById(destinationId);

    if (!destination) {
      return Response.json(
        { success: false, message: "Destination not found" } as ApiResponse,
        { status: 404 }
      );
    }

    // Check if the answer is correct
    const isCorrect = 
      destination.city.toLowerCase() === answer.toLowerCase()
   let updatedScore

    // If correct, update user's high score if needed
    if (isCorrect && score) {
      updatedScore=score+50-((clueCount-1)*10)

      const user = await UserModel.findById(session.user._id);

      if (user && updatedScore > user.highScore) {
        user.highScore = updatedScore;
        await user.save();
      }
    }

    const funFacts = destination.fun_fact;
    const trivia = destination.trivia;

    const responseData: CheckAnswerResponse = {
      isCorrect,
      correctAnswer: {
        city: destination.city,
        country: destination.country
      },
      funFacts,
      trivia,
      pointsAwarded: isCorrect ? 50-((clueCount-1)*10) : 0
    };

    return Response.json(
      { 
        success: true, 
        data: responseData
      } as ApiResponse<CheckAnswerResponse>,
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking answer:", error);
    return Response.json(
      { success: false, message: "Failed to check answer" } as ApiResponse,
      { status: 500 }
    );
  }
} 