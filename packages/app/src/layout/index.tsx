import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Header from '@/components/Header';

export default function Layout() {
  return (
    <div className="relative">
      <Header />
      <main className="relative mt-(--header-height) h-[calc(100vh_-_var(--header-height))]">
        <Suspense>{<Outlet />}</Suspense>
      </main>
    </div>
  );
}
