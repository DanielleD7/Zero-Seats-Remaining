'use client';

import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      {/* Key is important for AnimatePresence to track route changes */}
      <div key={pathname}>
        {children}
      </div>
    </AnimatePresence>
  );
}