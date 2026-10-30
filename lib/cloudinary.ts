/**
 * Client- and server-safe Cloudinary URL utilities.
 * Uses environment variables without pulling in Node-only native modules.
 */

import cloudinaryMapJson from "@/content/cloudinary-map.json";

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "limit" | "scale" | "thumb";
  quality?:
    | "auto"
    | "auto:best"
    | "auto:good"
    | "auto:eco"
    | "auto:low"
    | number;
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
  gravity?: "auto" | "face" | "center";
}

const DEFAULT_CLOUD_NAME = "djjdhzda8";
const cloudinaryMap = cloudinaryMapJson as Record<
  string,
  { secure_url: string; public_id: string }
>;

/**
 * Resolves a media path to its Cloudinary CDN URL if available in the manifest,
 * or returns the original source path.
 */
export function resolveMediaUrl(src: string): string {
  if (!src) return src;
  if (cloudinaryMap[src]?.secure_url) {
    return cloudinaryMap[src].secure_url;
  }
  return src;
}

/**
 * Resolves the active Cloudinary cloud name from the environment.
 */
export function getCloudName(): string {
  if (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    return process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  }
  if (process.env.CLOUDINARY_URL) {
    const atParts = process.env.CLOUDINARY_URL.split("@");
    if (atParts.length > 1) {
      return atParts[1].replace(/[/].*$/, "");
    }
  }
  return DEFAULT_CLOUD_NAME;
}

/**
 * Checks whether a given URL is hosted on Cloudinary.
 */
export function isCloudinaryUrl(url: string): boolean {
  return typeof url === "string" && url.includes("res.cloudinary.com");
}

/**
 * Builds an optimized Cloudinary delivery URL with f_auto, q_auto and resizing.
 *
 * @param publicId - The Cloudinary public ID or existing Cloudinary URL
 * @param options - Transformation options (width, height, crop, quality, format)
 */
export function buildCloudinaryUrl(
  publicId: string,
  options: CloudinaryTransformOptions = {},
): string {
  if (!publicId) return "";

  // If already a full URL that is NOT Cloudinary, return as-is
  if (publicId.startsWith("http") && !isCloudinaryUrl(publicId)) {
    return publicId;
  }

  const cloudName = getCloudName();
  const {
    width,
    height,
    crop = "limit",
    quality = "auto",
    format = "auto",
    gravity,
  } = options;

  const transforms: string[] = [`f_${format}`, `q_${quality}`];

  if (crop) transforms.push(`c_${crop}`);
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (gravity) transforms.push(`g_${gravity}`);

  const transformString = transforms.join(",");

  // Extract clean public_id if full Cloudinary URL was passed
  let cleanPublicId = publicId;
  if (isCloudinaryUrl(publicId)) {
    const uploadIndex = publicId.indexOf("/upload/");
    if (uploadIndex !== -1) {
      const rest = publicId.slice(uploadIndex + "/upload/".length);
      // Skip existing transformations if any (e.g. v12345/ or w_500/v12345/)
      const parts = rest.split("/");
      const idParts = parts.filter(
        (p) => !p.includes("_") && !/^v\d+$/.test(p),
      );
      cleanPublicId = idParts.join("/");
    }
  }

  // Strip leading slash
  cleanPublicId = cleanPublicId.replace(/^\//, "");

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${cleanPublicId}`;
}
