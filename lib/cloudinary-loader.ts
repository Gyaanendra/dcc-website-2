import { buildCloudinaryUrl, resolveMediaUrl } from "./cloudinary";

export interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Next.js custom image loader for Cloudinary.
 * Can be passed to <Image loader={cloudinaryLoader} ... />
 */
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  const resolved = resolveMediaUrl(src);

  // If the src is an absolute external non-cloudinary URL, let Next.js handle it
  if (resolved.startsWith("http") && !resolved.includes("res.cloudinary.com")) {
    return resolved;
  }

  return buildCloudinaryUrl(resolved, {
    width,
    quality: quality ?? "auto",
    crop: "limit",
    format: "auto",
  });
}
