import { Form } from 'remix';
import { CommentEntry } from '~/api/comments';

type CommentListProps = {
  filmId: string;
  comments: CommentEntry[];
};

export default function CommentList({ comments }: CommentListProps) {
  const inputStyle = 'inline-block w-full px-3 py-2 border rounded border-slate-400';
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

        <div className="p-4 border rounded border-slate-400">
          <Form method="post">
            <fieldset>
              <label className="inline-block my-2">Name:</label>
              <input type="text" name="name" className={inputStyle} />

              <label className="inline-block my-2">Message:</label>
              <input type="text" name="message" className={inputStyle} />

              <button
                type="submit"
                className="px-4 py-2 my-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              >
                Add comment
              </button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
}
