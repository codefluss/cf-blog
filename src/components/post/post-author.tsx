import Image from 'next/image';
import { Author } from '@/shared/interfaces/author';

export default function PostAuthor({author}:{author: Author}) {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative shadow-2xl rounded-lg bg-black bg-opacity-20">
      <div className="absolute flex justify-center -top-14 left-0 right-0">
        <Image className="align-middle rounded-full" width="100" height="100" unoptimized
               src={author.photo.url}
               alt={author.name} />
      </div>
      <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author.name}</h3>
      <p className="text-white text-ls">{author.bio}</p>
    </div>
  )
}