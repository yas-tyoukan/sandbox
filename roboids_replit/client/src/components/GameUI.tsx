import React from "react";
import { useGameState } from "@/lib/stores/useGameState";

const GameUI: React.FC = () => {
  const { lives, level } = useGameState();

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Level indicator - top left */}
      <div className="absolute top-4 left-4 text-white text-lg font-bold bg-black bg-opacity-50 px-3 py-1 rounded">
        Level: {level}
      </div>
      
      {/* Lives counter - bottom right */}
      <div className="absolute bottom-4 right-4 text-white text-lg font-bold bg-black bg-opacity-50 px-3 py-1 rounded">
        Robots: {lives}
      </div>
      
      {/* Controls hint - bottom left */}
      <div className="absolute bottom-4 left-4 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded">
        W: Jump | A/D: Move | Space: Teleport
      </div>
    </div>
  );
};

export default GameUI;
