import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import NavBar from "../NavBar/NavBar";
import Container from "../../ui/Container";

const Header = () => {
  const items = [
    { label: "Home", to: "/" },
    { label: "Jobs", to: "/jobs" },
    { label: "Add Job", to: "/add-job" },
  ];
  return (
    <header className="bg-brand border-b border-brand-500">
      <Container className="flex h-20 items-center justify-between">
        <Link className="flex items-center mr-4" to="/">
          <img className="h-10 w-auto" src={logo} alt="React Jobs" />
          <span className="hidden md:block text-white text-2xl font-bold ml-2">
            React Jobs
          </span>
        </Link>
        <nav aria-label="Primary">
          <NavBar items={items} />
        </nav>
      </Container>
    </header>
  );
};

export default Header;
