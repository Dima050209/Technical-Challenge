import "./CarouselCard.scss";

interface CarouselCardProps {
  title: string;
  image: string;
}

export const CarouselCard = ({ title, image }: CarouselCardProps) => {
  return (
    <div className="carousel-card">
      <div className="carousel-card-image">
        <img src={image} alt={title} />
      </div>
      <h4 className="carousel-card-title">{title}</h4>
    </div>
  );
};
