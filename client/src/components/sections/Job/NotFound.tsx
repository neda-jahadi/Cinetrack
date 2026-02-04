import { FaExclamationTriangle } from "react-icons/fa";
import ButtonLink from "../../ui/ButtonLink";

const NotFound = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center min-h-[60vh]">
      <FaExclamationTriangle
        aria-hidden="true"
        className="text-yellow-400 h-10 w-10 mb-4"
      />
      <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
      <p className="text-xl mb-5">This page does not exist</p>
      <ButtonLink to="/">Go Back</ButtonLink>
    </section>
  );
};

export default NotFound;
