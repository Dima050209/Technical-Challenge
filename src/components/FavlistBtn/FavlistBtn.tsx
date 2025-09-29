import { useState } from "react";
import {
  addToFavlist,
  isInFavlist,
  removeFromFavlist,
} from "../../utils/favlist-storage";
import "./FavlistBtn.scss";

interface FavlistBtnProps {
  style?: React.CSSProperties;
  movieId: number;
}

export const FavlistBtn = ({ style, movieId }: FavlistBtnProps) => {
  const [isSaved, setIsSaved] = useState(isInFavlist(movieId));
  const handleClick = () => {
    isSaved ? removeFromFavlist(movieId) : addToFavlist(movieId);

    setIsSaved(isInFavlist(movieId));
  };
  return (
    <button className="favourite-btn" style={style} onClick={handleClick}>
      {isSaved ? "❤️" : "🖤"} Add to favourites
    </button>
  );
};
