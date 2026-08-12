import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center space-2 whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        field: [
          'justify-between border border-input bg-background',
          'font-normal text-foreground',
          'hover:bg-background',
          'focus:border-primary',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0',
          'data-[state=open]:border-primary data-[state=open]:ring-2 data-[state=open]:ring-ring',
        ],
      },
      size: {
        default: 'px-3 py-3',
        sm: 'px-3',
        lg: 'px-8',
        icon: 'h-10 w-10',
        field: 'px-3 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
