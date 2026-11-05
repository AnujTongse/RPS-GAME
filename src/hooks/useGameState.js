import { useState, useCallback, useRef } from 'react';
import { getComputerChoice, determineWinner } from '../utils/gameLogic';

const INITIAL_STATE = {
  screen: 'home', // 'home', 'game', 'result'
  playerScore: 0,
  computerScore: 0,
  round: 1,
  playerChoice: null,
  computerChoice: null,
  roundResult: null,
  matchResult: null,
  isAnimating: false,
  countdown: null,
  showRoundResult: false,
  winStreak: 0,
  totalGamesPlayed: 0,
  totalWins: 0,
  totalLosses: 0,
  totalDraws: 0,
};

export const useGameState = () => {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('rps-stats');
    const stats = saved ? JSON.parse(saved) : {};
    return {
      ...INITIAL_STATE,
      winStreak: stats.winStreak || 0,
      bestStreak: stats.bestStreak || 0,
      totalGamesPlayed: stats.totalGamesPlayed || 0,
      totalWins: stats.totalWins || 0,
      totalLosses: stats.totalLosses || 0,
      totalDraws: stats.totalDraws || 0,
    };
  });

  const isProcessingRef = useRef(false);

  const saveStats = useCallback((newStats) => {
    localStorage.setItem('rps-stats', JSON.stringify({
      winStreak: newStats.winStreak,
      bestStreak: newStats.bestStreak,
      totalGamesPlayed: newStats.totalGamesPlayed,
      totalWins: newStats.totalWins,
      totalLosses: newStats.totalLosses,
      totalDraws: newStats.totalDraws,
    }));
  }, []);

  const startGame = useCallback(() => {
    setState(prev => ({
      ...prev,
      screen: 'game',
      playerScore: 0,
      computerScore: 0,
      round: 1,
      playerChoice: null,
      computerChoice: null,
      roundResult: null,
      matchResult: null,
      isAnimating: false,
      countdown: null,
      showRoundResult: false,
    }));
  }, []);

  const goHome = useCallback(() => {
    setState(prev => ({
      ...prev,
      screen: 'home',
      playerScore: 0,
      computerScore: 0,
      round: 1,
      playerChoice: null,
      computerChoice: null,
      roundResult: null,
      matchResult: null,
      isAnimating: false,
      countdown: null,
      showRoundResult: false,
    }));
  }, []);

  const makeChoice = useCallback((playerChoice) => {
    if (isProcessingRef.current) return;
    if (state.isAnimating || state.matchResult) return;
    
    isProcessingRef.current = true;
    const computerChoice = getComputerChoice();
    
    setState(prev => ({
      ...prev,
      isAnimating: true,
      playerChoice,
      computerChoice,
      countdown: 3,
      showRoundResult: false,
      roundResult: null,
    }));

    // Countdown: 3
    setTimeout(() => {
      setState(prev => ({ ...prev, countdown: 2 }));
    }, 700);

    // Countdown: 2
    setTimeout(() => {
      setState(prev => ({ ...prev, countdown: 1 }));
    }, 1400);

    // SHOOT!
    setTimeout(() => {
      setState(prev => ({ ...prev, countdown: 'SHOOT!' }));
    }, 2100);

    // Reveal
    setTimeout(() => {
      const result = determineWinner(playerChoice, computerChoice);
      
      setState(prev => {
        let newPlayerScore = prev.playerScore;
        let newComputerScore = prev.computerScore;
        let newWinStreak = prev.winStreak;
        let newBestStreak = prev.bestStreak || 0;
        let newTotalWins = prev.totalWins;
        let newTotalLosses = prev.totalLosses;
        let newTotalDraws = prev.totalDraws;
        let newTotalGamesPlayed = prev.totalGamesPlayed;
        let matchResult = null;

        if (result === 'player') {
          newPlayerScore += 1;
        } else if (result === 'computer') {
          newComputerScore += 1;
        }

        // Check match end (best of 3 = first to 2)
        if (newPlayerScore >= 2) {
          matchResult = 'player';
          newWinStreak += 1;
          newBestStreak = Math.max(newBestStreak, newWinStreak);
          newTotalWins += 1;
          newTotalGamesPlayed += 1;
        } else if (newComputerScore >= 2) {
          matchResult = 'computer';
          newWinStreak = 0;
          newTotalLosses += 1;
          newTotalGamesPlayed += 1;
        }

        if (result === 'draw') {
          newTotalDraws += 1;
        }

        const newState = {
          ...prev,
          playerScore: newPlayerScore,
          computerScore: newComputerScore,
          roundResult: result,
          matchResult,
          countdown: null,
          showRoundResult: true,
          isAnimating: false,
          winStreak: newWinStreak,
          bestStreak: newBestStreak,
          totalWins: newTotalWins,
          totalLosses: newTotalLosses,
          totalDraws: newTotalDraws,
          totalGamesPlayed: newTotalGamesPlayed,
        };

        if (matchResult) {
          saveStats(newState);
        }

        return newState;
      });

      isProcessingRef.current = false;
    }, 2800);
  }, [state.isAnimating, state.matchResult, saveStats]);

  const nextRound = useCallback(() => {
    setState(prev => ({
      ...prev,
      round: prev.round + 1,
      playerChoice: null,
      computerChoice: null,
      roundResult: null,
      isAnimating: false,
      countdown: null,
      showRoundResult: false,
    }));
  }, []);

  const showResult = useCallback(() => {
    setState(prev => ({
      ...prev,
      screen: 'result',
    }));
  }, []);

  const playAgain = useCallback(() => {
    setState(prev => ({
      ...prev,
      screen: 'game',
      playerScore: 0,
      computerScore: 0,
      round: 1,
      playerChoice: null,
      computerChoice: null,
      roundResult: null,
      matchResult: null,
      isAnimating: false,
      countdown: null,
      showRoundResult: false,
    }));
  }, []);

  return {
    state,
    startGame,
    goHome,
    makeChoice,
    nextRound,
    showResult,
    playAgain,
  };
};
