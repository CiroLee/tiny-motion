import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { router, type CustomRouteObject } from '@/routes';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { IconLayoutSidebarFilled } from '@tabler/icons-react';
import { useOnClickOutside } from 'usehooks-ts';
import Tag from '@/ui/Tag';

const menuItem = cva('px-4 py-2 transition relative flex items-center hover:text-secondary', {
  variants: {
    active: {
      true: 'text-secondary flex items-center before:absolute before:left-2 before:h-[60%] before:inline-block before:w-[2px] before:bg-secondary'
    }
  }
});

export default function SideMenu() {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const children = router.routes.find((item) => item.id === 'root')?.children;
  const docsChildren = children?.find((item) => item.id === 'docs')?.children as CustomRouteObject[];
  const hookList = docsChildren.filter((item) => item.meta?.type === 'hook');
  const universalList = docsChildren.filter((item) => item.meta?.type === 'universal');

  useOnClickOutside(ref as React.RefObject<HTMLElement>, () => {
    setHidden(true);
  });
  return (
    <div
      ref={ref}
      className={cn('bg-background border-line absolute z-10 flex h-full w-65 shrink-0 -translate-x-full flex-col border-r transition duration-300 sm:relative sm:translate-x-0', {
        'translate-x-0': !hidden
      })}>
      <p className="text-description p-3">Hooks</p>
      {hookList.map((menu) => (
        <NavLink to={menu.path || ''} key={menu.id} className={({ isActive }) => cn(menuItem({ active: isActive }))} onClick={() => setHidden(true)}>
          {menu.meta?.name}
          {menu.meta?.level ? (
            <Tag colors="secondary" className="ml-1">
              {menu.meta?.level}
            </Tag>
          ) : null}
        </NavLink>
      ))}
      <p className="text-description p-3">universal</p>
      {universalList.map((menu) => (
        <NavLink to={menu.path || ''} key={menu.id} className={({ isActive }) => cn(menuItem({ active: isActive }))} onClick={() => setHidden(true)}>
          {menu.meta?.name}
          {menu.meta?.level ? (
            <Tag colors="secondary" className="ml-1">
              {menu.meta?.level}
            </Tag>
          ) : null}
        </NavLink>
      ))}
      <div className={cn('absolute -right-11 bottom-4 flex size-9 cursor-pointer items-center justify-center rounded-md bg-zinc-200 sm:hidden dark:bg-zinc-700')} onClick={() => setHidden(!hidden)}>
        <IconLayoutSidebarFilled size={28} />
      </div>
    </div>
  );
}
