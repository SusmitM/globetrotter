import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { ApiResponse, UpdateScoreResponse } from "@/types/ApiResponse";

export async function POST(request: NextRequest): Promise<Response> {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user._id) {
    return Response.json(
      { success: false, message: "Unauthorized" } as ApiResponse,
      { status: 401 }
    );
  }

  await dbConnect();

  try {
    const { score } = await request.json();

    if (typeof score !== 'number') {
      return Response.json(
        { success: false, message: "Valid score is required" } as ApiResponse,
        { status: 400 }
      );
    }

    // Update user's high score if the new score is higher
    const user = await UserModel.findById(session.user._id);
    
    if (!user) {
      return Response.json(
        { success: false, message: "User not found" } as ApiResponse,
        { status: 404 }
      );
    }

    let updated = false;
    if (score > user.highScore) {
      user.highScore = score;
      await user.save();
      updated = true;
    }

    const responseData: UpdateScoreResponse = {
      newScore: score,
      highScore: user.highScore
    };

    return Response.json(
      { 
        success: true, 
        data: {
          ...responseData,
          updated
        }
      } as ApiResponse<UpdateScoreResponse & { updated: boolean }>,
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating score:", error);
    return Response.json(
      { success: false, message: "Failed to update score" } as ApiResponse,
      { status: 500 }
    );
  }
} 