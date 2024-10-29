
/*
TO USE:

1. place this import at the top of your page
import SlideInOverlay from '@/components/meta/slide-in-overlay-bottom';

2. place this variable definition at the top of your page method:
const [isOverlayOpen, setIsOverlayOpen] = useState(false)

3. Add this template (feel free to remove the button):
<SlideInOverlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)}>

    <button 
        onClick={() => setIsOverlayOpen(false)}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
    >
        Close
    </button>
</SlideInOverlay>

*/

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideInOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function SlideInOverlay({ isOpen, onClose, children }: SlideInOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-lg z-50 max-h-[80vh] overflow-y-auto"
          >
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}