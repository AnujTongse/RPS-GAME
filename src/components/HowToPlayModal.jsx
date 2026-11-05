import { motion, AnimatePresence } from 'framer-motion';

const HowToPlayModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: 'spring', stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="modal-title">📖 How to Play</h2>

          <div className="rules-section">
            <h3>🎯 Game Rules</h3>
            <div className="rule-items">
              <div className="rule-item">
                <span className="rule-icon">✊</span>
                <span className="rule-text">Rock beats Scissors</span>
                <span className="rule-icon">✌️</span>
              </div>
              <div className="rule-item">
                <span className="rule-icon">✌️</span>
                <span className="rule-text">Scissors beats Paper</span>
                <span className="rule-icon">✋</span>
              </div>
              <div className="rule-item">
                <span className="rule-icon">✋</span>
                <span className="rule-text">Paper beats Rock</span>
                <span className="rule-icon">✊</span>
              </div>
            </div>
          </div>

          <div className="rules-section">
            <h3>🏆 Best of 3</h3>
            <p>First to win <strong>2 rounds</strong> wins the match!</p>
            <p>Draws don't count — keep playing until someone wins!</p>
          </div>

          <div className="rules-section">
            <h3>⌨️ Keyboard Shortcuts</h3>
            <div className="shortcuts">
              <div className="shortcut">
                <kbd>R</kbd> Rock
              </div>
              <div className="shortcut">
                <kbd>P</kbd> Paper
              </div>
              <div className="shortcut">
                <kbd>S</kbd> Scissors
              </div>
            </div>
          </div>

          <motion.button
            className="modal-close-btn"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Got it! ✨
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HowToPlayModal;

