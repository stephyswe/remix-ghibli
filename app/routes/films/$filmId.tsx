import { LoaderFunction, useLoaderData } from 'remix';
import CharacterList from '~/components/characterList';
import FilmBanner from '~/components/filmBanner';
import { Film, getFilmById } from '../api/films';

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
        </div>
      </div>
    </div>
  );
}
