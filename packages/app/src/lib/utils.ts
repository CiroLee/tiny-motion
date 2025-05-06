import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';
export function cn(...classnames: ClassValue[]): string {
  return twMerge(clsx(classnames));
}
