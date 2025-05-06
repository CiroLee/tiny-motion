import { HoverCard as HoverCardPrimitive } from 'radix-ui';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const hoverCardContent = cva(
  `rounded-md bg-background drop-shadow-[0_-1px_0,1px_0_0,0_1px_0,-1px_0_0] drop-shadow-line p-2 z-(--popup) transition-all origin-[--radix-hover-card-content-transform-origin] 
  animate-zoom-fade-in data-[state=closed]:animate-zoom-fade-out outline-none`
);

interface HoverCardProps extends React.ComponentPropsWithRef<typeof HoverCardPrimitive.Root>, React.ComponentPropsWithRef<typeof HoverCardPrimitive.Content> {
  trigger: React.ReactNode;
  hiddenArrow?: boolean;
}
export default function HoverCard({ trigger, hiddenArrow, defaultOpen, open, sideOffset = 5, alignOffset = 1, onOpenChange, openDelay, closeDelay, className, children, ...props }: HoverCardProps) {
  return (
    <HoverCardPrimitive.Root defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange} openDelay={openDelay} closeDelay={closeDelay}>
      <HoverCardPrimitive.Trigger asChild>{trigger}</HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content className={cn(hoverCardContent({ className }))} alignOffset={alignOffset} sideOffset={sideOffset} {...props}>
          {children}
          {hiddenArrow ? null : <HoverCardPrimitive.Arrow className="fill-background" />}
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
}
