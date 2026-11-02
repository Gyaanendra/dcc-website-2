import { v2 as cloudinary } from "cloudinary";

// Automatically configures using CLOUDINARY_URL from process.env if present
cloudinary.config({
  secure: true,
});

export interface UploadOptions {
  folder?: string;
  publicId?: string;
  tags?: string[];
  overwrite?: boolean;
}

export interface UploadResult {
  publicId: string;
  secureUrl: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}

/**
 * Upload an image file (local path, remote URL, or base64) to Cloudinary.
 */
export async function uploadToCloudinary(
  file: string,
  options: UploadOptions = {},
): Promise<UploadResult> {
  const result = await cloudinary.uploader.upload(file, {
    folder: options.folder ?? "dcc",
    public_id: options.publicId,
    tags: options.tags,
    overwrite: options.overwrite ?? true,
    resource_type: "auto",
  });

  return {
    publicId: result.public_id,
    secureUrl: result.secure_url,
    format: result.format,
    width: result.width,
    height: result.height,
    bytes: result.bytes,
  };
}

/**
 * Ping Cloudinary to verify that the credentials in .env are valid.
 */
export async function verifyCloudinaryConnection(): Promise<boolean> {
  try {
    const res = await cloudinary.api.ping();
    return res.status === "ok";
  } catch (error) {
    console.error("Cloudinary connection failed:", error);
    return false;
  }
}

export { cloudinary };
