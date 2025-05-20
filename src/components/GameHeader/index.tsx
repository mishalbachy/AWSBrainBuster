import React from 'react';
import { ScoreDisplay } from './ScoreDisplay';
import { LevelDisplay } from './LevelDisplay';
import { WelcomeMessage } from './WelcomeMessage';
import benextLogo from '../../assets/images/benext.jpeg';

interface GameHeaderProps {
  score: number;
  level: number;
  playerName: string;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  score,
  level,
  playerName
}) => {
  return (
    <div className="bg-benext-navy p-6 rounded-xl shadow-lg mb-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img 
            src={benextLogo} 
            alt="BeNext Logo" 
            className="h-12 object-contain"
          />
          <WelcomeMessage playerName={playerName} />
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-bold text-benext-orange">
            AWS Brain Buster
          </h1>
        </div>

        <div className="flex gap-6">
          <LevelDisplay level={level} />
          <ScoreDisplay score={score} />
        </div>
      </div>
    </div>
  );
};

export default GameHeader;