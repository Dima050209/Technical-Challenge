import "./HomePage.scss";
import { Carousel } from "../../components/Carousel";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { getMoviesByGenre } from "../../api/movies";
import { useEffect } from "react";

export default function HomePage() {
  // useEffect(() => {
  //   const fet = () => {
  //     getMoviesByGenre(12);
  //   }
  //   fet()
  // }, [])
  return (
    <div>
      <Header />
      <main>
        <Container className="home-page__container">
          <Carousel />
        </Container>
      </main>
    </div>
  );
}
