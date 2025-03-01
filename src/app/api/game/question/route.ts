import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import DestinationModel from "@/model/Destination";
import { ApiResponse, QuestionResponse } from "@/types/ApiResponse";

export async function POST(request: NextRequest) {
  console.log("Question API called");

  await dbConnect();

  try {
    // Get previously seen question IDs from request body
    const { seenQuestions = [] } = await request.json();

    if (!Array.isArray(seenQuestions)) {
      return Response.json(
        { success: false, message: "Invalid seenQuestions parameter" } as ApiResponse,
        { status: 400 }
      );
    }

    // Find a destination that hasn't been seen yet
    let destination = await DestinationModel.aggregate([
      { $match: { _id: { $nin: seenQuestions } } },
      { $sample: { size: 1 } }
    ]).then(results => results[0]);

    // If all destinations have been seen, return a random one
    if (!destination) {
      destination = await DestinationModel.aggregate([
        { $sample: { size: 1 } }
      ]).then(results => results[0]);

      if (!destination) {
        return Response.json(
          { success: false, message: "No destinations found" } as ApiResponse,
          { status: 500 }
        );
      }
    }

    // Get the first clue from the destination
    const clue = destination.clues[0];

    // Get 3 other random destinations for incorrect options
    const otherDestinations = await DestinationModel.aggregate([
      { $match: { _id: { $ne: destination._id } } },
      { $sample: { size: 3 } }
    ]);

    // Create options array with correct answer and 3 incorrect options (city names only)
    const options = [
      destination.city,
      ...otherDestinations.map(d => d.city)
    ];

    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    const responseData: QuestionResponse = {
      destinationId: destination._id,
      clue,
      clueNumber: 0,
      totalClues: destination.clues.length,
      imageUrl: destination.imageUrl
    };

    return Response.json(
      { 
        success: true, 
        data: {
          ...responseData,
          options
        }
      } as ApiResponse<QuestionResponse & { options: string[] }>,
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting question:", error);
    return Response.json(
      { success: false, message: "Failed to get question" } as ApiResponse,
      { status: 500 }
    );
  }
} 