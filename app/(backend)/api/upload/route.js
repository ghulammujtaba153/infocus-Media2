// app/api/upload/route.js

import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Get file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique file name
    const fileName = `${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, fileName);

    // Ensure the upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Save file
    await fs.writeFile(filePath, buffer);

    // Return the public path
    const imageUrl = `/uploads/${fileName}`;

    return NextResponse.json({ message: "Upload successful", url: imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
