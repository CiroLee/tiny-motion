import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
const divider = cva('relative inline-flex items-center before:bg-line after:bg-line', {
  variants: {
    orientation: {
      horizontal: 'w-full flex-row before:w-full after:w-full before:h-px after:h-px my-4',
      vertical: 'flex-col justify-center h-full before:h-full after:h-full before:w-px after:w-px mx-4'
    }
  },
  defaultVariants: {
    orientation: 'horizontal'
  }
});
const content = cva('whitespace-nowrap text-sm', {
  variants: {
    orientation: {
      horizontal: 'px-3',
      vertical: 'py-3'
    }
  },
  defaultVariants: {
    orientation: 'horizontal'
  }
});

type DividerVariants = VariantProps<typeof divider>;
interface DividerProps extends React.HTMLAttributes<HTMLHRElement>, DividerVariants {}
export default function Divider({ className, orientation, children, ...props }: DividerProps) {
  return (
    <div role="divider" className={cn(divider({ orientation, className }))} {...props}>
      {children ? <span className={cn(content({ orientation }))}>{children}</span> : null}
    </div>
  );
}
