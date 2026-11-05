import { useState, useRef, useCallback, useEffect } from 'react';

export const useAudio = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const audioRefs = useRef({});
  const bgmRef = useRef(null);

  const initAudio = useCallback(() => {
    if (audioInitialized) return;
    
    const soundFiles = {
      click: '/sounds/click.wav',
      countdown: '/sounds/countdown.wav',
      shoot: '/sounds/shoot.wav',
      winRound: '/sounds/win-round.wav',
      loseRound: '/sounds/lose-round.wav',
      draw: '/sounds/draw.wav',
      victory: '/sounds/victory.wav',
      defeat: '/sounds/defeat.wav',
    };

    Object.entries(soundFiles).forEach(([key, src]) => {
      const audio = new Audio(src);
      audio.preload = 'auto';
      audio.volume = 0.5;
      audioRefs.current[key] = audio;
    });

    const bgm = new Audio('/sounds/bgm.wav');
    bgm.loop = true;
    bgm.volume = 0.15;
    bgm.preload = 'auto';
    bgmRef.current = bgm;

    setAudioInitialized(true);
  }, [audioInitialized]);

  const playSound = useCallback((soundName) => {
    if (!soundEnabled || !audioRefs.current[soundName]) return;
    const audio = audioRefs.current[soundName];
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, [soundEnabled]);

  const startBGM = useCallback(() => {
    if (!musicEnabled || !bgmRef.current) return;
    bgmRef.current.play().catch(() => {});
  }, [musicEnabled]);

  const stopBGM = useCallback(() => {
    if (!bgmRef.current) return;
    bgmRef.current.pause();
    bgmRef.current.currentTime = 0;
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  const toggleMusic = useCallback(() => {
    setMusicEnabled(prev => {
      const newVal = !prev;
      if (!newVal && bgmRef.current) {
        bgmRef.current.pause();
      } else if (newVal && bgmRef.current) {
        bgmRef.current.play().catch(() => {});
      }
      return newVal;
    });
  }, []);

  useEffect(() => {
    return () => {
      stopBGM();
    };
  }, [stopBGM]);

  return {
    soundEnabled,
    musicEnabled,
    audioInitialized,
    initAudio,
    playSound,
    startBGM,
    stopBGM,
    toggleSound,
    toggleMusic,
  };
};
