import "./Carousel.scss";
import { Children, memo, ReactNode, useState } from "react";

interface CarouselProps {
  visibleCount?: number; // how many items to show at once
  itemWidth?: number;
  itemsGap?: number;
  itemWidthUnits?: "px" | "rem";
  children: ReactNode;
}

const CarouselComponent = ({ visibleCount = 7, itemWidth=200, itemsGap=10, itemWidthUnits = "px", children }: CarouselProps) => {
  const [offset, setOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const totalItems = Children.count(children);
  const maxOffset = Math.max(0, totalItems - visibleCount);


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
        width: `${visibleCount * (itemWidth + itemsGap) - itemsGap}${itemWidthUnits}`,
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
            gap: `${itemsGap}${itemWidthUnits}`,
            transform: `translateX(-${offset * (itemWidth + itemsGap)}${itemWidthUnits})`,
            transition: "transform 0.3s ease",
          }}
        >
          {children}
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

export const Carousel = memo(CarouselComponent);