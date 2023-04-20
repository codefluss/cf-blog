'use client';

import { useEffect, useState } from 'react';
import { getRecentPosts, getSimilarPosts } from '@/services/graph-cms';
import { Category } from '@/shared/interfaces/category';
import { Post } from '@/shared/interfaces/post';
import moment from 'moment';
import Link from 'next/link';


export default function PostWidget({ categories, slug }: { categories?: Category[], slug?: string }) {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories || [], slug)
        .then(result => setRelatedPosts(result)); 
    } else {
      getRecentPosts()
        .then(result => setRelatedPosts(result));
    }
  }, [slug]);

  return (
    <div className="bg-blue-200 shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
      {relatedPosts.map((post: Post) => (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img className="align-middle rounded-2xl object-cover w-[60px] h-[60px]" 
                 src={post.featuredImage.url} 
                 alt={post.title} />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
            <Link className="text-md" href={`/post/${slug}`}>{post.title}</Link>
          </div>
        </div>
      ))}
    </div>
  )
}
