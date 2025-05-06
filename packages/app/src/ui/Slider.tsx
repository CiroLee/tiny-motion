'use client';
import { Slider as SliderPrimitive } from 'radix-ui';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const sliderRoot = cva(
  `relative flex touch-none select-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 
  data-[orientation=horizontal]:items-center data-[orientation=vertical]:w-fit data-[orientation=vertical]:items-start 
  data-[orientation=vertical]:justify-center`
);
const sliderTrack = cva('rounded-full relative grow bg-neutral-200 dark:bg-neutral-700 data-[orientation=vertical]:h-full', {
  variants: {
    size: {
      sm: 'data-[orientation=horizontal]:h-1 data-[orientation=vertical]:w-1',
      md: 'data-[orientation=horizontal]:h-2 data-[orientation=vertical]:w-2',
      lg: 'data-[orientation=horizontal]:h-3 data-[orientation=vertical]:w-3'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
const sliderRange = cva(
  `absolute data-[orientation=vertical]:w-full data-[orientation=horizontal]:h-full 
  data-[orientation=vertical]:rounded-b-full data-[orientation=horizontal]:rounded-l-full`,
  {
    variants: {
      colors: {
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        warning: 'bg-warning',
        danger: 'bg-danger',
        neutral: 'bg-neutral-400 dark:bg-neutral-300'
      }
    },
    defaultVariants: {
      colors: 'primary'
    }
  }
);

const sliderThumb = cva('block rounded-full bg-background border-2 outline-none focus-visible:ring-2', {
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6'
    },
    colors: {
      primary: 'border-primary  not-[data-disabled]:focus-visible:ring-primary/50',
      secondary: 'border-secondary focus-visible:ring-secondary/50',
      warning: 'border-warning not-[data-disabled]:focus-visible:ring-warning/50',
      danger: 'border-danger not-[data-disabled]:focus-visible:ring-danger/50',
      neutral: 'border-neutral-400 dark:border-neutral-300 not-[data-disabled]:focus-visible:ring-neutral-500/50'
    }
  },
  defaultVariants: {
    size: 'md',
    colors: 'primary'
  }
});

type SliderThumbVariants = VariantProps<typeof sliderThumb>;
interface SliderProps extends React.ComponentPropsWithRef<typeof SliderPrimitive.Root>, SliderThumbVariants {}
export default function Slider({ size, defaultValue, value, colors, className, ...props }: SliderProps) {
  const currentValue = value ?? defaultValue ?? [];
  return (
    <SliderPrimitive.Root className={cn(sliderRoot({ className }))} defaultValue={defaultValue} value={value} {...props}>
      <SliderPrimitive.Track className={cn(sliderTrack({ size }))}>
        <SliderPrimitive.Range className={cn(sliderRange({ colors }))} />
      </SliderPrimitive.Track>
      {currentValue.map((_, index) => (
        <SliderPrimitive.Thumb key={index} className={sliderThumb({ size, colors })} />
      ))}
    </SliderPrimitive.Root>
  );
}
