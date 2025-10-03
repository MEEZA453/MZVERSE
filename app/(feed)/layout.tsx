'use client';
import MasterNavber from '../Components/MasterNavber';
import { useRouter, usePathname } from 'next/navigation';

export default function FeedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: 'Explore', route: '/' },
    { name: 'Posts', route: '/posts' },
    { name: 'Supply', route: '/supply' },
  ];

  const activeIndex = tabs.findIndex(tab =>
    tab.route === '/' ? pathname === '/' : pathname.startsWith(tab.route)
  );

  return (
    <div>
      <MasterNavber />
      {/* Tabs */}
      <div className="sticky top-13 z-[300] flex justify-center gap-1 mt-3">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => router.push(tab.route)}
            className={`rounded-full px-3 py-0.5 text-[14px] ${
              activeIndex === i ? 'tab-onOfLight' : 'tab-offOfLight'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}
