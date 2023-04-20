import { Image } from '@/shared/interfaces/image';

export interface Author{
  id: string;
  name: string;
  bio: string;
  photo: Image
}