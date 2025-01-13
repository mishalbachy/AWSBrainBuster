import React from 'react';
import { User } from 'lucide-react';

interface PlayerInfoProps {
  playerName: string;
}

export const PlayerInfo: React.FC<PlayerInfoProps> = ({ playerName }) => {
  return (
    <div className="flex items-center gap-2 bg-indigo-800/50 px-4 py-2 rounded-lg border border-indigo-600/20">
      <User className="text-orange-400 h-5 w-5" />
      <span className="text-indigo-200">{playerName}</span>
    </div>
  );
};