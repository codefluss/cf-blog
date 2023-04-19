import { Post } from '@/interfaces/post';

export default function PostCard({ post }: { post: Post}) {
  return (
    <div>
      { post.title }
      { post.excerpt}
    </div>
  )
}
