import { Link } from 'remix';
import { FilmCharacter } from '~/routes/api/films';

type CharacterListProps = {
  characters?: FilmCharacter[];
};

export default function CharacterList({ characters }: CharacterListProps) {
  return (
    <div className="flex-1 max-w-md">
      <h3 className="text-3xl">Characters</h3>

      <ul className="flex flex-col my-3 space-y-3">
        {characters?.map((character) => (
          <li key={character.id}>
            <Link
              to={`characters/${character.id}`}
              className="inline-block w-full p-3 border rounded hover:underline border-slate-400"
            >
              {character.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
