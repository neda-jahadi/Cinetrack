import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { buttonVariants } from './button/button-variants';
import { type VariantProps } from 'class-variance-authority';

type ButtonLinkProps = LinkProps & VariantProps<typeof buttonVariants>;

export default function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
