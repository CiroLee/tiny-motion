import { useEffect, useState } from 'react';

interface SvgIconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}
export default function SvgIcon({ name, ...props }: SvgIconProps) {
  const [svg, setSvg] = useState<string>('');
  const getPath = async (name: string) => {
    const { default: svg } = await import(`@/assets/icons/${name}.svg?raw`);
    setSvg(svg);
  };

  useEffect(() => {
    getPath(name);
  }, [name]);

  return <i dangerouslySetInnerHTML={{ __html: svg }} {...props} />;
}
