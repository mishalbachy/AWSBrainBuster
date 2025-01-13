import React from 'react';
import { Trophy } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  return (
    <div className="bg-indigo-800/50 px-6 py-3 rounded-lg border border-indigo-600/20 flex items-center gap-3">
      <Trophy className="text-orange-400 h-7 w-7" />
      <div>
        <p className="text-indigo-200 text-sm font-medium">Score</p>
        <p className="text-orange-400 font-bold text-2xl">{score}</p>
      </div>
    </div>
  );
};