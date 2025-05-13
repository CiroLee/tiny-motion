import { useIsClient } from 'usehooks-ts';
import { cva } from 'class-variance-authority';
import { useTheme } from '@/hooks';
import { DropdownMenu } from 'radix-ui';
import Button from '../ui/Button';
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react';
import type { ThemeMode } from '@/types';

const item = cva('flex items-center outline-none gap-1 text-sm rounded p-2 cursor-default transition-colors focus:bg-primary focus:text-white');
const themeMap = {
  light: <IconSun size={22} />,
  dark: <IconMoon size={20} />,
  system: <IconDeviceDesktop size={20} />
};
export default function ThemeSwitch() {
  const isClient = useIsClient();
  const [theme, setTheme] = useTheme();

  const handleSetTheme = (theme: ThemeMode) => {
    if (typeof setTheme === 'function') {
      setTheme(theme);
    }
  };

  if (!isClient) return null;
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="light" colors="neutral" size="sm" icon>
          {themeMap[theme as keyof typeof themeMap]}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={8} align="end" className="data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out z-(--popup) outline-none">
          <div className="border-line bg-background rounded-md border p-1">
            <DropdownMenu.Item className={item()} onSelect={() => handleSetTheme('light')}>
              <IconSun size={18} />
              Light
            </DropdownMenu.Item>
            <DropdownMenu.Item className={item()} onClick={() => handleSetTheme('dark')}>
              <IconMoon size={18} />
              Dark
            </DropdownMenu.Item>
            <DropdownMenu.Item className={item()} onClick={() => handleSetTheme('system')}>
              <IconDeviceDesktop size={18} />
              System
            </DropdownMenu.Item>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
