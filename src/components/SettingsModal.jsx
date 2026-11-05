import { motion, AnimatePresence } from 'framer-motion';

const SettingsModal = ({
  isOpen,
  onClose,
  soundEnabled,
  musicEnabled,
  onToggleSound,
  onToggleMusic,
}) => {
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
          className="modal-content settings-modal"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: 'spring', stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="modal-title">⚙️ Settings</h2>

          <div className="settings-list">
            <div className="setting-row">
              <div className="setting-info">
                <span className="setting-icon">🔊</span>
                <span className="setting-label">Sound Effects</span>
              </div>
              <motion.button
                className={`toggle-btn ${soundEnabled ? 'active' : ''}`}
                onClick={onToggleSound}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="toggle-thumb"
                  animate={{ x: soundEnabled ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>

            <div className="setting-row">
              <div className="setting-info">
                <span className="setting-icon">🎵</span>
                <span className="setting-label">Background Music</span>
              </div>
              <motion.button
                className={`toggle-btn ${musicEnabled ? 'active' : ''}`}
                onClick={onToggleMusic}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="toggle-thumb"
                  animate={{ x: musicEnabled ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>
          </div>

          <div className="settings-info-box">
            <p>💡 Sounds will play after your first interaction with the game.</p>
          </div>

          <motion.button
            className="modal-close-btn"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Done ✅
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SettingsModal;

