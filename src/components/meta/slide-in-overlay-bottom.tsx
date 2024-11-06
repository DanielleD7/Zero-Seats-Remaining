
/*
TO USE:

1. place these imports at the top of your page
import SlideInOverlay from '@/components/meta/slide-in-overlay-bottom';
import { ReactNode } from 'react';

2. place this variable definition at the top of your page method:
const [isOverlayOpen, setIsOverlayOpen] = useState(false)

3. Add this template (feel free to remove the button):
<SlideInOverlay isOpen={isOverlayOpen} title="Popup Header" onClose={() => setIsOverlayOpen(false)}>

    <button 
        onClick={() => setIsOverlayOpen(false)}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
    >
        Close
    </button>
</SlideInOverlay>


Remove the 'title=' to forego the card header

*/

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, GraduationCap, BookOpen } from "lucide-react"

interface SlideInOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode
  children: ReactNode;
}

export default function SlideInOverlay({ isOpen, onClose, title, children }: SlideInOverlayProps) {
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
            {title && <CardHeader className="flex flex-row items-center justify-between pb-1 pt-1 bg-transparent">
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
              <button className="text-gray-500 hover:text-gray-700" aria-label="Close" onClick={onClose}>
                <X className="h-6 w-6"/>
              </button>
            </CardHeader>}
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}