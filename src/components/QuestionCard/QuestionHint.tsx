import React from 'react';
import { HelpCircle } from 'lucide-react';

interface QuestionHintProps {
  hint: string;
  hintNumber: number;
}

export const QuestionHint: React.FC<QuestionHintProps> = ({ hint, hintNumber }) => {
  return (
    <div className="bg-benext-blue bg-opacity-10 border border-benext-blue/30 p-4 rounded-lg">
      <div className="flex items-start gap-3">
        <HelpCircle className="text-benext-orange h-5 w-5 mt-1 flex-shrink-0" />
        <div>
          <p className="font-medium text-benext-orange">Hint {hintNumber}:</p>
          <p className="text-benext-gray">{hint}</p>
        </div>
      </div>
    </div>
  );
};