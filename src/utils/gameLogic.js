// Game Logic - Separated from UI
export const CHOICES = ['rock', 'paper', 'scissors'];

export const CHOICE_LABELS = {
  rock: 'Rock',
  paper: 'Paper',
  scissors: 'Scissors',
};

export const WIN_MAP = {
  rock: 'scissors',
  scissors: 'paper',
  paper: 'rock',
};

export const getComputerChoice = () => {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
};

export const determineWinner = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice) return 'draw';
  if (WIN_MAP[playerChoice] === computerChoice) return 'player';
  return 'computer';
};

export const DEFEAT_MESSAGES = [
  "Bro, Skill Issue 💀",
  "Computer ne aukaat dikha di!",
  "AI is built different!",
  "Revenge loading...",
  "Better luck next time, noob! 🤡",
  "You got absolutely destroyed! 💀",
  "Git gud, scrub!",
  "The AI sends its regards 🤖",
  "Error 404: Your skills not found!",
  "Task failed successfully! 😂",
];

export const VICTORY_MESSAGES = [
  "YOU ARE THE CHAMPION! 🏆",
  "Absolute Legend! 👑",
  "The AI bows before you! 🫡",
  "GG EZ! No sweat! 😎",
  "Human superiority confirmed! 💪",
];

export const getRandomDefeatMessage = () => {
  return DEFEAT_MESSAGES[Math.floor(Math.random() * DEFEAT_MESSAGES.length)];
};

export const getRandomVictoryMessage = () => {
  return VICTORY_MESSAGES[Math.floor(Math.random() * VICTORY_MESSAGES.length)];
};
