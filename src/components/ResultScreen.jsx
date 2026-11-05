import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from './Confetti';
import { getRandomDefeatMessage, getRandomVictoryMessage } from '../utils/gameLogic';

const ResultScreen = ({
  matchResult,
  playerScore,
  computerScore,
  onPlayAgain,
  onGoHome,
  playSound,
  stats,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [defeatMsg] = useState(getRandomDefeatMessage);
  const [victoryMsg] = useState(getRandomVictoryMessage);
  const isWin = matchResult === 'player';

  useEffect(() => {
    if (isWin) {
      playSound('victory');
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(timer);
    } else {
      playSound('defeat');
    }
  }, [isWin, playSound]);

  return (
    <motion.div
      className="result-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Confetti isActive={showConfetti} />

      {isWin ? (
        <motion.div
          className="result-content victory"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          {/* Trophy */}
          <motion.div
            className="trophy"
            animate={{
              rotate: [-5, 5, -5],
              y: [0, -10, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🏆
          </motion.div>

          <motion.h1
            className="result-title victory-title"
            animate={{
              textShadow: [
                '0 0 20px rgba(255,215,0,0.5)',
                '0 0 40px rgba(255,215,0,0.8)',
                '0 0 20px rgba(255,215,0,0.5)',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            YOU ARE THE CHAMPION!
          </motion.h1>

          <motion.p
            className="result-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {victoryMsg}
          </motion.p>

          {/* Score Display */}
          <motion.div
            className="final-score"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="final-score-player">
              <span className="fs-label">YOU</span>
              <span className="fs-value win">{playerScore}</span>
            </div>
            <span className="fs-dash">—</span>
            <div className="final-score-computer">
              <span className="fs-value lose">{computerScore}</span>
              <span className="fs-label">CPU</span>
            </div>
          </motion.div>

          {/* Win Streak */}
          {stats.winStreak > 1 && (
            <motion.div
              className="streak-display"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              🔥 {stats.winStreak} Win Streak!
            </motion.div>
          )}
        </motion.div>
      ) : (
        <motion.div
          className="result-content defeat"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          {/* Skull */}
          <motion.div
            className="defeat-emoji"
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            💀
          </motion.div>

          <motion.h1
            className="result-title defeat-title"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring' }}
          >
            OOPS! YOU LOST!
          </motion.h1>

          <motion.p
            className="defeat-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, type: 'spring' }}
          >
            {defeatMsg}
          </motion.p>

          {/* Score Display */}
          <motion.div
            className="final-score"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="final-score-player">
              <span className="fs-label">YOU</span>
              <span className="fs-value lose">{playerScore}</span>
            </div>
            <span className="fs-dash">—</span>
            <div className="final-score-computer">
              <span className="fs-value win">{computerScore}</span>
              <span className="fs-label">CPU</span>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        className="result-buttons"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <motion.button
          className="play-again-btn"
          onClick={onPlayAgain}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          🔄 PLAY AGAIN
        </motion.button>
        <motion.button
          className="home-btn"
          onClick={onGoHome}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          🏠 MAIN MENU
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ResultScreen;

