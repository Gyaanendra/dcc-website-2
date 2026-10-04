export interface GalleryImage {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  aspectRatio: string;
  src: string;
  alt: string;
  caption: string;
  cameraMeta?: string;
  featured: boolean;
}
