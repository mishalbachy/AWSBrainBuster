import React from 'react';

interface LevelDisplayProps {
  level: number;
}

export const LevelDisplay: React.FC<LevelDisplayProps> = ({ level }) => {
  return (
    <div className="bg-indigo-800/50 px-6 py-3 rounded-lg border border-indigo-600/20">
      <p className="text-indigo-200 text-sm font-medium">Level</p>
      <p className="text-orange-400 font-bold text-2xl">{level}</p>
    </div>
  );
};