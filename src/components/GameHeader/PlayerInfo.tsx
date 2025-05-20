import React from 'react';
import { User } from 'lucide-react';

interface PlayerInfoProps {
  playerName: string;
}

export const PlayerInfo: React.FC<PlayerInfoProps> = ({ playerName }) => {
  return (
    <div className="flex items-center gap-2 bg-benext-blue bg-opacity-10 px-4 py-2 rounded-lg border border-benext-blue/30">
      <User className="text-benext-orange h-5 w-5" />
      <span className="text-benext-gray">{playerName}</span>
    </div>
  );
};