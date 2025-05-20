import React from 'react';
import { QuestionForm } from './QuestionForm';
import type { Question } from '../../types/game';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  return (
    <div className="bg-benext-navy rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      <div className="flex justify-center mb-8">
        <div className="bg-white p-6 rounded-xl">
          <img 
            src={question.logoUrl} 
            alt="AWS Service Logo" 
            className="h-24 w-24 object-contain"
          />
        </div>
      </div>
      <QuestionForm question={question} onAnswer={onAnswer} />
    </div>
  );
};

export default QuestionCard;