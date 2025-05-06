import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Loading from '@/ui/Loading';

export default function Layout() {
  return (
    <div className="relative">
      <Header />
      <main className="relative mt-(--header-height) h-[calc(100vh_-_var(--header-height))]">
        <Suspense fallback={<Loading open isFullscreen />}>{<Outlet />}</Suspense>
      </main>
    </div>
  );
}
