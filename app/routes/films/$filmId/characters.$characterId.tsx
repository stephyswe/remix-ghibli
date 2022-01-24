import { LoaderFunction, useCatch, useLoaderData } from 'remix';
import { FilmCharacter, getFilmCharacter } from '~/routes/api/films';

export const loader: LoaderFunction = async ({ params }) => {
  // throw new Response('Different message', { status: 403 });
  return getFilmCharacter(params.characterId);
};

export default function Character() {
  const characterDetails = useLoaderData<FilmCharacter>();
  const { gender, age, eye_color, hair_color } = characterDetails;
  return (
    <div className="mb-3">
      <div className="mb-2 text-3xl">Character Details</div>
      <div className="p-4 border rounded shadow-lg">
        <div className="mb-2 text-xl font-bold text-gray-700">
          {characterDetails.name}
        </div>
        <ul className="py-2">
          <li> Gender: {gender} </li>
          <li> Age: {age} </li>
          <li> Eye Color: {eye_color} </li>
          <li> Hair Color: {hair_color} </li>
        </ul>
      </div>
    </div>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  const caught = useCatch();
  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>
      );
      break;
    case 404:
      message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>;
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }
  return (
    <div className="mb-3">
      <div className="mb-2 text-3xl">Details</div>
      <div className="p-4 bg-orange-200 border border-orange-600 rounded shadow-lg">
        <div className="mb-2 text-xl font-bold text-gray-700">
          {caught.status} {caught.statusText}
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="mb-3">
      <div className="mb-2 text-3xl">Details</div>
      <div className="p-4 border rounded shadow-lg bg-rose-200 border-rose-600">
        <div className="mb-2 text-xl font-bold text-gray-700">
          Uh uh... Sorry something went wrong!
        </div>
        <p>{error.message}</p>
      </div>
    </div>
  );
}
