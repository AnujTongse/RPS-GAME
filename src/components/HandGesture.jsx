import { motion } from 'framer-motion';

const RockSVG = ({ color = '#FFD93D' }) => (
  <svg viewBox="0 0 200 200" width="100%" height="100%">
    {/* Closed fist - realistic */}
    <defs>
      <linearGradient id="rockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE066" />
        <stop offset="50%" stopColor="#FFD93D" />
        <stop offset="100%" stopColor="#F0C030" />
      </linearGradient>
      <filter id="rockShadow">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>
    {/* Wrist */}
    <rect x="70" y="140" width="60" height="50" rx="10" fill="url(#rockGrad)" filter="url(#rockShadow)" />
    {/* Palm base */}
    <ellipse cx="100" cy="130" rx="48" ry="35" fill="url(#rockGrad)" filter="url(#rockShadow)" />
    {/* Curled fingers */}
    <ellipse cx="65" cy="105" rx="18" ry="14" fill="#FFE066" stroke="#E8B820" strokeWidth="1.5" />
    <ellipse cx="85" cy="90" rx="17" ry="15" fill="#FFE066" stroke="#E8B820" strokeWidth="1.5" />
    <ellipse cx="108" cy="88" rx="17" ry="15" fill="#FFE066" stroke="#E8B820" strokeWidth="1.5" />
    <ellipse cx="130" cy="95" rx="16" ry="13" fill="#FFE066" stroke="#E8B820" strokeWidth="1.5" />
    {/* Thumb wrapping over */}
    <ellipse cx="55" cy="125" rx="15" ry="12" fill="#FFE066" stroke="#E8B820" strokeWidth="1.5" transform="rotate(-20 55 125)" />
    {/* Knuckle lines */}
    <path d="M60 112 Q65 108 72 112" fill="none" stroke="#E8B820" strokeWidth="1" />
    <path d="M78 97 Q85 93 92 97" fill="none" stroke="#E8B820" strokeWidth="1" />
    <path d="M100 95 Q108 91 115 95" fill="none" stroke="#E8B820" strokeWidth="1" />
    <path d="M122 101 Q128 97 136 101" fill="none" stroke="#E8B820" strokeWidth="1" />
    {/* Highlight */}
    <ellipse cx="90" cy="115" rx="25" ry="12" fill="rgba(255,255,255,0.15)" />
  </svg>
);

const PaperSVG = ({ color = '#74B9FF' }) => (
  <svg viewBox="0 0 200 220" width="100%" height="100%">
    {/* Open palm with five fingers */}
    <defs>
      <linearGradient id="paperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A8D8FF" />
        <stop offset="50%" stopColor="#74B9FF" />
        <stop offset="100%" stopColor="#5AA0E0" />
      </linearGradient>
      <filter id="paperShadow">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>
    {/* Wrist */}
    <rect x="65" y="170" width="65" height="45" rx="12" fill="url(#paperGrad)" filter="url(#paperShadow)" />
    {/* Palm */}
    <ellipse cx="100" cy="150" rx="50" ry="40" fill="url(#paperGrad)" filter="url(#paperShadow)" />
    {/* Pinky finger */}
    <rect x="40" y="70" width="22" height="75" rx="11" fill="#A8D8FF" stroke="#4A90D9" strokeWidth="1.5" transform="rotate(-12 51 105)" />
    {/* Ring finger */}
    <rect x="58" y="45" width="24" height="90" rx="12" fill="#A8D8FF" stroke="#4A90D9" strokeWidth="1.5" transform="rotate(-5 70 90)" />
    {/* Middle finger */}
    <rect x="82" y="30" width="26" height="100" rx="13" fill="#A8D8FF" stroke="#4A90D9" strokeWidth="1.5" />
    {/* Index finger */}
    <rect x="110" y="40" width="24" height="92" rx="12" fill="#A8D8FF" stroke="#4A90D9" strokeWidth="1.5" transform="rotate(5 122 86)" />
    {/* Thumb */}
    <rect x="138" y="100" width="22" height="55" rx="11" fill="#A8D8FF" stroke="#4A90D9" strokeWidth="1.5" transform="rotate(30 149 127)" />
    {/* Finger joints */}
    <line x1="47" y1="105" x2="55" y2="104" stroke="#4A90D9" strokeWidth="0.8" opacity="0.5" />
    <line x1="65" y1="95" x2="75" y2="94" stroke="#4A90D9" strokeWidth="0.8" opacity="0.5" />
    <line x1="88" y1="85" x2="102" y2="85" stroke="#4A90D9" strokeWidth="0.8" opacity="0.5" />
    <line x1="116" y1="90" x2="128" y2="91" stroke="#4A90D9" strokeWidth="0.8" opacity="0.5" />
    {/* Palm lines */}
    <path d="M70 145 Q100 135 130 145" fill="none" stroke="#4A90D9" strokeWidth="0.8" opacity="0.4" />
    <path d="M75 158 Q100 150 125 158" fill="none" stroke="#4A90D9" strokeWidth="0.8" opacity="0.3" />
    {/* Highlight */}
    <ellipse cx="95" cy="140" rx="25" ry="15" fill="rgba(255,255,255,0.15)" />
  </svg>
);

const ScissorsSVG = ({ color = '#FF6B6B' }) => (
  <svg viewBox="0 0 200 220" width="100%" height="100%">
    {/* V-shape: index and middle fingers extended */}
    <defs>
      <linearGradient id="scissorsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF9A9A" />
        <stop offset="50%" stopColor="#FF6B6B" />
        <stop offset="100%" stopColor="#E05555" />
      </linearGradient>
      <filter id="scissorsShadow">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>
    {/* Wrist */}
    <rect x="68" y="165" width="60" height="48" rx="10" fill="url(#scissorsGrad)" filter="url(#scissorsShadow)" />
    {/* Palm */}
    <ellipse cx="100" cy="150" rx="45" ry="32" fill="url(#scissorsGrad)" filter="url(#scissorsShadow)" />
    {/* Curled ring finger */}
    <ellipse cx="72" cy="128" rx="15" ry="12" fill="#FF9A9A" stroke="#D04040" strokeWidth="1.5" />
    {/* Curled pinky */}
    <ellipse cx="60" cy="138" rx="13" ry="10" fill="#FF9A9A" stroke="#D04040" strokeWidth="1.5" />
    {/* Index finger - extended, angled left */}
    <rect x="72" y="30" width="24" height="100" rx="12" fill="#FF9A9A" stroke="#D04040" strokeWidth="1.5" transform="rotate(-12 84 80)" />
    {/* Middle finger - extended, angled right */}
    <rect x="102" y="28" width="24" height="102" rx="12" fill="#FF9A9A" stroke="#D04040" strokeWidth="1.5" transform="rotate(12 114 79)" />
    {/* Thumb folded */}
    <ellipse cx="55" cy="155" rx="14" ry="11" fill="#FF9A9A" stroke="#D04040" strokeWidth="1.5" transform="rotate(-15 55 155)" />
    {/* Finger joints */}
    <line x1="77" y1="82" x2="89" y2="80" stroke="#D04040" strokeWidth="0.8" opacity="0.5" />
    <line x1="109" y1="80" x2="121" y2="82" stroke="#D04040" strokeWidth="0.8" opacity="0.5" />
    {/* V gap highlight */}
    <path d="M92 60 L100 80 L108 60" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
    {/* Highlight */}
    <ellipse cx="95" cy="145" rx="22" ry="12" fill="rgba(255,255,255,0.15)" />
  </svg>
);

const gestures = {
  rock: RockSVG,
  paper: PaperSVG,
  scissors: ScissorsSVG,
};

const HandGesture = ({ type, size = 120, isShaking = false, isRevealing = false, isPlayer = true }) => {
  const GestureSVG = gestures[type];
  
  if (!type || !GestureSVG) {
    // Show question mark when no choice
    return (
      <motion.div
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.5,
          color: 'rgba(255,255,255,0.3)',
          fontWeight: 'bold',
        }}
        animate={isShaking ? {
          y: [0, -20, 0, -20, 0],
          transition: { duration: 0.5, repeat: Infinity }
        } : {}}
      >
        ?
      </motion.div>
    );
  }

  return (
    <motion.div
      style={{
        width: size,
        height: size,
        transform: isPlayer ? 'scaleX(1)' : 'scaleX(-1)',
      }}
      animate={isShaking ? {
        y: [0, -25, 0, -25, 0, -25, 0],
        transition: { duration: 0.6, repeat: Infinity }
      } : {}}
      initial={isRevealing ? { scale: 0, rotate: -180, opacity: 0 } : { scale: 1, opacity: 1 }}
      {...(isRevealing ? {
        animate: { scale: 1, rotate: 0, opacity: 1 },
        transition: { type: 'spring', stiffness: 200, damping: 15 }
      } : {})}
    >
      <GestureSVG />
    </motion.div>
  );
};

export default HandGesture;
