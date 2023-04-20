import { getPostDetail } from '@/services/graph-cms';

import PostWidget from '@/components/widgets/post-widget';
import CategoriesWidget from '@/components/widgets/categories-widget';
import PostCommentsForm from '@/components/post/post-comments-form';
import PostDetail from '@/components/post/post-detail';
import PostAuthor from '@/components/post/post-author';
import PostComments from '@/components/post/post-comments';

export default async function Page({params}: {params: { slug: string}}) {
  const postDetail = await getPostDetail(params.slug);
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail postDetail={postDetail} />
          <PostAuthor author={postDetail.author} />
          <PostCommentsForm slug={postDetail.slug}/>
          {/* @ts-expect-error Server Component */}
          <PostComments slug={postDetail.slug}/>
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-28">
            <PostWidget />
            {/*<PostWidget slug={postDetail.slug} categories={postDetail.categories}/>*/}
            {/* @ts-expect-error Server Component */}
            <CategoriesWidget />
          </div>
        </div>
      </div>
    </div>
  )
}