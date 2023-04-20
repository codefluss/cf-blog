import { getPosts } from '@/services/graph-cms';
import { Post } from '@/shared/interfaces/post';
import PostWidget from '@/components/widgets/post-widget';
import CategoriesWidget from '@/components/widgets/categories-widget';
import PostCard from '@/components/post/post-card';
import FeaturedPosts from '@/components/featured-post/featured-posts';


export default async function Home() {
  const posts = (await getPosts() || []);
  return (
    <div className="container mx-auto px-10 mb-8">
      {/* @ts-expect-error Server Component */}
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post: { node: Post}) => (
            <PostCard key={post.node.id} post={post.node}/>
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-28">
            <PostWidget />
            {/* @ts-expect-error Server Component */}
            <CategoriesWidget />
          </div>
        </div>
      </div>
    </div>
  )
}
