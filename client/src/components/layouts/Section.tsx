import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionProps = {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'muted' | 'primary';
};

const Section = ({
  children,
  className,
  variant = 'default',
}: SectionProps) => {
  return (
    <section
      className={cn(
        'py-16 md:py-20',

        variant === 'default' && 'bg-background',
        variant === 'muted' && 'bg-surface-muted',
        variant === 'primary' && 'bg-primary text-primary-foreground',

        className,
      )}
    >
      {children}
    </section>
  );
};

export default Section;
