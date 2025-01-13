import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface FeedbackContentProps {
  isCorrect: boolean;
  level: number;
}

export const FeedbackContent: React.FC<FeedbackContentProps> = ({ isCorrect, level }) => {
  return isCorrect ? (
    <>
      <CheckCircle2 className="w-16 h-16 text-white" />
      <h2 className="text-2xl font-bold text-white">Excellent!</h2>
      <p className="text-white/90">
        You've advanced to Level {level}! Keep up the great work!
      </p>
    </>
  ) : (
    <>
      <XCircle className="w-16 h-16 text-white" />
      <h2 className="text-2xl font-bold text-white">Not Quite Right</h2>
      <p className="text-white/90">
        Don't worry! Every attempt helps you learn. Try again!
      </p>
    </>
  );
};