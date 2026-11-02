"use client";

import Image, { type ImageProps } from "next/image";
import { resolveMediaUrl } from "@/lib/cloudinary";

export interface CloudinaryImageProps extends Omit<ImageProps, "src"> {
  src: string;
}

/**
 * Drop-in Next.js Image component that automatically resolves local paths
 * to their Cloudinary CDN URLs from the upload manifest.
 */
export function CloudinaryImage({ src, alt, ...props }: CloudinaryImageProps) {
  const resolvedSrc = resolveMediaUrl(src);

  return <Image src={resolvedSrc} alt={alt} {...props} />;
}
