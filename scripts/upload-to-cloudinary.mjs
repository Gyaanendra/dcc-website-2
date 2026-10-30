import fs from "node:fs";
import path from "node:path";
import { v2 as cloudinary } from "cloudinary";

// Ensure environment variables are loaded
if (!process.env.CLOUDINARY_URL) {
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    for (const line of envContent.split("\n")) {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        process.env[match[1].trim()] = match[2].trim();
      }
    }
  }
}

if (!process.env.CLOUDINARY_URL) {
  console.error("Error: CLOUDINARY_URL is not defined in .env or environment.");
  process.exit(1);
}

// Re-configure cloudinary from CLOUDINARY_URL
cloudinary.config(true);
cloudinary.config({ secure: true });

const UPLOAD_DIRS = [
  { dir: "public/images/team", folder: "dcc/team" },
  { dir: "public/images/gallery", folder: "dcc/gallery" },
  { dir: "public/media", folder: "dcc/media" },
];

async function main() {
  console.log("Connecting to Cloudinary...");
  const ping = await cloudinary.api.ping();
  console.log(`✓ Cloudinary connected (status: ${ping.status})\n`);

  const results = {};
  const allowedExtensions = new Set([
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".svg",
    ".mp4",
  ]);

  for (const { dir, folder } of UPLOAD_DIRS) {
    const fullDir = path.resolve(process.cwd(), dir);
    if (!fs.existsSync(fullDir)) continue;

    const files = fs.readdirSync(fullDir);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!allowedExtensions.has(ext)) continue;

      const filePath = path.join(fullDir, file);
      const relativePath = `/${path.relative(path.resolve(process.cwd(), "public"), filePath)}`;
      const baseName = path.basename(file, ext);

      console.log(`Uploading ${relativePath} to ${folder}/${baseName}...`);
      try {
        const uploadRes = await cloudinary.uploader.upload(filePath, {
          folder,
          public_id: baseName,
          overwrite: true,
          resource_type: ext === ".mp4" ? "video" : "image",
        });

        results[relativePath] = {
          public_id: uploadRes.public_id,
          secure_url: uploadRes.secure_url,
          format: uploadRes.format,
          width: uploadRes.width,
          height: uploadRes.height,
        };
        console.log(`  ✓ ${uploadRes.secure_url}`);
      } catch (err) {
        console.error(`  ✗ Failed to upload ${file}:`, err.message);
      }
    }
  }

  const outPath = path.resolve(process.cwd(), "content/cloudinary-map.json");
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), "utf8");
  console.log(
    `\n✓ Upload complete. Manifest saved to ${path.relative(process.cwd(), outPath)}`,
  );
}

main().catch((err) => {
  console.error("Fatal upload error:", err);
  process.exit(1);
});
