import { useNavigate } from 'react-router-dom';
import Container from '../components/layouts/Container';
import Spinner from '../components/ui/Spinner';
import { useLogout } from '@/features/auth/api/authQueries';
import ButtonLink from '@/components/ui/ButtonLink';
import { Button } from '@/components/ui/button/button';
import { useAuth } from '../context/useAuth';

const ProfilePage = () => {
  const { user, isLoading, isAdmin } = useAuth();

  const navigate = useNavigate();

  const logoutMutation = useLogout();
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate('/login');
      },
    });
  };

  if (isLoading) return <Spinner loading={isLoading} />;

  return (
    <section className="py-12">
      <Container>
        <h1 className="hero-title">Welcome {user?.name}</h1>
        <p>You have a {user?.role} role</p>
      </Container>
      <Container className="flex gap-3">
        {isAdmin && (
          <ButtonLink to="/admin-dashboard" variant="dark">
            Dashboard
          </ButtonLink>
        )}
        <Button onClick={() => handleLogout()}>Logout</Button>
      </Container>
    </section>
  );
};

export default ProfilePage;
