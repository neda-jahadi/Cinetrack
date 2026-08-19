import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type FormPanelProps = {
  children: ReactNode;
  className?: string;
};

const FormPanel = ({ children, className }: FormPanelProps) => {
  return (
    <div
      className={cn(
        'rounded-md border border-border bg-surface p-6 shadow-card',
        'sm:p-8',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default FormPanel;
