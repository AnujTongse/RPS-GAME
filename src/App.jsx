import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGameState } from './hooks/useGameState';
import { useAudio } from './hooks/useAudio';
import HomeScreen from './components/HomeScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import HowToPlayModal from './components/HowToPlayModal';
import SettingsModal from './components/SettingsModal';
import Particles from './components/Particles';
import './styles/App.css';

function App() {
  const {
    state,
    startGame,
    goHome,
    makeChoice,
    nextRound,
    showResult,
    playAgain,
  } = useGameState();

  const {
    soundEnabled,
    musicEnabled,
    initAudio,
    playSound,
    startBGM,
    stopBGM,
    toggleSound,
    toggleMusic,
  } = useAudio();

  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleStartGame = useCallback(() => {
    initAudio();
    playSound('click');
    startBGM();
    startGame();
  }, [initAudio, playSound, startBGM, startGame]);

  const handleGoHome = useCallback(() => {
    playSound('click');
    stopBGM();
    goHome();
  }, [playSound, stopBGM, goHome]);

  const handlePlayAgain = useCallback(() => {
    initAudio();
    playSound('click');
    startBGM();
    playAgain();
  }, [initAudio, playSound, startBGM, playAgain]);

  const handleShowResult = useCallback(() => {
    stopBGM();
    showResult();
  }, [stopBGM, showResult]);

  const stats = {
    totalGamesPlayed: state.totalGamesPlayed,
    totalWins: state.totalWins,
    totalLosses: state.totalLosses,
    totalDraws: state.totalDraws,
    winStreak: state.winStreak,
    bestStreak: state.bestStreak,
  };

  return (
    <div className="app-container">
      <Particles />

      {/* Audio Controls */}
      <div className="audio-controls">
        <button
          className={`audio-btn ${!soundEnabled ? 'muted' : ''}`}
          onClick={() => {
            initAudio();
            toggleSound();
          }}
          title={soundEnabled ? 'Mute Sound Effects' : 'Unmute Sound Effects'}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
        <button
          className={`audio-btn ${!musicEnabled ? 'muted' : ''}`}
          onClick={() => {
            initAudio();
            toggleMusic();
          }}
          title={musicEnabled ? 'Mute Music' : 'Unmute Music'}
        >
          {musicEnabled ? '🎵' : '🎵'}
        </button>
      </div>

      {/* Screens */}
      <AnimatePresence mode="wait">
        {state.screen === 'home' && (
          <HomeScreen
            key="home"
            onStartGame={handleStartGame}
            onHowToPlay={() => {
              initAudio();
              playSound('click');
              setShowHowToPlay(true);
            }}
            onSettings={() => {
              initAudio();
              playSound('click');
              setShowSettings(true);
            }}
            stats={stats}
          />
        )}

        {state.screen === 'game' && (
          <GameScreen
            key="game"
            state={state}
            onMakeChoice={makeChoice}
            onNextRound={nextRound}
            onShowResult={handleShowResult}
            playSound={playSound}
          />
        )}

        {state.screen === 'result' && (
          <ResultScreen
            key="result"
            matchResult={state.matchResult}
            playerScore={state.playerScore}
            computerScore={state.computerScore}
            onPlayAgain={handlePlayAgain}
            onGoHome={handleGoHome}
            playSound={playSound}
            stats={stats}
          />
        )}
      </AnimatePresence>

      {/* Modals */}
      <HowToPlayModal
        isOpen={showHowToPlay}
        onClose={() => {
          playSound('click');
          setShowHowToPlay(false);
        }}
      />
      <SettingsModal
        isOpen={showSettings}
        onClose={() => {
          playSound('click');
          setShowSettings(false);
        }}
        soundEnabled={soundEnabled}
        musicEnabled={musicEnabled}
        onToggleSound={toggleSound}
        onToggleMusic={toggleMusic}
      />
    </div>
  );
}

export default App;
