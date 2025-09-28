import "./HomePage.scss";
import { Carousel } from "../../components/Carousel";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { getMoviesByGenre } from "../../api/movies";
import { useEffect, useState } from "react";
import { Movie } from "../../types/movie";
import { MovieCard } from "../../components/MovieCard";

export default function HomePage() {
  const [moviesByGenre, setMoviesByGenre] = useState<Record<string, Movie[]>>(
    {}
  );

  useEffect(() => {
    async function fetchMovies() {
      const comedy = (await getMoviesByGenre("35")).results;
      const action = (await getMoviesByGenre("28")).results;
      const drama = (await getMoviesByGenre("18")).results;

      setMoviesByGenre({
        comedy,
        action,
        drama,
      });
    }

    fetchMovies();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <Container className="home-page__container">
          {Object.entries(moviesByGenre).map((category) => (
            <Carousel key={category[0]}>
              {category[1].map((movie) => (
                <MovieCard
                  key={movie.id}
                  movieId={movie.id}
                  title={movie.title}
                  image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                />
              ))}
            </Carousel>
          ))}
        </Container>
      </main>
    </div>
  );
}
