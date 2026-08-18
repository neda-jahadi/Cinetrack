import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const cardVariants = cva(
  'group bg-surface flex h-full flex-col rounded-md border border-border p-6 transition-[border-color,box-shadow] duration-200',
  {
    variants: {
      variant: {
        default: '',
        interactive: 'hover:border-primary/30 hover:shadow-card',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type CardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>;

const Card = ({ className, variant, ...props }: CardProps) => {
  return (
    <div className={cn(cardVariants({ variant }), className)} {...props} />
  );
};

export default Card;
