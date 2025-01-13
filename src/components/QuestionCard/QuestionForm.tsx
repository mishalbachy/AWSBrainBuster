import React, { useState } from 'react';
import { QuestionHint } from './QuestionHint';
import { HelpCircle } from 'lucide-react';
import type { Question } from '../../types/game';

interface QuestionFormProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [visibleHints, setVisibleHints] = useState<number[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAnswer) {
      onAnswer(selectedAnswer);
      setSelectedAnswer('');
      setVisibleHints([]);
    }
  };

  const showNextHint = () => {
    const nextHintIndex = visibleHints.length;
    if (nextHintIndex < question.hints.length) {
      setVisibleHints(prev => [...prev, nextHintIndex]);
    }
  };

  const isHintButtonDisabled = visibleHints.length >= question.hints.length;

  return (
    <div className="space-y-6">
      {visibleHints.length > 0 && (
        <div className="space-y-3">
          {visibleHints.map((hintIndex) => (
            <QuestionHint 
              key={hintIndex}
              hint={question.hints[hintIndex]} 
              hintNumber={hintIndex + 1} 
            />
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <p className="text-xl font-medium text-indigo-100">
            Which AWS service is this?
          </p>
          <div className="space-y-3">
            {question.options.map((option) => (
              <label
                key={option}
                className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                  selectedAnswer === option
                    ? 'bg-orange-500/20 border-orange-500/50'
                    : 'bg-indigo-700/30 border-indigo-600/30 hover:bg-indigo-700/50'
                } border`}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500 bg-indigo-900 border-indigo-600"
                />
                <span className={`ml-3 ${
                  selectedAnswer === option ? 'text-orange-200' : 'text-indigo-200'
                }`}>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={!selectedAnswer}
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-orange-500 disabled:hover:to-orange-600"
          >
            Check
          </button>
          <button
            type="button"
            onClick={showNextHint}
            disabled={isHintButtonDisabled}
            className={`flex-1 flex items-center justify-center gap-2 ${
              isHintButtonDisabled 
                ? 'bg-indigo-800/30 text-indigo-400 cursor-not-allowed'
                : 'bg-indigo-700/30 text-indigo-200 hover:bg-indigo-700/50'
            } px-6 py-3 rounded-lg font-medium transition-all`}
          >
            <HelpCircle className="w-5 h-5" />
            {isHintButtonDisabled ? 'No More Hints' : 'Need a Hint?'}
          </button>
        </div>
      </form>
    </div>
  );
};