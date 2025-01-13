import React from 'react';
import { Play, LogOut, Trophy } from 'lucide-react';
import SpaceElements from '../SpaceElements';

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
     <div 
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: 'linear-gradient(rgba(79, 70, 229, 0.85), rgba(45, 39, 130, 0.9)), url("https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
  
      
      <div className="relative mb-12">
        <h1 
          className="text-7xl text-center font-modak text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500"
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
        >
          AWS Brain Buster
        </h1>
        <div className="absolute -inset-1 blur-xl bg-gradient-to-r from-indigo-600/30 to-orange-600/30 -z-10"></div>
      </div>
      
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={onStartGame}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-orange-500/25"
        >
          <Play className="w-5 h-5" />
          Start Game
        </button>
        
        <button
          onClick={onShowLeaderboard}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-indigo-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-indigo-500/25"
        >
          <Trophy className="w-5 h-5" />
          Leaderboard
        </button>
        
        <button
          onClick={onExitGame}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-indigo-500/25"
        >
          <LogOut className="w-5 h-5" />
          Exit
        </button>
      </div>

      <div className="absolute bottom-8 text-center text-indigo-200 text-sm">
        <p>Test your AWS knowledge with our interactive quiz!</p>
        <p>Every Logo Tells a Story – Can You Guess Them All?</p>
      </div>
    </div>
  );
};
export default StartScreen;