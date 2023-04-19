import PostWidget from '@/components/widgets/post-widget';
import CategoriesWidget from '@/components/widgets/categories-widget';
import PostDetail from '@/components/post/post-detail';
import Author from '@/components/post/author';
import CommentsForm from '@/components/post/comments-form';
import Comments from '@/components/post/comments';

export default async function Page() {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail />
          <Author />
          <CommentsForm />
          <Comments />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-28">
            <PostWidget />
            {/* @ts-expect-error Server Component */}
            <CategoriesWidget />
          </div>
        </div>
      </div>
    </div>
  )
}