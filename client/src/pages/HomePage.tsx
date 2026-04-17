import Hero from "../components/sections/Hero";
import CtaCard from "../components/sections/HomeCTAs/CtaCard";
import Button from "../components/ui/Button";
import ButtonLink from "../components/ui/ButtonLink";
import Container from "../components/ui/Container";

const HomePage = () => {
  return (
    <>
      <Hero
        title="Enhance every trip with smart booking extras"
        subtitle="Add baggage, choose seats, stay flexible, and protect your trip in one simple flow."
      >
        <div className="mt-30">
          <ButtonLink
            to="/manage-bookings"
            aria-label="Manage Booking"
            variant="dark"
            className=""
          >
            Manage Bookings
          </ButtonLink>
          <ButtonLink
            to="/explore-features"
            aria-label="Explore Features"
            variant="secondary"
            className="ml-4"
          >
            Explore Features
          </ButtonLink>
        </div>
      </Hero>
      <section className="bg-brand">
        <Container className="grid grid-cols-2 gap-2">
          <CtaCard
            title="Add baggage"
            description="Choose the baggage option that fits your trip"
            to="/"
            ctaLabel="Add baggage"
            variant="light"
          />
          <CtaCard
            title="Pick your seat"
            description="Upgrade comfort with standard, preferred, or extra legroom seats"
            to="/"
            ctaLabel="Pick your seat"
            variant="light"
          />
          <CtaCard
            title="Stay flexible"
            description="Add flexible ticket options for peace of mind"
            to="/"
            ctaLabel="Stay flexible"
            variant="light"
          />
          <CtaCard
            title="Travel protected"
            description="Choose insurance coverage that suits your journey."
            to="/"
            ctaLabel="Travel protected"
            variant="light"
          />
        </Container>
      </section>
      <section className="text-center">
        <Container>
          <h2 className="section-title">Ready to personalize your trip?</h2>
          <ButtonLink
            to="/manage-bookings"
            aria-label="Manage Bookings"
            variant="dark"
            className="mt-6"
          >
            Manage Bookings
          </ButtonLink>
        </Container>
      </section>
    </>
  );
};

export default HomePage;
