import FormField from "../components/ui/FormField";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import {
  registerUserSchema,
  type RegisterUserFormFields,
} from "../validation/registerUser";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const formId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserFormFields>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "User",
    },
  });

  const onSubmitRegisterForm: SubmitHandler<RegisterUserFormFields> = (
    data,
  ) => {
    console.log(data);
  };

  const errId = (name: string) => `${formId}-${name}-error`;

  return (
    <>
      <section>
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h2 className="text-3xl text-center font-semibold mb-6">
              Create an account
            </h2>
            <form onSubmit={handleSubmit(onSubmitRegisterForm)} noValidate>
              <p role="alert" className="text-danger text-sm min-h-1.5 mb-4">
                {errors.root?.message ?? ""}
              </p>
              <div className="mb-4">
                <FormField id="name" label="Name" required>
                  <Input
                    {...register("name")}
                    id="name"
                    required
                    invalid={!!errors.email}
                    aria-describedby={errors.email ? errId("name") : undefined}
                    placeholder="test@email.com"
                  />
                  {errors.name && (
                    <p
                      id={errId("name")}
                      aria-live="polite"
                      aria-hidden="false"
                      className="text-danger"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </FormField>
              </div>

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

              <div className="mb-4">
                <FormField
                  id="confirm_password"
                  label="Confirm Password"
                  required
                >
                  <Input
                    {...register("confirm_password")}
                    id="confirm_password"
                    required
                    type="password"
                    invalid={!!errors.confirm_password}
                    aria-describedby={
                      errors.password ? errId("confirm_password") : undefined
                    }
                    placeholder="8 charachters"
                  />
                  {errors.confirm_password && (
                    <p
                      id={errId("confirm_password")}
                      aria-live="polite"
                      aria-hidden="false"
                      className="text-danger"
                    >
                      {errors.confirm_password.message}
                    </p>
                  )}
                </FormField>
              </div>

              <div className="mb-4">
                <FormField id="role" label="Role" required>
                  <select
                    {...register("role")}
                    id="role"
                    required
                    aria-invalid={!!errors.role}
                    aria-describedby={errors.role ? errId("role") : undefined}
                    className={`border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand ${errors.role && "border-danger focus:ring-danger"}`}
                  >
                    <option value="">Select role</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                  {errors.role && (
                    <p
                      id={errId("role")}
                      aria-live="polite"
                      aria-hidden="false"
                      className="text-danger"
                    >
                      {errors.role.message}
                    </p>
                  )}
                </FormField>
              </div>

              <div className="mb-4">
                <Button
                  disabled={isSubmitting}
                  className="w-full"
                  type="submit"
                >
                  Register
                </Button>
                {errors.root && (
                  <p className="text-danger">{errors.root.message}</p>
                )}
              </div>
              <p className="text-center">
                Already have an account?
                <Link to="/login" className="ml-2 hover:underline text-brand">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
