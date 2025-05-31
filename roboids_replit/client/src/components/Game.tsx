import React, { useEffect, useRef } from "react";
import GameCanvas from "./GameCanvas";
import GameUI from "./GameUI";
import { useGameState } from "@/lib/stores/useGameState";
import { useAudio } from "@/lib/stores/useAudio";

const Game: React.FC = () => {
  const { gamePhase, resetGame } = useGameState();
  const { setHitSound, setSuccessSound, setJumpSound, setTeleportSound, setLaserSound } = useAudio();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      // Initialize audio
      const hitAudio = new Audio("/sounds/hit.mp3");
      const successAudio = new Audio("/sounds/success.mp3");
      const jumpAudio = new Audio("/sounds/hit.mp3"); // Reuse hit sound for jump
      const teleportAudio = new Audio("/sounds/success.mp3"); // Reuse success sound for teleport
      const laserAudio = new Audio("/sounds/hit.mp3"); // Reuse hit sound for laser
      
      hitAudio.volume = 0.3;
      successAudio.volume = 0.5;
      jumpAudio.volume = 0.2;
      teleportAudio.volume = 0.4;
      laserAudio.volume = 0.3;
      
      setHitSound(hitAudio);
      setSuccessSound(successAudio);
      setJumpSound(jumpAudio);
      setTeleportSound(teleportAudio);
      setLaserSound(laserAudio);
      
      initialized.current = true;
    }
  }, [setHitSound, setSuccessSound, setJumpSound, setTeleportSound, setLaserSound]);

  const handleRestart = () => {
    resetGame();
  };

  return (
    <div className="relative w-full h-full bg-black">
      <GameCanvas />
      <GameUI />
      
      {gamePhase === "gameOver" && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-black">Game Over</h2>
            <button
              onClick={handleRestart}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Restart Game
            </button>
          </div>
        </div>
      )}
      
      {gamePhase === "completed" && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-black">Level Complete!</h2>
            <button
              onClick={handleRestart}
              className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
