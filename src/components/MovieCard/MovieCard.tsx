import { Link } from "react-router-dom";
import "./MovieCard.scss";

interface MovieCardProps {
  movieId: number;
  title: string;
  image: string;
}

export const MovieCard = ({ movieId, title, image }: MovieCardProps) => {
  return (
    <Link to={`/movie/${movieId}`} className="movie-card">
      <div className="movie-card-image">
        <img src={image} alt={title} />
      </div>
      <h4 className="movie-card-title">{title}</h4>
    </Link>
  );
};
