
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { tileId, pictogramId, category } = body;

    // Validate required information
    if (
      typeof tileId !== "string" ||
      typeof category !== "string" ||
      !/^[a-zA-Z0-9_-]+$/.test(tileId) ||
      !/^[a-zA-Z0-9_-]+$/.test(category) ||
      !/^\d+$/.test(String(pictogramId ?? ""))
    ) {
      return NextResponse.json(
        { error: "Invalid or missing pictogram information" },
        { status: 400 }
      );
    }

    // Download the original ARASAAC PNG
    const imageUrl =
      `https://static.arasaac.org/pictograms/${pictogramId}/${pictogramId}_500.png`;

    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error("Could not download ARASAAC image");
    }

    const buffer = Buffer.from(
      await response.arrayBuffer()
    );

    // Convert PNG to WebP
    const webpBuffer = await sharp(buffer)
      .webp({ quality: 85 })
      .toBuffer();

    // Create the category folder if needed
    const folder = path.join(
      process.cwd(),
      "public",
      "pictograms",
      category
    );

    await fs.mkdir(folder, {
      recursive: true,
    });

    // Save the WebP file
    const filePath = path.join(
      folder,
      `${tileId}.webp`
    );

    await fs.writeFile(filePath, webpBuffer);

    return NextResponse.json({
      success: true,
      tileId,
      pictogramId,
      path: `/pictograms/${category}/${tileId}.webp`,
    });
  } catch (error) {
    console.error("Error saving pictogram:", error);

    return NextResponse.json(
      { error: "Could not save pictogram" },
      { status: 500 }
    );
  }
}
