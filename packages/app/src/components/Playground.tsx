import { cn } from '@/lib/utils';
interface PlaygroundProps {
  className?: string;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}
export default function Playground({ children, className, ref }: PlaygroundProps) {
  return (
    <div ref={ref} className={cn('polka border-line relative min-h-60 overflow-hidden rounded-md border', className)}>
      {children}
    </div>
  );
}
