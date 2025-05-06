'use client';
import { useEffect, useRef, useState } from 'react';
import { IconLoader2 } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const mask = cva('absolute inset-0', {
  variants: {
    backdrop: {
      opaque: 'bg-black/45 dark:bg-black/55',
      blur: 'bg-black/45 dark:bg-black/55 backdrop-blur-sm',
      transparent: 'bg-transparent'
    }
  },
  defaultVariants: {
    backdrop: 'opaque'
  }
});
interface LoadingProps extends VariantProps<typeof mask> {
  className?: string;
  style?: React.CSSProperties;
  open?: boolean;
  children?: React.ReactNode;
  ref?: React.RefObject<HTMLDivElement>;
  isFullscreen?: boolean;
  indicator?: React.ReactNode;
}
export default function Loading({ className, open, backdrop, indicator, isFullscreen, children, ...props }: LoadingProps) {
  const [visible, setVisible] = useState(false);
  const maskRef = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation>(null);
  useEffect(() => {
    if (open) {
      setVisible(true);
      document.body.setAttribute('style', 'overflow: hidden');
      if (maskRef.current) {
        animation.current = maskRef.current.animate(
          { opacity: [0, 1] },
          {
            duration: 200,
            fill: 'both',
            easing: 'linear'
          }
        );
      }
    } else if (maskRef.current && animation.current) {
      animation.current.reverse();
      animation.current.onfinish = () => {
        setVisible(false);
        document.body.removeAttribute('style');
      };
    }
  }, [open]);
  return (
    <div className="relative">
      {children}
      {visible || open ? (
        <div className={cn('absolute inset-0 z-(--loading) flex items-center justify-center', { fixed: isFullscreen }, className)} {...props}>
          <div ref={maskRef} className={mask({ backdrop })}></div>
          <div data-node="loading-indicator" className="z-2">
            {indicator ? <>{indicator}</> : <IconLoader2 className="text-secondary animate-spin" size={36} />}
          </div>
        </div>
      ) : null}
    </div>
  );
}
