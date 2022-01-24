import { Form, Link, LoaderFunction, MetaFunction, useLoaderData } from 'remix';
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
      <h1 className="text-5xl font-bold text-center">Studio Ghibli Films</h1>

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
          className="px-4 py-2 mx-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </Form>
      <div className="grid grid-cols-4 gap-4">
        {films.map((film) => (
          <Link
            key={film.id}
            title={film.title}
            to={film.id}
            className="cursor-pointer hover:font-bold hover:shadow-2xl hover:scale-105"
            prefetch="intent"
          >
            <div>{film.title}</div>
            <img src={film.image} alt={film.title} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export const meta: MetaFunction = () => {
  return { title: 'Films | Studio Ghibli', description: 'List of films' };
};
