import { Link } from 'react-router';
import Container from './Container';

const Footer = () => {
  const footerLinkStyles =
    'text-primary-foreground/80 transition-colors hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm';

  return (
    <footer className="bg-primary text-primary-foreground">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <p>CineTrack</p>
          <nav aria-label="Job seeker links">
            <h2 className="section-title">Job Seekers</h2>
            <ul>
              <li>
                <Link to="/jobs" className={footerLinkStyles}>
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/login" className={footerLinkStyles}>
                  Login
                </Link>
              </li>
            </ul>
          </nav>
          <nav>
            <h2>Employers</h2>
            <ul>
              <li>
                <Link to="/register-company" className={footerLinkStyles}>
                  Create business account
                </Link>
              </li>
              <li>
                <Link to="/jobs/add-job" className={footerLinkStyles}>
                  Post a Job
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-primary-foreground/15 pt-6 flex justify-between">
          <p className="text-sm text-primary-foreground/70">© 2026 CineTrack</p>
          <p className="text-sm text-primary-foreground/70">GitHub</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
