import React from 'react';
import { QuestionForm } from './QuestionForm';
import type { Question } from '../../types/game';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  return (
    <div className="bg-gradient-to-b from-indigo-800/50 to-indigo-900/50 rounded-xl shadow-lg p-8 max-w-2xl mx-auto border border-indigo-600/20">
      <div className="flex justify-center mb-8">
        <div className="bg-white/10 p-6 rounded-xl">
          <img 
            src={question.logoUrl} 
            alt="AWS Service Logo" 
            className="h-32 w-32 object-contain"
          />
        </div>
      </div>
      <QuestionForm question={question} onAnswer={onAnswer} />
    </div>
  );
};

export default QuestionCard;