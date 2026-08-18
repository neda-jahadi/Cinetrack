import { Link } from 'react-router-dom';
import LoginForm from '../../features/auth/forms/LoginForm';
import Container from '@/components/layouts/Container';
import Section from '@/components/layouts/Section';
import Card from '@/components/ui/Card';

const LoginPage = () => {
  return (
    <Section>
      <Container size="narrow">
        <Card>
          <h2 className="text-3xl text-center font-semibold mb-6">Log in</h2>
          <LoginForm onSuccessRedirect="/profile" />
          <p className="mt-6 text-center">
            <span>No account ?</span>
            <Link to="/signup" className="hover:underline ml-2 text-brand">
              Sign up
            </Link>
          </p>
        </Card>
      </Container>
    </Section>
  );
};

export default LoginPage;
