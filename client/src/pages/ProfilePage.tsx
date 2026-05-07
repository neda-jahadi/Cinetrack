import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import Spinner from "../components/ui/Spinner";
import { useAuth } from "../context/AuthContext";
import { useLogout } from "../features/auth/authQueries";

const ProfilePage = () => {
  const { user, isLoading } = useAuth();

  const navigate = useNavigate();

  const logoutMutation = useLogout();
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate("/login");
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
      <Container>
        <Button onClick={() => handleLogout()}>Logout</Button>
      </Container>
    </section>
  );
};

export default ProfilePage;
