import { create } from "zustand";

export type GamePhase = "playing" | "gameOver" | "completed";

interface GameState {
  gamePhase: GamePhase;
  lives: number;
  level: number;

  // Actions
  loseLife: () => void;
  completeLevel: () => void;
  nextLevel: () => void;
  resetGame: () => void;
  setGamePhase: (phase: GamePhase) => void;
}

export const useGameState = create<GameState>((set, get) => ({
  gamePhase: "playing",
  lives: 4,
  level: 1,

  loseLife: () => {
    const currentLives = get().lives;
    const newLives = currentLives - 1;

    if (newLives <= 0) {
      set({lives: 0, gamePhase: "gameOver"});
    } else {
      set({lives: newLives});
    }
  },

  completeLevel: () => {
    set({gamePhase: "completed"});
  },

  nextLevel: () => {
    const currentLevel = get().level;
    set({level: currentLevel + 1});
  },

  resetGame: () => {
    set({
      gamePhase: "playing",
      lives: 4,
      level: 1
    });
  },

  setGamePhase: (phase: GamePhase) => {
    set({gamePhase: phase});
  }
}));
