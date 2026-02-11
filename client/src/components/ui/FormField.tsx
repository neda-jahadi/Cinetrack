import { cn } from "../../lib/cn";

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
};

const FormField = ({
  id,
  label,
  required,
  className = "",
  children,
}: FormFieldProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className={cn("block text-gray-700 font-bold mb-2", className)}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
};

export default FormField;
