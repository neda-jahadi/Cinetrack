import { Link } from "react-router-dom";
import siteLogo from "../../../assets/images/siteLogo.svg";
import NavBar from "../NavBar/NavBar";
import Container from "../../ui/Container";

const Header = () => {
  const items = [
    { label: "Home", to: "/" },
    { label: "Manage Bookings", to: "/manage-bookings" },
    { label: "Careers", to: "/jobs" },
    { label: "Add Job", to: "/add-job" },
  ];
  return (
    <header className="bg-brand border-b border-brand-500">
      <Container className="flex h-20 items-center justify-between">
        <Link className="flex items-center mr-4" to="/">
          <img className="h-10 w-auto" src={siteLogo} alt="Sky Flow" />
        </Link>
        <nav aria-label="Primary">
          <NavBar items={items} />
        </nav>
      </Container>
    </header>
  );
};

export default Header;
