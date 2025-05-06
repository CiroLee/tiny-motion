export const colors = {
  primary: 'bg-primary not-disabled:active:bg-primary-active focus-visible:ring-primary/50',
  danger: 'bg-danger not-disabled:active:bg-danger-active focus-visible:ring-danger/50',
  secondary: 'bg-secondary not-disabled:active:bg-secondary-active focus-visible:ring-secondary/50',
  warning: 'bg-warning not-disabled:active:bg-warning-active focus-visible:ring-warning/50',
  neutral: `bg-neutral-200 not-disabled:active:bg-neutral-300 focus-visible:ring-neutral-300/40 
  dark:bg-neutral-700 dark:not-disabled:active:bg-[#343333] dark:focus-visible:ring-neutral-700/60`
};

export interface ComputedVariants {
  colors: keyof typeof colors;
  variant: 'bordered' | 'light';
  className: string;
}

export const colorsBorderedVariants: ComputedVariants[] = [
  {
    colors: 'primary',
    variant: 'bordered',
    className: 'border-primary text-primary not-disabled:hover:bg-primary/10 not-disabled:active:bg-primary/20'
  },
  {
    colors: 'secondary',
    variant: 'bordered',
    className: 'border-secondary text-secondary not-disabled:hover:bg-secondary/10 not-disabled:active:bg-secondary/20'
  },
  {
    colors: 'warning',
    variant: 'bordered',
    className: 'border-warning text-warning not-disabled:hover:bg-warning/10 not-disabled:active:bg-warning/20'
  },
  {
    colors: 'danger',
    variant: 'bordered',
    className: 'border-danger text-danger not-disabled:hover:bg-danger/10 not-disabled:active:bg-danger/20'
  },
  {
    colors: 'neutral',
    variant: 'bordered',
    className: 'border-neutral-300/70 not-disabled:hover:bg-neutral-500/15 dark:not-disabled:active:bg-neutral-700/30 not-disabled:active:bg-neutral-300/30 dark:border-neutral-700'
  }
];

export const colorsLightVariants: ComputedVariants[] = [
  {
    colors: 'primary',
    variant: 'light',
    className: 'text-primary not-disabled:hover:bg-primary/15 not-disabled:active:bg-primary/25'
  },
  {
    colors: 'secondary',
    variant: 'light',
    className: 'text-secondary not-disabled:hover:bg-secondary/15 not-disabled:active:bg-secondary/25'
  },
  {
    colors: 'warning',
    variant: 'light',
    className: 'text-warning not-disabled:hover:bg-warning/15 not-disabled:active:bg-warning/25'
  },
  {
    colors: 'danger',
    variant: 'light',
    className: 'text-danger not-disabled:hover:bg-danger/10 not-disabled:active:bg-danger/20'
  },
  {
    colors: 'neutral',
    variant: 'light',
    className: 'text-foreground not-disabled:hover:bg-neutral-500/15 not-disabled:active:bg-neutral-400/30 not-disabled:dark:active:bg-neutral-700/20'
  }
];
