import { LoaderFunction, MetaFunction, Outlet, useLoaderData } from 'remix';
import CharacterList from '~/components/characterList';
import FilmBanner from '~/components/filmBanner';
import { Film, getFilmById } from '../api/films';

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data.title,
    description: data.description
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const film = await getFilmById(params.filmId);

  return film;
};

export default function Film() {
  const film = useLoaderData<Film>();

  return (
    <div>
      <FilmBanner film={film} />
      <div className="p-10">
        <p>{film.description}</p>
        <div className="flex py-5 space-x-5">
          <CharacterList characters={film.characters} />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
