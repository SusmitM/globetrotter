import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/signUpSchema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json(
        { success: false, message: 'Username is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Check if username exists
    const existingUser = await UserModel.findOne({ username });
    
    return NextResponse.json({
      success: true,
      data: {
        isAvailable: !existingUser
      }
    });
  } catch (error) {
    console.error('Error checking username:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to check username' },
      { status: 500 }
    );
  }
}