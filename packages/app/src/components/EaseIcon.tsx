import { cn } from '@/lib/utils';
import type { EaseFunctionType } from '@cirolee/tiny-motion';
import SvgIcon from './SvgIcon';
interface EaseIconProps {
  name: EaseFunctionType;
  fill?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function EaseIcon({ name, className, ...props }: EaseIconProps) {
  return <SvgIcon className={cn('[&_svg]:size-8', className)} filePath={`../assets/icons/${name}.svg`} {...props} />;
}
