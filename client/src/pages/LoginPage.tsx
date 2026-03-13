import FormField from "../components/ui/FormField";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { loginSchema, type LoginFormFields } from "../validation/login";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const formId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmitLoginForm: SubmitHandler<LoginFormFields> = () => {};

  const errId = (name: string) => `${formId}-${name}-error`;

  return (
    <>
      <section>
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h2 className="text-3xl text-center font-semibold mb-6">Login</h2>
            <form onSubmit={handleSubmit(onSubmitLoginForm)} noValidate>
              <p role="alert" className="text-danger text-sm min-h-1.5 mb-4">
                {errors.root?.message ?? ""}
              </p>

              <div className="mb-4">
                <FormField id="email" label="Email" required>
                  <Input
                    {...register("email")}
                    id="email"
                    required
                    invalid={!!errors.email}
                    aria-describedby={errors.email ? errId("email") : undefined}
                    placeholder="test@email.com"
                  />
                  {errors.email && (
                    <p
                      id={errId("email")}
                      aria-live="polite"
                      aria-hidden="false"
                      className="text-danger"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </FormField>
              </div>

              <div className="mb-4">
                <FormField id="password" label="Password" required>
                  <Input
                    {...register("password")}
                    id="password"
                    required
                    type="password"
                    invalid={!!errors.password}
                    aria-describedby={
                      errors.password ? errId("password") : undefined
                    }
                    placeholder="8 charachters"
                  />
                  {errors.password && (
                    <p
                      id={errId("password")}
                      aria-live="polite"
                      aria-hidden="false"
                      className="text-danger"
                    >
                      {errors.password.message}
                    </p>
                  )}
                </FormField>
              </div>

              <div>
                <Button
                  disabled={isSubmitting}
                  className="w-full"
                  type="submit"
                >
                  Login
                </Button>
                {errors.root && (
                  <p className="text-danger">{errors.root.message}</p>
                )}
              </div>
            </form>
            <p className="mt-6 text-center">
              <span>No account ?</span>
              <Link to="/register" className="hover:underline ml-2 text-brand">
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
