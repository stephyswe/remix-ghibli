import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  Outlet,
  redirect,
  useLoaderData
} from 'remix';
import CharacterList from '~/components/characterList';
import FilmBanner from '~/components/filmBanner';
import { Film, getFilmById } from '~/api/films';
import CommentList from '~/components/commentList';
import { addComments } from '~/api/comments';

export const action: ActionFunction = async ({ request, params }) => {
  const body = await request.formData();

  const comment = {
    name: body.get('name') as string,
    message: body.get('message') as string,
    filmId: params.filmId as string
  };

  const errors = { name: '', message: '' };

  if (!comment.name) {
    errors.name = 'Please provide your name';
  }

  if (!comment.message) {
    errors.message = 'Please provide a comment';
  }

  if (errors.message || errors.name) {
    const values = Object.fromEntries(body);
    return { errors, values };
  }

  await addComments(comment);

  return redirect(`/films/${params.filmId}`);
};

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

          <div className="flex flex-col justify-between flex-1">
            <Outlet />
            <CommentList filmId={film.id} comments={film.comments ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
}
