import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HandGesture from './HandGesture';
import { CHOICE_LABELS } from '../utils/gameLogic';

const GameScreen = ({
  state,
  onMakeChoice,
  onNextRound,
  onShowResult,
  playSound,
}) => {
  const {
    playerScore,
    computerScore,
    round,
    playerChoice,
    computerChoice,
    roundResult,
    matchResult,
    isAnimating,
    countdown,
    showRoundResult,
  } = state;

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isAnimating || matchResult || showRoundResult) return;
      const key = e.key.toLowerCase();
      if (key === 'r') onMakeChoice('rock');
      else if (key === 'p') onMakeChoice('paper');
      else if (key === 's') onMakeChoice('scissors');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnimating, matchResult, showRoundResult, onMakeChoice]);

  // Sound effects for countdown
  useEffect(() => {
    if (countdown === 3 || countdown === 2 || countdown === 1) {
      playSound('countdown');
    } else if (countdown === 'SHOOT!') {
      playSound('shoot');
    }
  }, [countdown, playSound]);

  // Sound for round result
  useEffect(() => {
    if (!showRoundResult || !roundResult) return;
    if (roundResult === 'player') playSound('winRound');
    else if (roundResult === 'computer') playSound('loseRound');
    else playSound('draw');
  }, [showRoundResult, roundResult, playSound]);

  const handleChoice = useCallback((choice) => {
    playSound('click');
    onMakeChoice(choice);
  }, [onMakeChoice, playSound]);

  const isShaking = countdown !== null && countdown !== 'SHOOT!';
  const isRevealed = showRoundResult;

  return (
    <motion.div
      className="game-screen"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4 }}
    >
      {/* Score Board */}
      <div className="scoreboard">
        <motion.div
          className="score-card player-score-card"
          animate={showRoundResult && roundResult === 'player' ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <div className="score-avatar">🧑‍💻</div>
          <div className="score-name">YOU</div>
          <motion.div
            className="score-number"
            key={playerScore}
            initial={{ scale: 1.5, color: '#4ADE80' }}
            animate={{ scale: 1, color: '#ffffff' }}
            transition={{ duration: 0.3 }}
          >
            {playerScore}
          </motion.div>
        </motion.div>

        <div className="score-center">
          <motion.div
            className="round-badge"
            key={round}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            ROUND {round}
          </motion.div>
          <div className="vs-text">
            <motion.span
              animate={{
                color: ['#A855F7', '#EC4899', '#3B82F6', '#A855F7'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              VS
            </motion.span>
          </div>
          <div className="best-of">Best of 3</div>
        </div>

        <motion.div
          className="score-card computer-score-card"
          animate={showRoundResult && roundResult === 'computer' ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <div className="score-avatar">🤖</div>
          <div className="score-name">CPU</div>
          <motion.div
            className="score-number"
            key={computerScore}
            initial={{ scale: 1.5, color: '#F87171' }}
            animate={{ scale: 1, color: '#ffffff' }}
            transition={{ duration: 0.3 }}
          >
            {computerScore}
          </motion.div>
        </motion.div>
      </div>

      {/* Battle Arena */}
      <div className="battle-arena">
        {/* Player Hand */}
        <div className="hand-container player-hand">
          <div className="hand-label">YOU</div>
          <div className="hand-wrapper">
            {isShaking && (
              <HandGesture type="rock" size={140} isShaking={true} isPlayer={true} />
            )}
            {isRevealed && (
              <HandGesture type={playerChoice} size={140} isRevealing={true} isPlayer={true} />
            )}
            {!isShaking && !isRevealed && (
              <HandGesture type={null} size={140} isPlayer={true} />
            )}
          </div>
          {isRevealed && playerChoice && (
            <motion.div
              className="choice-label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {CHOICE_LABELS[playerChoice]}
            </motion.div>
          )}
        </div>

        {/* Center - Countdown or Result */}
        <div className="arena-center">
          <AnimatePresence mode="wait">
            {countdown !== null && (
              <motion.div
                key={countdown}
                className={`countdown ${countdown === 'SHOOT!' ? 'shoot' : ''}`}
                initial={{ scale: 2.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.3, opacity: 0 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
              >
                {countdown}
              </motion.div>
            )}

            {showRoundResult && roundResult && !matchResult && (
              <motion.div
                key="round-result"
                className={`round-result ${roundResult}`}
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {roundResult === 'player' && '🎉 YOU WIN!'}
                {roundResult === 'computer' && '😤 YOU LOSE!'}
                {roundResult === 'draw' && '🤝 DRAW!'}
              </motion.div>
            )}

            {showRoundResult && matchResult && (
              <motion.div
                key="match-result"
                className={`round-result ${matchResult === 'player' ? 'player' : 'computer'}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
              >
                {matchResult === 'player' ? '🏆 MATCH WON!' : '💀 MATCH LOST!'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Computer Hand */}
        <div className="hand-container computer-hand">
          <div className="hand-label">CPU</div>
          <div className="hand-wrapper">
            {isShaking && (
              <HandGesture type="rock" size={140} isShaking={true} isPlayer={false} />
            )}
            {isRevealed && (
              <HandGesture type={computerChoice} size={140} isRevealing={true} isPlayer={false} />
            )}
            {!isShaking && !isRevealed && (
              <HandGesture type={null} size={140} isPlayer={false} />
            )}
          </div>
          {isRevealed && computerChoice && (
            <motion.div
              className="choice-label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {CHOICE_LABELS[computerChoice]}
            </motion.div>
          )}
        </div>
      </div>

      {/* Choice Buttons */}
      <AnimatePresence>
        {!isAnimating && !matchResult && !showRoundResult && (
          <motion.div
            className="choice-buttons"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
          >
            <p className="choose-text">Choose your weapon!</p>
            <div className="buttons-row">
              {['rock', 'paper', 'scissors'].map((choice) => (
                <motion.button
                  key={choice}
                  className={`choice-btn choice-${choice}`}
                  onClick={() => handleChoice(choice)}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={isAnimating}
                >
                  <HandGesture type={choice} size={70} />
                  <span className="btn-label">{CHOICE_LABELS[choice]}</span>
                  <span className="btn-key">{choice[0].toUpperCase()}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Round / View Result Button */}
      <AnimatePresence>
        {showRoundResult && !matchResult && (
          <motion.button
            className="next-round-btn"
            onClick={() => {
              playSound('click');
              onNextRound();
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next Round ➡️
          </motion.button>
        )}

        {showRoundResult && matchResult && (
          <motion.button
            className="next-round-btn result-btn"
            onClick={() => {
              playSound('click');
              onShowResult();
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Results 🏆
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GameScreen;
