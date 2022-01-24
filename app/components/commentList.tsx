import { CommentEntry } from '~/api/comments';

type CommentListProps = {
  filmId: string;
  comments: CommentEntry[];
};

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div>
      <h2 className="mb-2 text-3xl">Community Comments</h2>

      <div className="flex flex-col my-3 space-y-4">
        {comments.map(({ id, name, message }) => (
          <div key={id} className="p-4 border rounded border-slate-400">
            <div className="mb-2 text-xl font-bold text-gray-700">{name}</div>
            <p className="text-gray-700">{message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
