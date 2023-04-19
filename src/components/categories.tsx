'use client';

import { useEffect, useState } from 'react';
import { getCategories } from '@/services/graph-cms';
import { Category } from '@/interfaces/category';
import Link from 'next/link';


export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then(result => setCategories(result));
  }, []);
  
  return (
    <div className="bg-blue-200 shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Categories
      </h3>
      {categories.map((category: Category) => (
        <Link key={category.slug} href={`/category/${category.slug}`}>
          <span className="cursor-pointer block pb-3 mb-3">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  )
}
