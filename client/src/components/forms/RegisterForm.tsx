import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import {
  registerUserSchema,
  type RegisterUserFormFields,
} from "../../validation/registerUser";
import FormField from "../ui/FormField";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useRegister } from "../../features/auth/authQueries";
import { useNavigate } from "react-router";

type RegisterFormProps = {
  onSuccessRedirect: string;
};

const RegisterForm = ({ onSuccessRedirect }: RegisterFormProps) => {
  const registerMutation = useRegister();
  const formId = useId();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserFormFields>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const navigate = useNavigate();

  const onSubmitRegisterForm: SubmitHandler<RegisterUserFormFields> = (
    data,
  ) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    registerMutation.mutate(payload, {
      onSuccess: () => {
        navigate(onSuccessRedirect);
      },
      onError: (error: any) => {
        setError("root", {
          type: "server",
          message: error.message || "Failed to Signup ",
        });
      },
    });
  };

  const errId = (name: string) => `${formId}-${name}-error`;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitRegisterForm)} noValidate>
        <div className="mb-4">
          <FormField id="name" label="Name" required>
            <Input
              {...register("name")}
              id="name"
              required
              invalid={!!errors.name}
              aria-describedby={errors.name ? errId("name") : undefined}
              placeholder="Your Name"
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

        <div className="mb-4">
          <FormField id="confirm_password" label="Confirm Password" required>
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
          <Button disabled={isSubmitting} className="w-full" type="submit">
            Register
          </Button>
          <p
            role="alert"
            className="text-danger text-sm min-2 text-center mt-2"
          >
            {errors.root?.message ?? ""}
          </p>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
