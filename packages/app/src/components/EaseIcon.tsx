import type { EaseFunctionType } from '@cirolee/tiny-motion';
import { useEffect, useState } from 'react';
interface SvgIconProps {
  name: EaseFunctionType;
  fill?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function EaseIcon({ name, ...rest }: SvgIconProps) {
  const [svg, setSvg] = useState<string>();
  const getPath = async (name: string) => {
    const { default: svg } = await import(`@/assets/icons/${name}.svg?raw`);
    setSvg(svg);
  };

  useEffect(() => {
    getPath(name);
  }, [name]);
  if (name === 'easeOutBack') {
    return (
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
        <path d="M14 89.2796C26.8967 24.7962 37.36 -3.67378 87 16.2796" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      </svg>
    );
  } else {
    return <i className="[&_svg]:size-8" dangerouslySetInnerHTML={{ __html: svg ?? '' }}></i>;
  }
}
