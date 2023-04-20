'use client';

import React, { BaseSyntheticEvent, ChangeEvent, MouseEventHandler, useState } from 'react';
import { CommentDto } from '@/shared/dtos/comment.dto';
import { submitComment } from '@/services/graph-cms';

interface Props {
  slug: string
}

export default function PostCommentsForm({slug}: Props) {
  const [error, setError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    comment: '',
    name: '',
    email: '',
    slug
  });

  const onInputChange = (event: BaseSyntheticEvent) => {
    const { target } = event;
    setFormData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handlePostSubmission = (event: BaseSyntheticEvent) => {
    setError(false);
    
    const { name, email, comment } = formData;
    
    if (!name || !email || !comment) {
      setError(true);
      return;
    }
    
    const commentObj: CommentDto = {
      name,
      email,
      comment,
      slug,
    };
    
    submitComment(commentObj)
      .then((res: any) => {
        if (res.createComment) {
          formData.comment = '';
          formData.email = '';
          formData.name = '';
          
          setFormData((prevState) => ({
            ...prevState,
            ...formData,
          }));
          
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
        }
      });
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea value={formData.comment} onChange={onInputChange} className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" name="comment" placeholder="Comment" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input type="text" 
               value={formData.name} 
               onChange={onInputChange} 
               className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" 
               placeholder="Name" 
               name="name"
        />
        <input type="email" 
               value={formData.email} 
               onChange={onInputChange} 
               className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" 
               placeholder="Email" 
               name="email" 
        />
      </div>
      {error && <p className="text-xs text-red-500">All fields are mandatory</p>}
      <div className="mt-8">
        <button type="button" 
                onClick={handlePostSubmission} 
                className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg 
                font-medium rounded-full text-white px-8 py-3 cursor-pointer">
          Post Comment
        </button>
        {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for review</span>}
      </div>
    </div>
  )
}