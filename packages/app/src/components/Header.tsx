import logoSvg from '@/assets/logo.svg';
import ThemeSwitch from './ThemeSwitch';
import Button from '@/ui/Button';
import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blue-sm border-line fixed top-0 left-0 z-(--header) flex h-(--header-height) w-full items-center justify-between border-b px-4 backdrop-saturate-200">
      <Link to="/" className="flex items-center gap-1">
        <img src={logoSvg} className="size-8" alt="logo" />
        <span className="font-semibold">tiny-motion</span>
      </Link>
      <div className="flex items-center gap-2">
        <Button colors="neutral" variant="light" size="sm">
          <Link to="/docs">documents</Link>
        </Button>
        <Button colors="neutral" variant="light" size="sm">
          <Link to="/presets">presets</Link>
        </Button>
        <ThemeSwitch />
      </div>
    </header>
  );
}
