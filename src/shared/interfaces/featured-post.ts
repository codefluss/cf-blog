import { Image } from '@/shared/interfaces/image';
import { Author } from '@/shared/interfaces/author';

export interface FeaturedPost {
  title: string;
  slug: string;
  featuredImage: Image;
  author: Author,
  createdAt: string;
}