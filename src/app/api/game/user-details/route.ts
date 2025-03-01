import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel, { User } from "@/model/User";
import { ApiResponse, UserScoreResponse } from "@/types/ApiResponse";

export async function GET(request: NextRequest): Promise<Response> {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user._id) {
    return Response.json(
      { success: false, message: "Unauthorized" } as ApiResponse,
      { status: 401 }
    );
  }

  await dbConnect();

  try {
    // Get the current user
    const currentUser = await UserModel.findById(session.user._id) as User;
    
    if (!currentUser) {
      return Response.json(
        { success: false, message: "User not found" } as ApiResponse,
        { status: 404 }
      );
    }

    // Create response with current user's data
    const responseData: UserScoreResponse = {
      userId: currentUser._id ? currentUser._id.toString() : '',
      username: currentUser.username || 'Anonymous User',
      highScore: currentUser.highScore || 0
    };

    // If the user was invited by someone, get the inviter's score
    if (currentUser.invitedBy) {
      const inviter = await UserModel.findById(currentUser.invitedBy) as User;
      if (inviter) {
        responseData.invitedBy = {
          userId: inviter._id ? inviter._id.toString() : '',
          username: inviter.username || 'Anonymous User',
          highScore: inviter.highScore || 0
        };
      }
    }

    return Response.json(
      { 
        success: true, 
        data: responseData
      } as ApiResponse<UserScoreResponse>,
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting user score:", error);
    return Response.json(
      { success: false, message: "Failed to get user score" } as ApiResponse,
      { status: 500 }
    );
  }
} 