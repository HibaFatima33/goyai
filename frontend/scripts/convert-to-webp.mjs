
import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = path.join(process.cwd(), "public", "pictograms");

async function convertDirectory(directory) {
  const entries = fs.readdirSync(directory, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await convertDirectory(fullPath);
      continue;
    }

    if (!entry.name.toLowerCase().endsWith(".png")) {
      continue;
    }

    const webpPath = fullPath.replace(/\.png$/i, ".webp");

    await sharp(fullPath)
      .webp({ quality: 85 })
      .toFile(webpPath);

    console.log(`Converted: ${entry.name}`);
  }
}

await convertDirectory(root);

console.log("All PNG images converted to WebP!");
