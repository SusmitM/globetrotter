import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import DestinationModel from "@/model/Destination";
import { ApiResponse, NextClueResponse } from "@/types/ApiResponse";

export async function GET(request: NextRequest): Promise<Response> {
//   const session = await getServerSession(authOptions);
  
//   if (!session || !session.user._id) {
//     return Response.json(
//       { success: false, message: "Unauthorized" },
//       { status: 401 }
//     );
//   }

  await dbConnect();

  try {
    // Get destination ID and clue number from query params
    const { searchParams } = new URL(request.url);
    const destinationId = searchParams.get('destinationId');
    const clueNumber = parseInt(searchParams.get('clueNumber') || '1', 10);

    if (!destinationId) {
      return Response.json(
        { success: false, message: "Destination ID is required" } as ApiResponse,
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

    // Check if the requested clue exists
    if (clueNumber < 0 || clueNumber >= destination.clues.length) {
      return Response.json(
        { success: false, message: "No more clues available" } as ApiResponse,
        { status: 400 }
      );
    }

    // Get the requested clue
    const clue = destination.clues[clueNumber];

    const responseData: NextClueResponse = {
      clue,
      clueNumber,
      totalClues: destination.clues.length
    };

    return Response.json(
      { 
        success: true, 
        data: {
          ...responseData,
          pointsDeduction: 10 // Deduct 10 points for requesting an additional clue
        }
      } as ApiResponse<NextClueResponse & { pointsDeduction: number }>,
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting next clue:", error);
    return Response.json(
      { success: false, message: "Failed to get next clue" } as ApiResponse,
      { status: 500 }
    );
  }
} 