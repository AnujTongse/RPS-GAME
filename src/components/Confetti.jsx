import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConfettiPiece = ({ index }) => {
  const colors = ['#FFD93D', '#FF6B6B', '#6BCB77', '#4D96FF', '#FF9A9A', '#A855F7', '#06B6D4', '#F97316'];
  const color = colors[index % colors.length];
  const startX = Math.random() * 100;
  const delay = Math.random() * 0.5;
  const duration = 2 + Math.random() * 2;
  const rotation = Math.random() * 720 - 360;
  const size = 6 + Math.random() * 8;

  return (
    <motion.div
      initial={{
        x: `${startX}vw`,
        y: -20,
        rotate: 0,
        opacity: 1,
      }}
      animate={{
        y: '110vh',
        rotate: rotation,
        opacity: [1, 1, 0.8, 0],
      }}
      transition={{
        duration,
        delay,
        ease: 'linear',
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: size,
        height: size * 0.6,
        backgroundColor: color,
        borderRadius: '2px',
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    />
  );
};

const Confetti = ({ isActive }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <>
          {Array.from({ length: 80 }).map((_, i) => (
            <ConfettiPiece key={i} index={i} />
          ))}
        </>
      )}
    </AnimatePresence>
  );
};

export default Confetti;
