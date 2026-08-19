import { useNavigate } from 'react-router-dom';
import Container from '../components/layouts/Container';
import Spinner from '../components/ui/Spinner';
import { useLogout } from '@/features/auth/api/authQueries';
import ButtonLink from '@/components/ui/ButtonLink';
import { Button } from '@/components/ui/button/button';
import { useAuth } from '../context/useAuth';
import Section from '@/components/layouts/Section';
import Card from '@/components/ui/Card';

const ProfilePage = () => {
  const { user, isLoading, isAdmin, company } = useAuth();

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
    <div>
      <Section>
        <Container className="flex flex-col gap-2">
          <h1 className="page-title">{user?.name}</h1>
          <p>{user?.role}</p>
          <p>{user?.email}</p>
          <p>Member since: 2020-02-10</p>
        </Container>
      </Section>
      <Section>
        <Container>
          <div>
            {isAdmin && (
              <div>
                <p>Manage companies awaiting approval and platform content.</p>
                <ButtonLink to="/admin-dashboard">
                  Open Admin Dashboard
                </ButtonLink>
              </div>
            )}
            {company && (
              <div className="flex flex-col gap-4">
                <Card>
                  <div>
                    <h2 className="card-title">About</h2>
                    <p>{company.status}</p>
                    <p>{company.description}</p>
                  </div>
                  <div>
                    <h2 className="card-title">Contact</h2>
                    <p>{company.contactEmail}</p>
                    <p>{company.contactPhone}</p>
                  </div>
                  <div>
                    <h2 className="card-title">Location</h2>
                    <p>
                      {company.region} - {company.municipality}
                    </p>
                  </div>
                </Card>
                <div>
                  <h2 className="section-title text-center">Your Jobs</h2>
                  <div>
                    <p>Here shows jobs for related company</p>
                  </div>
                </div>
              </div>
            )}
            {!company && (
              <div>
                <h2>Looking for next oppurtunity?</h2>
                <ButtonLink to="/jobs">Browse Jobs</ButtonLink>
              </div>
            )}
          </div>
          <div className="mt-10 border-t border-primary-light pt-6">
            <Button onClick={() => handleLogout()}>Logout</Button>
          </div>
          <div></div>
        </Container>
      </Section>
    </div>
  );
};

export default ProfilePage;
