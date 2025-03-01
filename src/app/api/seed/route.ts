import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import DestinationModel from '@/model/Destination';


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { destinations, clearExisting = false } = body;
    
    if (!destinations || !Array.isArray(destinations)) {
      return NextResponse.json(
        { error: 'Invalid data format. Expected an array of destinations.' },
        { status: 400 }
      );
    }
    
    // If clearExisting is true, delete all existing destinations
    if (clearExisting) {
      await DestinationModel.deleteMany({});
    }
    
    // Insert new destinations
    const result = await DestinationModel.insertMany(destinations, { 
      ordered: false 
    });
    
    return NextResponse.json({
      success: true,
      message: `${result.length} destinations added to the database.`
    });
  } catch (error:any) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database', details: error.message },
      { status: 500 }
    );
  }
}

// Add a GET method to check if data exists (useful for initial setup)
export async function GET() {
  try {
    const count = await DestinationModel.countDocuments();
    
    return NextResponse.json({
      success: true,
      count,
      hasData: count > 0
    });
  } catch (error:any) {
    console.error('Error checking database:', error);
    return NextResponse.json(
      { error: 'Failed to check database', details: error.message },
      { status: 500 }
    );
  }
} 