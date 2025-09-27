import "./Carousel.scss";
import { useEffect, useState } from "react";
import { getMoviesByGenre } from "../../api/movies";
import { Movie } from "../../types/movie";
import { CarouselCard } from "../CarouselCard";

interface CarouselProps {
  visibleCount?: number; // how many items to show at once
}

export const Carousel = ({ visibleCount = 7 }: CarouselProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [offset, setOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const itemWidth = 200;
  const maxOffset = Math.max(0, movies.length - visibleCount);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMoviesByGenre(12);
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handlePrev = () => {
    setOffset((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setOffset((prev) => Math.min(prev + 1, maxOffset));
  };

  // Mobile gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;

    if (deltaX > 50) {
      // swipe left -> next
      handleNext();
    } else if (deltaX < -50) {
      // swipe right -> prev
      handlePrev();
    }

    setTouchStartX(null);
  };

  return (
    <div
      className="carousel"
      style={{
        width: `${visibleCount * itemWidth}px`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-window">
        <div
          className="carousel-track"
          style={{
            display: "flex",
            transform: `translateX(-${offset * itemWidth}px)`,
            transition: "transform 0.3s ease",
          }}
        >
          {movies.map((movie) => (
            <CarouselCard key={movie.id} title={movie.title} image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}/>
          ))}
        </div>
      </div>

      <button
        className="carousel-button prev"
        onClick={handlePrev}
        disabled={offset === 0}
        style={{
          display: isHovered ? "" : "none",
        }}
        aria-label="Previous movies"
      >
        ◀
      </button>

      <button
        className="carousel-button next"
        onClick={handleNext}
        disabled={offset === maxOffset}
        style={{
          display: isHovered ? "" : "none",
        }}
        aria-label="Next movies"
      >
        ▶
      </button>
    </div>
  );
};
