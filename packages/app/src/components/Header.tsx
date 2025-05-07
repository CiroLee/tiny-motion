import logoSvg from '@/assets/logo.svg';
import ThemeSwitch from './ThemeSwitch';
import Button from '@/ui/Button';
import { Link } from 'react-router-dom';
import { useMobile } from '@/hooks';
import { IconExternalLink, IconBackground, IconFile, IconBrandGithub } from '@tabler/icons-react';
export default function Header() {
  const isMobile = useMobile();
  return (
    <header className="bg-background/80 backdrop-blue-sm border-line fixed top-0 left-0 z-(--header) flex h-(--header-height) w-full items-center justify-between border-b px-4 backdrop-saturate-200">
      <Link to="/" className="flex items-center gap-1">
        <img src={logoSvg} className="size-8" alt="logo" />
        <span className="font-semibold">tiny-motion</span>
      </Link>
      <div className="flex items-center gap-2">
        <Button colors="neutral" variant="light" size="sm" icon={isMobile} asChild>
          <Link to="/docs">
            <IconFile className="block sm:hidden" size={18} />
            <span className="hidden sm:block">documents</span>
          </Link>
        </Button>
        <Button className="gap-1" colors="neutral" variant="light" size="sm" icon={isMobile} asChild>
          <Link to="/presets">
            <IconBackground className="block sm:hidden" size={18} />
            <span className="hidden sm:block">presets</span>
          </Link>
        </Button>
        <Button colors="neutral" asChild className="gap-1" variant="light" size="sm" icon={isMobile}>
          <a href="https://github.com/CiroLee/tiny-motion" target="_blank" rel="noopener noreferrer">
            <IconBrandGithub className="block sm:hidden" size={18} />
            <span className="hidden sm:block">Github</span>
            <IconExternalLink className="hidden sm:block" size={18} />
          </a>
        </Button>
        <ThemeSwitch />
      </div>
    </header>
  );
}
