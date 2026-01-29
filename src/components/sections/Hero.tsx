import Container from "../ui/Container";
type HeroProps = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

const Hero = ({ title, subtitle, children }: HeroProps) => {
  return (
    <section className="bg-indigo-700 py-20 mb-4">
      <Container className="flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {subtitle && <p className="my-4 text-xl text-white">{subtitle}</p>}
          {children && <div>{children}</div>}
        </div>
      </Container>
    </section>
  );
};

export default Hero;
