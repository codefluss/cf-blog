import Link from 'next/link';
import { Category } from '@/interfaces/category';

const categories: Category[] = [
  { name: 'Unreal Engine', slug: 'ue'},
  { name: 'Web Development', slug: 'web-dev'},
];

export default function Header() {
  return(
    <div className="container mx-auto px-10 mb-8">
      <div className="borderb w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-blue-400">
              Codefluss Blog
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category, id) => (
            <Link key={category.slug} 
                  href={`${category.slug}`}>
              <span className="md:float-right mt-2 align-middle text-blue-200 ml-4 font-semibold cursor-pointer">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}