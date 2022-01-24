import { Form, LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import { Film, getFilms } from '../api/films';

// server
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get('title');
  return getFilms(title);
};

// client
export default function FilmsIndex() {
  const films = useLoaderData<Film[]>();

  return (
    <div className="p-16 font-sans">
      <h1 className="text-center text-5xl font-bold">Studio Ghibli Films</h1>

      <Form reloadDocument className="py-5">
        <label className="font-bold">
          Search
          <input
            type="text"
            name="title"
            placeholder="Type a title..."
            className="px-3 py-2 border-2 rounded"
          />
        </label>
        <button
          type="submit"
          className="mx-2 px-4 py-2 text-white font-bold bg-blue-500 hover:bg-blue-700 rounded"
        >
          Search
        </button>
      </Form>
      <div className="grid gap-4 grid-cols-4">
        {films.map((film) => (
          <div
            key={film.title}
            className="hover:font-bold hover:shadow-2xl cursor-pointer hover:scale-105"
          >
            <div>{film.title}</div>
            <img src={film.image} alt={film.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export const meta: MetaFunction = () => {
  return { title: 'Films | Studio Ghibli', description: 'List of films' };
};
