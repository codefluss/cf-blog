import { Image } from '@/interfaces/image';
import { Category } from '@/interfaces/category';
import { Tag } from '@/interfaces/tag';
import { Author } from '@/interfaces/author';
import { Content } from '@/interfaces/content';

export interface PostDetail {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  content: Content;
  featuredImage: Image;
  categories: Category[];
  tags: Tag[];
  author: Author,
  createdAt: string;
}