import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { ApiResponse } from "@/types/ApiResponse";

interface LeaderboardEntry {
  userId: string;
  username: string;
  highScore: number;
  rank: number;
}

interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  currentUserRank?: LeaderboardEntry;
}

export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '5', 10); // Default to top 5

  await dbConnect();

  try {
    // Get top users by high score
    const topUsers = await UserModel.find({ highScore: { $gt: 0 } })
      .sort({ highScore: -1 })
      .limit(limit)
      .select('_id name username highScore');

    // Format the leaderboard data
    const leaderboard: LeaderboardEntry[] = topUsers.map((user, index) => ({
      userId: user._id ? user._id.toString() : '',
      username: user.username || 'Anonymous User',
      highScore: user.highScore || 0,
      rank: index + 1
    }));

    const responseData: LeaderboardResponse = {
      leaderboard
    };


    return Response.json(
      { 
        success: true, 
        data: responseData
      } as ApiResponse<LeaderboardResponse>,
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting leaderboard:", error);
    return Response.json(
      { success: false, message: "Failed to get leaderboard" } as ApiResponse,
      { status: 500 }
    );
  }
} 