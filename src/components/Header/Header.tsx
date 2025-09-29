import "./Header.scss";
import dk_logo from "../../assets/dk_logo.png";
import { Link } from "react-router-dom";
import { Container } from "../Container";

export const Header = () => {
  return (
    <header role="banner">
      <Container>
        <div className="header-container">
          <Link to="/" aria-label="Go to homepage">
            <img
              className="logo-img"
              src={dk_logo}
              alt="DK Logo"
              width={60}
              height={60}
            />
          </Link>

          <h1 className="creator-label">
            Technical Challenge by{" "}
            <Link
              className="creator-link"
              to="https://www.linkedin.com/in/dmytro-kharchenko-frontend/"
            >
              Dmytro Kharchenko
            </Link>
          </h1>

          <nav aria-label="Main navigation">
            <ul className="nav-list">
              <li>
                <Link className="home-link" to="/">
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
};
