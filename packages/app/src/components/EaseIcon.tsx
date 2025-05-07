import { cn } from '@/lib/utils';
import type { EaseFunctionType } from '@cirolee/tiny-motion';
import { useEffect, useState } from 'react';
interface SvgIconProps {
  name: EaseFunctionType;
  fill?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function EaseIcon({ name, className, ...props }: SvgIconProps) {
  const [svg, setSvg] = useState<string>();
  const getPath = async (name: string) => {
    const { default: svg } = await import(`@/assets/icons/${name}.svg?raw`);
    setSvg(svg);
  };

  useEffect(() => {
    getPath(name);
  }, [name]);

  return <i className={cn('[&_svg]:size-8', className)} {...props} dangerouslySetInnerHTML={{ __html: svg ?? '' }}></i>;
}
