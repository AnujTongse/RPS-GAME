import { motion } from 'framer-motion';

const HomeScreen = ({ onStartGame, onHowToPlay, onSettings, stats }) => {
  return (
    <motion.div
      className="home-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Animated Title */}
      <motion.div
        className="title-container"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
      >
        <h1 className="game-title">
          <span className="title-line">✊ ROCK</span>
          <span className="title-line">✋ PAPER</span>
          <span className="title-line">✌️ SCISSORS</span>
        </h1>
        <motion.p
          className="game-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          ⚡ ARCADE EDITION ⚡
        </motion.p>
      </motion.div>

      {/* Floating hand gestures */}
      <div className="floating-hands">
        <motion.span
          className="floating-emoji"
          animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ left: '10%', top: '20%' }}
        >
          ✊
        </motion.span>
        <motion.span
          className="floating-emoji"
          animate={{ y: [0, -20, 0], rotate: [0, -15, 15, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
          style={{ right: '10%', top: '25%' }}
        >
          ✋
        </motion.span>
        <motion.span
          className="floating-emoji"
          animate={{ y: [0, -12, 0], rotate: [0, 12, -12, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: 1 }}
          style={{ left: '20%', bottom: '30%' }}
        >
          ✌️
        </motion.span>
        <motion.span
          className="floating-emoji"
          animate={{ y: [0, -18, 0], rotate: [0, -8, 8, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: 1.5 }}
          style={{ right: '15%', bottom: '35%' }}
        >
          🎮
        </motion.span>
      </div>

      {/* Play Button */}
      <motion.button
        className="play-button"
        onClick={onStartGame}
        whileHover={{ scale: 1.08, boxShadow: '0 0 40px rgba(168,85,247,0.6)' }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 150, delay: 0.6 }}
      >
        🎯 PLAY NOW
      </motion.button>

      {/* Secondary Buttons */}
      <motion.div
        className="home-buttons"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          className="secondary-btn"
          onClick={onHowToPlay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📖 How to Play
        </motion.button>
        <motion.button
          className="secondary-btn"
          onClick={onSettings}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ⚙️ Settings
        </motion.button>
      </motion.div>

      {/* Stats Bar */}
      {stats.totalGamesPlayed > 0 && (
        <motion.div
          className="stats-bar"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="stat-item">
            <span className="stat-label">Games</span>
            <span className="stat-value">{stats.totalGamesPlayed}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Wins</span>
            <span className="stat-value win">{stats.totalWins}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Losses</span>
            <span className="stat-value lose">{stats.totalLosses}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">🔥 Streak</span>
            <span className="stat-value streak">{stats.winStreak}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">⭐ Best</span>
            <span className="stat-value streak">{stats.bestStreak || 0}</span>
          </div>
        </motion.div>
      )}

      {/* Keyboard hint */}
      <motion.div
        className="keyboard-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5 }}
      >
        Press <kbd>R</kbd> Rock · <kbd>P</kbd> Paper · <kbd>S</kbd> Scissors
      </motion.div>
    </motion.div>
  );
};

export default HomeScreen;
