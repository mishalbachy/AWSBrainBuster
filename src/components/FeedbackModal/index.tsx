// FeedbackModal/index.tsx
import React from 'react'
import { FeedbackContent } from './FeedbackContent'
import { FeedbackActions } from './FeedbackActions'

interface FeedbackModalProps {
  isCorrect: boolean
  level: number
  score: number
  username: string // Add username to props
  onClose: () => void
  onFinish: () => void
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isCorrect,
  level,
  score,
  username, // Add username to destructuring
  onClose,
  onFinish
}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/50'>
      <div
        className={`transform transition-all ${
          isCorrect
            ? 'bg-gradient-to-r from-green-500/90 to-green-600/90'
            : 'bg-gradient-to-r from-red-500/90 to-red-600/90'
        } rounded-xl p-6 shadow-xl border border-white/10 max-w-md w-full mx-4`}
      >
        <div className='flex flex-col items-center text-center space-y-4'>
          <FeedbackContent isCorrect={isCorrect} level={level} />
          <FeedbackActions
            score={score}
            username={username} // Pass username to FeedbackActions
            level={level}
            onClose={onClose}
            onFinish={onFinish}
          />
        </div>
      </div>
    </div>
  )
}
