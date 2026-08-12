import * as React from 'react';
import { cn } from '../../lib/cn';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
  variant?: 'default' | 'ghost';
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      invalid = false,
      variant = 'default',
      ...props
    },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        aria-invalid={invalid || undefined}
        className={cn(
          'w-full rounded bg-background text-foreground placeholder:text-muted-foreground px-3 py-3 text-sm transition-colors',
          'focus:outline-none',
          'disabled:cursor-not-allowed disabled:bg-disabled disabled:text-disabled-foreground',
          variant === 'default' &&
            'border border-input focus:border-primary focus-visible:ring-2 focus-visible:ring-ring',
          variant === 'ghost' &&
            'border-0 bg-transparent focus:border-transparent focus-visible::ring-0 px-0',
          invalid &&
            'border-danger focus:border-danger focus-visible:ring-danger',
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
