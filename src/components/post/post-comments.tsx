import { getComments } from '@/services/graph-cms';
import { Comment } from '@/shared/interfaces/comment';
import parse from 'html-react-parser';
import moment from 'moment';

export default async function PostComments({slug}: { slug: string }) {
  const comments = (await getComments(slug)) || [];
  return (
    <>
      {comments.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments.length}
            {' '}
            Comments
          </h3>
          {comments.map((comment: Comment, index: number) => (
            <div key={index} className="border-b border-gray-100 mb-4 pb-4">
              <p className="mb-4">
                <span className="font-semibold">{comment.name}</span>
                {' '}
                on
                {' '}
                {moment(comment.createdAt).format('MMM DD, YYYY')}
              </p>
              <p className="whitespace-pre-line text-gray-600 w-full">{parse(comment.comment)}</p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}