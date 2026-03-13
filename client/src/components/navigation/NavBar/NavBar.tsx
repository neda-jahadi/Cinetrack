import { NavLink } from "react-router-dom";
import { cn } from "../../../lib/cn";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../ui/Button";

type NavItem = {
  label: string;
  to: string;
};

const NavBar = ({ items }: { items: NavItem[] }) => {
  const { isLoggedIn, logout, login } = useAuth();

  return (
    <ul className="flex items-center gap-2">
      {items.map((navItem) => (
        <li key={navItem.label}>
          <NavLink
            to={navItem.to}
            className={({ isActive }) =>
              cn(
                "rounded-md px-3 py-2 text-sm font-medium transition",
                "text-white hover:bg-gray-900",
                isActive && "bg-black",
              )
            }
          >
            {navItem.label}
          </NavLink>
        </li>
      ))}

      <li>
        <Button onClick={isLoggedIn ? logout : login}>
          {isLoggedIn ? "Logout" : "Login"}
        </Button>
      </li>
    </ul>
  );
};

export default NavBar;
