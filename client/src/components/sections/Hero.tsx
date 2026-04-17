import Container from "../ui/Container";
type HeroProps = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

const Hero = ({ title, subtitle, children }: HeroProps) => {
  return (
    <section className="bg-brand-light">
      <Container className="flex-col items-center">
        <div className="">
          <h1 className="hero-title">{title}</h1>
          {subtitle && <p className="my-4 text-xl">{subtitle}</p>}
          {children && <div>{children}</div>}
        </div>
      </Container>
    </section>
  );
};

export default Hero;
