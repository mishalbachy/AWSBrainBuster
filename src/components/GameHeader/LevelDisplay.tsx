import React from 'react';

interface LevelDisplayProps {
  level: number;
}

export const LevelDisplay: React.FC<LevelDisplayProps> = ({ level }) => {
  return (
    <div className="bg-benext-blue bg-opacity-10 px-6 py-3 rounded-lg border border-benext-blue/30">
      <p className="text-benext-gray text-sm font-medium">Level</p>
      <p className="text-benext-orange font-bold text-2xl">{level}</p>
    </div>
  );
};