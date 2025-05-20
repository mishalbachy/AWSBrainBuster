import React from 'react';

interface WelcomeMessageProps {
  playerName: string;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ playerName }) => {
  return (
    <div className="flex flex-col">
      <span className="text-benext-gray text-lg">Welcome</span>
      <span className="text-3xl font-bold text-benext-orange">{playerName}</span>
    </div>
  );
};