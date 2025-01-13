import React from 'react';

interface WelcomeMessageProps {
  playerName: string;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ playerName }) => {
  return (
    <div className="flex flex-col">
      <span className="text-indigo-200 text-lg">Welcome</span>
      <span className="text-3xl font-bold text-orange-400">{playerName}</span>
    </div>
  );
};