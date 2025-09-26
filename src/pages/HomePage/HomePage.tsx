import "./HomePage.scss";
import { Carousel } from "../../components/Carousel";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";

export default function HomePage() {
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
