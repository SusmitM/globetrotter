import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(request: NextRequest): Promise<Response> {
  await dbConnect();

  try {
    const { username, inviterId } = await request.json();

    // Check if username already exists
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return Response.json(
        { success: false, message: "Username already taken" },
        { status: 400 }
      );
    }

    // Generate a random password
    const password = crypto.randomBytes(4).toString('hex');
    const hashedPassword = await bcrypt.hash(password, 10);
    
  

    // Create a new user account
    const newUser = new UserModel({
      username,
      email: `${username}-invite@temporary.com`, 
      password: hashedPassword,
      isVerified: true, 
      invitedBy: inviterId,
      highScore: 0
    });

    await newUser.save();

    return Response.json({
      success: true,
      message: "Invitation created successfully",
      password 
    }, { status: 201 });
    
  } catch (error) {
    console.error("Error creating invitation", error);
    return Response.json(
      { success: false, message: "Error creating invitation" },
      { status: 500 }
    );
  }
} 