import React from 'react'
// import { Trophy } from 'lucide-react'
import { ScoreDisplay } from './ScoreDisplay'
import { LevelDisplay } from './LevelDisplay'
import { WelcomeMessage } from './WelcomeMessage'
// import { FeedbackActions } from '../FeedbackModal/FeedbackActions'

// GameHeader/index.tsx
interface GameHeaderProps {
  score: number
  level: number
  playerName: string
}

// GameHeader/index.tsx
const GameHeader: React.FC<GameHeaderProps> = ({
  score,
  level,
  playerName
}) => {
  return (
    <div className='bg-gradient-to-r from-indigo-700 to-indigo-900 p-6 rounded-xl shadow-lg mb-8 border border-indigo-600/20'>
      <div className='flex justify-between items-center'>
        <WelcomeMessage playerName={playerName} />

        <div className='text-center flex-1'>
          <h1 className='text-4xl font-modak mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600'>
            AWS Brain Buster
          </h1>
          <p className='text-indigo-200'>
            Every Logo Tells a Story – Can You Guess Them All?
          </p>
        </div>

        <div className='flex gap-6'>
          <LevelDisplay level={level} />
          <ScoreDisplay score={score} />
        </div>
      </div>
    </div>
  )
}

export default GameHeader
