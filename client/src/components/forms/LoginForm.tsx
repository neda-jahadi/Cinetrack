import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../features/auth/authQueries";
import FormField from "../ui/FormField";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { loginSchema, type LoginFormFields } from "../../validation/login";

type LoginFormProps = {
  onSuccessRedirect: string;
};

const LoginForm = ({ onSuccessRedirect }: LoginFormProps) => {
  const loginMutation = useLogin();
  const formId = useId();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmitLoginForm: SubmitHandler<LoginFormFields> = (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    loginMutation.mutate(payload, {
      onSuccess: () => {
        navigate(onSuccessRedirect);
      },
      onError: (error: any) => {
        console.log(error.message);
        setError("root", {
          type: "server",
          message: error.message || "Failed to log in ",
        });
      },
    });
  };

  const errId = (name: string) => `${formId}-${name}-error`;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitLoginForm)} noValidate>
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
              aria-describedby={errors.password ? errId("password") : undefined}
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
          <Button disabled={isSubmitting} className="w-full" type="submit">
            Login
          </Button>
          {errors.root && (
            <p className="text-danger text-center mt-2">
              {errors.root.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
