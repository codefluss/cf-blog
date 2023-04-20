import { getCategoryPosts } from '@/services/graph-cms';
import { Post } from '@/shared/interfaces/post';
import PostCard from '@/components/post/post-card';
import CategoriesWidget from '@/components/widgets/categories-widget';

export default async function Page({params}: {params: { slug: string}}) {
  const posts = (await getCategoryPosts(params.slug) || []);
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post: { node: Post}, index: number) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            {/* @ts-expect-error Server Component */}
            <CategoriesWidget />
          </div>
        </div>
      </div>
    </div>
  );
};