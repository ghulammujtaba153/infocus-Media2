import { connectDB } from "@/lib/mongoose";
import { Work } from "@/lib/models/Work";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    // Fetch all works
    const works = await Work.find({}).sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Works retrieved successfully", works },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error getting works:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 