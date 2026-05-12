import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import {
  registerCompanySchema,
  type RegisterCompanyFormFields,
} from "../../validation/registerCompany";
import FormField from "../ui/FormField";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useNavigate } from "react-router";
import { userRegisterCompany } from "../../features/company/companyQuery";

type RegisterCompanyFormProps = {
  onSuccessRedirect: string;
};

const RegisterCompanyForm = ({
  onSuccessRedirect,
}: RegisterCompanyFormProps) => {
  const registerMutation = userRegisterCompany();
  const formId = useId();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterCompanyFormFields>({
    resolver: zodResolver(registerCompanySchema),
    defaultValues: {
      name: "",
      description: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  const navigate = useNavigate();

  const onSubmitRegisterForm: SubmitHandler<RegisterCompanyFormFields> = (
    data,
  ) => {
    const payload = {
      name: data.name,
      description: data.description,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
    };
    registerMutation.mutate(payload, {
      onSuccess: () => {
        navigate(onSuccessRedirect);
      },
      onError: (error: any) => {
        setError("root", {
          type: "server",
          message: error.message || "Failed to Register Company ",
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
              placeholder="Company Name"
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
          <FormField id="description" label="description" required>
            <Input
              {...register("description")}
              id="description"
              required
              invalid={!!errors.description}
              aria-describedby={
                errors.description ? errId("description") : undefined
              }
              placeholder="Description of your company"
            />
            {errors.description && (
              <p
                id={errId("description")}
                aria-live="polite"
                aria-hidden="false"
                className="text-danger"
              >
                {errors.description.message}
              </p>
            )}
          </FormField>
        </div>

        <div className="mb-4">
          <FormField id="contactEmail" label="Contact Email" required>
            <Input
              {...register("contactEmail")}
              id="contactEmail"
              required
              invalid={!!errors.contactEmail}
              aria-describedby={
                errors.contactEmail ? errId("contactEmail") : undefined
              }
              placeholder="example@email.com"
            />
            {errors.contactEmail && (
              <p
                id={errId("contactEmail")}
                aria-live="polite"
                aria-hidden="false"
                className="text-danger"
              >
                {errors.contactEmail.message}
              </p>
            )}
          </FormField>
        </div>

        <div className="mb-4">
          <FormField id="contactPhone" label="Contact Phone" required>
            <Input
              {...register("contactPhone")}
              id="contactPhone"
              required
              type="contactPhone"
              invalid={!!errors.contactPhone}
              aria-describedby={
                errors.contactPhone ? errId("contactPhone") : undefined
              }
              placeholder="Contact Phone"
            />
            {errors.contactPhone && (
              <p
                id={errId("contactPhone")}
                aria-live="polite"
                aria-hidden="false"
                className="text-danger"
              >
                {errors.contactPhone.message}
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

export default RegisterCompanyForm;
