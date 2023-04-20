import { Content } from '@/shared/interfaces/content';
import { Image } from '@/shared/interfaces/image';
import { Category } from '@/shared/interfaces/category';
import { Tag } from '@/shared/interfaces/tag';
import { Author } from '@/shared/interfaces/author';


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