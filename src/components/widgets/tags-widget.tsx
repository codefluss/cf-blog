import { getTags } from '@/services/graph-cms';
import { Tag } from '@/shared/interfaces/tag';
import Link from 'next/link';


export default async function TagsWidget() {
  const tags = (await getTags() || []);

  return (
    <div className="bg-blue-200 shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Tags
      </h3>
      {tags.map((category: Tag) => (
        <Link key={category.slug} href={`/tags/${category.slug}`}>
          <span className="cursor-pointer block pb-3 mb-3">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  )
}
