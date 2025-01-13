import React from 'react';
import { HelpCircle } from 'lucide-react';

interface QuestionHintProps {
  hint: string;
  hintNumber: number;
}

export const QuestionHint: React.FC<QuestionHintProps> = ({ hint, hintNumber }) => {
  return (
    <div className="bg-indigo-700/30 border border-indigo-600/30 p-4 rounded-lg">
      <div className="flex items-start gap-3">
        <HelpCircle className="text-orange-400 h-5 w-5 mt-1 flex-shrink-0" />
        <div>
          <p className="font-medium text-orange-200">Hint {hintNumber}:</p>
          <p className="text-indigo-200">{hint}</p>
        </div>
      </div>
    </div>
  );
};