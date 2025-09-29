import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieById, getMovieImages } from "../../api/movies";
import { MovieDetails } from "../../types/movie";
import { format, parseISO } from "date-fns";

import "./MovieDetailsPage.scss";
import { Container } from "../../components/Container";
import { FavlistBtn } from "../../components/FavlistBtn";

const genreStyles: Record<string, { color: string; fontFamily: string }> = {
  Action: {
    color: "#43ced8ff",
    fontFamily: "Impact, sans-serif",
  },
  Comedy: {
    color: "#ff9800",
    fontFamily: "'Comic Neue', cursive, sans-serif",
  },
  Drama: {
    color: "#6a1b9a",
    fontFamily: "'Merriweather', serif",
  },
};

export const MovieDetailsPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieData = async () => {
      try {
        const movieData: MovieDetails = await getMovieById(Number(movieId));
        setMovie(movieData);

        const imageData = await getMovieImages(Number(movieId));
        const topImages = (imageData.backdrops || [])
          .slice(0, 3)
          .map(
            (img: { file_path: string }) =>
              `https://image.tmdb.org/t/p/w500${img.file_path}`
          );
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

  const matchedGenre = movie.genres.find((g) => genreStyles[g.name]);
  const appliedStyle = matchedGenre
    ? genreStyles[matchedGenre.name]
    : undefined;

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
                alt={`${movie.title} main poster`}
              />
              {images[0] && (
                <img
                  className="sub-poster"
                  src={images[0]}
                  alt={`${movie.title} image 1`}
                />
              )}
              {images[1] && (
                <img
                  className="sub-two-poster"
                  src={images[1]}
                  alt={`${movie.title} image 2`}
                />
              )}
              {images[2] && (
                <img
                  className="sub-two-poster"
                  src={images[2]}
                  alt={`${movie.title} image 3`}
                />
              )}
            </div>

            <aside className="details-widget">
              <FavlistBtn
              movieId={movie.id}
                style={{
                  border: `2px solid ${appliedStyle?.color}`,
                  fontFamily: appliedStyle?.fontFamily || "inherit",
                }}
              />

              <p
                className="overview"
                style={{
                  fontFamily: appliedStyle?.fontFamily || "inherit",
                }}
              >
                {movie.overview}
              </p>
            </aside>
          </div>

          <section
            className="extra-info"
            style={{ borderTop: `2px solid ${appliedStyle?.color}` || "#fff" }}
          >
            <h2>{movie.title}</h2>
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
            <p>Genres: {movie.genres.map((g) => g.name).join(", ")}</p>
            <p>Status: {movie.status}</p>
            <p>Runtime: {movie.runtime} minutes</p>
          </section>
        </Container>
      </main>
    </>
  );
};
