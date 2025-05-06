import { Outlet } from 'react-router-dom';
import SideMenu from '@/components/SideMenu';

export default function DocsPage() {
  return (
    <div className="relative flex h-full">
      <SideMenu />
      <div className="w-full overflow-x-hidden p-4 sm:px-[12%]">
        <Outlet />
      </div>
    </div>
  );
}
