import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface PlayerNameModalProps {
  onSubmit: (playerName: string) => void;
}

const PlayerNameModal: React.FC<PlayerNameModalProps> = ({ onSubmit }) => {
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }

    if (playerName.length < 3) {
      setError('Name must be at least 3 characters long');
      return;
    }

    onSubmit(playerName.trim());
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-benext-navy rounded-xl p-8 shadow-xl border border-benext-blue/20 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-benext-orange mb-6 text-center">Enter Your Name</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={playerName}
              onChange={(e) => {
                setPlayerName(e.target.value);
                setError('');
              }}
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-benext-blue/30 text-benext-gray placeholder-benext-gray/50 focus:outline-none focus:ring-2 focus:ring-benext-orange"
              maxLength={20}
            />
            {error && (
              <p className="text-red-400 text-sm mt-2">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-benext-orange text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all"
          >
            <Play className="w-5 h-5" />
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlayerNameModal;