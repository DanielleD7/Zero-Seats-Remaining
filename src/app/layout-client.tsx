'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (

      <div>
        {children}
      </div>

  );
}

{/* <AnimatePresence mode="wait">
          
            {children}
          </motion.main>
        </AnimatePresence> */}