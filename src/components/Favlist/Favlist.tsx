import "./Favlist.scss";
import { useEffect, useState, useMemo } from "react";
import { Movie } from "../../utils/types/movie";
import { getFavlist } from "../../utils/favlist-storage";
import { getMovieById } from "../../utils/api/movies";
import { MovieCard } from "../MovieCard";
import { Carousel } from "../Carousel";
import { useResponsiveVisibleCount } from "../../utils/hooks";

export default function Favlist() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const visibleCount = useResponsiveVisibleCount();
  
  useEffect(() => {
    const fetchWishlistMovies = async () => {
      const favIds = getFavlist();
      try {
        const results = await Promise.all(favIds.map((id) => getMovieById(id)));
        setMovies(results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWishlistMovies();
  }, []);

  const carouselItems = useMemo(
    () =>
      movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movieId={movie.id}
          title={movie.title}
          image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        />
      )),
    [movies]
  );

  if (!movies.length) {
    return <div>Favlist is empty.</div>;
  }

  return (
    <div className="favlist-carousel">
      <h2 className="favlist-heading">My favourites</h2>
      <Carousel visibleCount={visibleCount}>{carouselItems}</Carousel>
    </div>
  );
}
