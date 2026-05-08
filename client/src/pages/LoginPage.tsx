import { Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";

const LoginPage = () => {
  return (
    <>
      <section>
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h2 className="text-3xl text-center font-semibold mb-6">Log in</h2>
            <LoginForm onSuccessRedirect="/profile" />
            <p className="mt-6 text-center">
              <span>No account ?</span>
              <Link to="/signup" className="hover:underline ml-2 text-brand">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
