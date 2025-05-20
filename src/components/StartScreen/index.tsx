import React from 'react';
import { Play, LogOut, Trophy } from 'lucide-react';
import benextLogo from '../../assets/images/benext.jpeg';

interface StartScreenProps {
  onStartGame: () => void;
  onExitGame: () => void;
  onShowLeaderboard: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ 
  onStartGame, 
  onExitGame,
  onShowLeaderboard 
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-benext-navy">
      <div className="mb-8">
        <img 
          src={benextLogo} 
          alt="BeNext Logo" 
          className="h-24 object-contain mb-6"
        />
      </div>
      
      <div className="relative mb-12">
        <h1 
          className="text-6xl text-center font-bold text-benext-orange"
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
        >
          AWS Brain Buster
        </h1>
      </div>
      
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={onStartGame}
          className="flex items-center justify-center gap-2 bg-benext-orange text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105"
        >
          <Play className="w-5 h-5" />
          Start Game
        </button>
        
        <button
          onClick={onShowLeaderboard}
          className="flex items-center justify-center gap-2 bg-benext-blue text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105"
        >
          <Trophy className="w-5 h-5" />
          Leaderboard
        </button>
        
        <button
          onClick={onExitGame}
          className="flex items-center justify-center gap-2 bg-benext-blue text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105"
        >
          <LogOut className="w-5 h-5" />
          Exit
        </button>
      </div>

      <div className="absolute bottom-8 text-center text-benext-gray text-sm">
        <p>Test your AWS knowledge with BeNext interactive quiz!</p>
        <p>Every Logo Tells a Story – Can You Guess Them All?</p>
      </div>
    </div>
  );
};

export default StartScreen;