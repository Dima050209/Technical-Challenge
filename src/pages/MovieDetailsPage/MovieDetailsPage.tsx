import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById, getMovieImages } from "../../api/movies";
import { Movie } from "../../types/movie";
import { format, parseISO } from "date-fns";

import "./MovieDetailsPage.scss";
import { Container } from "../../components/Container";

export const MovieDetailsPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieData = async () => {
      try {
        const movieData = await getMovieById(Number(movieId));
        setMovie(movieData);

        const imageData = await getMovieImages(Number(movieId));
        const topImages = (imageData.backdrops || [])
          .slice(0, 3)
          .map((img: any) => `https://image.tmdb.org/t/p/w500${img.file_path}`);
        setImages(topImages);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovieData();
  }, [movieId]);

  if (!movie) {
    return (
      <>
        <Header />
        <main className="movie-details">
          <p>Loading...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="movie-details">
        <Container>
          <div className="movie-layout">
            <div className="poster-grid">
              <img
                className="main-poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title + " main poster"}
              />
              <img
                className="sub-poster"
                src={images[0]}
                alt={movie.title + " image 1"}
              />
              <img
                className="sub-two-poster"
                src={images[1]}
                alt={movie.title + " image 2"}
              />
              <img
                className="sub-two-poster"
                src={images[2]}
                alt={movie.title + " image 3"}
              />
            </div>

            <aside className="details-widget">
              <button className="favourite-btn">❤️ Save to favourites</button>
              <p className="overview">{movie.overview}</p>
            </aside>
          </div>

          <section className="extra-info">
            <h2>{movie?.title}</h2>
            <p>
              Release date:{" "}
              <strong>
                {movie.release_date
                  ? format(parseISO(String(movie.release_date)), "MMMM d, yyyy")
                  : "N/A"}
              </strong>
            </p>
            <p>
              Rating: <strong>{movie.vote_average}/10</strong> (
              {movie.vote_count} votes)
            </p>
            <p>Language: {movie.original_language.toUpperCase()}</p>
          </section>
        </Container>
      </main>
    </>
  );
};
