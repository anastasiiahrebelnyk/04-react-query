import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  // const onSelect = element => {};
  // console.log(movies);
  return (
    <ul className={css.grid}>
      {/* Набір елементів списку з фільмами */}
      {movies.map(movie => (
        <li key={movie.id}>
          <div className={css.card} onClick={() => onSelect(movie)}>
            <img
              // onSelect={onSelect}
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
