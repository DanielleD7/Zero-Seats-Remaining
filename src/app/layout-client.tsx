'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" >
      <motion.main
            key={pathname}
          >
      <div>
        {children}
      </div>
      </motion.main>
    </AnimatePresence>
  );
}

{/* <AnimatePresence mode="wait">
          
            {children}
          </motion.main>
        </AnimatePresence> */}