'use client';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const link = cva(
  `inline-flex items-center gap-0.5 text-secondary transition-colors outline-none leading-[1em] 
  not-data-disabled:focus-visible:ring-secondary/50 not-data-disabled:focus-visible:ring-3 not-data-disabled:focus-visible:rounded-xs`,
  {
    variants: {
      underline: {
        true: 'shadow-[0_1px_0_0] shadow-secondary'
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50',
        false: 'hover:opacity-80'
      }
    },
    defaultVariants: {
      underline: false,
      disabled: false
    }
  }
);

type LinkVariants = VariantProps<typeof link>;
interface LinkProps extends React.ComponentPropsWithRef<'a'>, LinkVariants {}
export default function Link({ className, underline, disabled, target, onClick, ...props }: LinkProps) {
  return (
    <a
      role="link"
      tabIndex={0}
      {...(disabled ? { 'data-disabled': '' } : {})}
      aria-disabled={!!disabled}
      className={cn(link({ underline, disabled, className }))}
      target={target}
      {...(target === '_blank' && !disabled ? { rel: 'noopener noreferrer' } : {})}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        onClick?.(e);
      }}
      {...props}
    />
  );
}
