import { Link } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm";

const RegisterPage = () => {
  return (
    <>
      <section>
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h2 className="text-3xl text-center font-semibold mb-6">
              Create an account
            </h2>
            <RegisterForm onSuccessRedirect="/profile" />
            <p className="text-center">
              Already have an account?
              <Link to="/login" className="ml-2 hover:underline text-brand">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
