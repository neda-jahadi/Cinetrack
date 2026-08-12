import { Link } from 'react-router-dom';
import siteLogo from '@/assets/images/siteLogo.svg';
import Container from './Container';
import { navItems } from '../../config/nav.config';
import { useAuth } from '../../context/useAuth';
import NavBar from '../navigation/NavigationBar';

const Header = () => {
  const { isAuthenticated, user } = useAuth();

  const items = navItems.filter((item) => {
    if (item.onlyGuest && isAuthenticated) {
      return false;
    }

    if (item.requiresAuth && !isAuthenticated) {
      return false;
    }

    if (item.roles && user?.role && !item.roles.includes(user?.role)) {
      return false;
    }

    if (user?.role && item.hideForRoles?.includes(user?.role)) {
      return false;
    }
    return true;
  });

  return (
    <header className="bg-primary">
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
