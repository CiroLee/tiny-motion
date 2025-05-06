'use client';
import { Tooltip as TooltipPrimitive } from 'radix-ui';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const tooltipContent = cva(
  `bg-foreground text-sm text-background rounded-md px-2 py-1 z-(--tooltip) transition-all origin-[--radix-tooltip-content-transform-origin] 
  animate-zoom-fade-in data-[state=closed]:animate-zoom-fade-out`
);
type TooltipPrimitiveProvider = Omit<React.ComponentPropsWithRef<typeof TooltipPrimitive.Provider>, 'children'>;
type TooltipPrimitiveRoot = React.ComponentPropsWithRef<typeof TooltipPrimitive.Root>;

interface TooltipProps extends TooltipPrimitiveProvider, TooltipPrimitiveRoot {
  trigger: React.ReactNode;
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  alignOffset?: number;
  hiddenArrow?: boolean;
  style?: React.CSSProperties;
}

export default function ToolTip({
  trigger,
  side = 'top',
  align = 'center',
  sideOffset = 5,
  alignOffset = 1,
  hiddenArrow,
  delayDuration,
  skipDelayDuration,
  disableHoverableContent,
  children,
  className,
  ...props
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration} disableHoverableContent={disableHoverableContent}>
      <TooltipPrimitive.Root {...props}>
        <TooltipPrimitive.Trigger asChild>{trigger}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content className={cn(tooltipContent({ className }))} sideOffset={sideOffset} alignOffset={alignOffset} align={align} side={side}>
            {children}
            {!hiddenArrow ? <TooltipPrimitive.Arrow className="fill-foreground" /> : null}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
