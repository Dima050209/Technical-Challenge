import { Route, Routes } from "react-router-dom";
import "./app.scss";
import HomePage from "./pages/HomePage/HomePage";
import { MovieDetailsPage } from "./pages/MovieDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
    </Routes>
  );
}

export default App;
