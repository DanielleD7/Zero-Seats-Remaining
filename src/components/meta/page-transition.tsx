import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type PageTransitionProps = {
  children: ReactNode;
  direction?: 'left' | 'right';
};

export default function PageTransition({ children, direction = 'right' }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ x: direction === 'right' ? '100%' : '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: direction === 'right' ? '-100%' : '100%' }}
      transition={{ type: 'tween', ease: 'anticipate', duration: 0.5 }}
      style={{ position: 'absolute', width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  );
}