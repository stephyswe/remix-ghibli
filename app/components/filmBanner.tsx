import { Link } from 'remix';
import { Film } from '~/api/films';

type FilmBannerProps = {
  film: Film;
};

export default function FilmBanner({ film }: FilmBannerProps) {
  return (
    <div>
      <div className="relative w-full overflow-hidden">
        <div className="absolute flex flex-col items-start justify-between w-full h-full">
          <Link to="/films" className="p-5 text-2xl text-white hover:underline">
            Go Back
          </Link>
          <div className="p-5 bg-slate-700/60 ">
            <div className="text-6xl font-bold text-white">{film.title}</div>
          </div>
        </div>
        <img
          src={film.movie_banner}
          className="w-full h-auto"
          style={{ marginTop: -100 }}
        />
      </div>
    </div>
  );
}
