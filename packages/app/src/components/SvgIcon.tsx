import { useEffect, useState } from 'react';

interface SvgIconProps {
  filePath: string;
  className?: string;
  style?: React.CSSProperties;
}
export default function SvgIcon({ filePath, ...props }: SvgIconProps) {
  const [svg, setSvg] = useState<string>('');
  const getPath = async (filePath: string) => {
    const { default: svg } = await import(`${filePath}?raw`);
    setSvg(svg);
  };

  useEffect(() => {
    getPath(filePath);
  }, [filePath]);

  return <i dangerouslySetInnerHTML={{ __html: svg }} {...props} />;
}
