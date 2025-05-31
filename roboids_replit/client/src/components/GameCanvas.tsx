import React, { useRef, useEffect, useCallback } from "react";
import { GameEngine } from "@/lib/gameEngine/GameEngine";
import { useGameState } from "@/lib/stores/useGameState";

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameEngineRef = useRef<GameEngine | null>(null);
  const { gamePhase } = useGameState();

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();

    // Initialize game engine
    gameEngineRef.current = new GameEngine(canvas);
    gameEngineRef.current.start();

    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
      if (gameEngineRef.current) {
        gameEngineRef.current.handleResize();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (gameEngineRef.current) {
        gameEngineRef.current.stop();
      }
    };
  }, [resizeCanvas]);

  useEffect(() => {
    if (gameEngineRef.current && gamePhase === "playing") {
      gameEngineRef.current.reset();
    }
  }, [gamePhase]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      style={{ imageRendering: "pixelated" }}
    />
  );
};

export default GameCanvas;
