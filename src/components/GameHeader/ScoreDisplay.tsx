import React from 'react';
import { Trophy } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  return (
    <div className="bg-benext-blue bg-opacity-10 px-6 py-3 rounded-lg border border-benext-blue/30 flex items-center gap-3">
      <Trophy className="text-benext-orange h-7 w-7" />
      <div>
        <p className="text-benext-gray text-sm font-medium">Score</p>
        <p className="text-benext-orange font-bold text-2xl">{score}</p>
      </div>
    </div>
  );
};