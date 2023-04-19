import { Image } from '@/interfaces/image';
import { Tag } from '@/interfaces/tag';
import { Category } from '@/interfaces/category';
import { Author } from '@/interfaces/author';

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  featuredImage: Image;
  categories: Category[];
  tags: Tag[];
  author: Author,
  createdAt: string;
}