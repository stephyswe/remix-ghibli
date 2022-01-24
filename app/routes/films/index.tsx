import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import { Film, getFilms } from '../api/films';

// server
export const loader: LoaderFunction = async () => {
  return getFilms();
};

// client
export default function FilmsIndex() {
  const films = useLoaderData<Film[]>();

  return (
    <div className="p-16 font-sans">
      <h1 className="text-center text-5xl font-bold">Studio Ghibli Films</h1>
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
