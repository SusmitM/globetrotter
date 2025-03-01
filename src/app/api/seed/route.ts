import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import DestinationModel from "@/model/Destination";
import { destinationData } from "@/data/seedData";

export async function POST(request: NextRequest): Promise<Response> {


  await dbConnect();

  try {
    // Clear existing data if requested
    const { clearExisting } = await request.json();
    
    if (clearExisting) {
      await DestinationModel.deleteMany({});
    }

    // Insert seed data
    const result = await DestinationModel.insertMany(destinationData);

    return Response.json(
      { 
        success: true, 
        message: `Successfully seeded ${result.length} destinations` 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error seeding database:", error);
    return Response.json(
      { success: false, message: "Failed to seed database" },
      { status: 500 }
    );
  }
} 