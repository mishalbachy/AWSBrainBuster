import React, { useState } from 'react'
import GameHeader from '../GameHeader'
import QuestionCard from '../QuestionCard'
import { FeedbackModal } from '../FeedbackModal'
import type { GameState } from '../../types/game'
import { questions } from '../../data/questions'

interface GameScreenProps {
  onFinish: (score: number, level: number) => void
  playerName: string
}

const GameScreen: React.FC<GameScreenProps> = ({ onFinish, playerName }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentScore: 100,
    currentLevel: 1,
    questions: questions,
    currentQuestion: questions[0],
    isGameOver: false
  })

  const [showFeedback, setShowFeedback] = useState(false)
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false)

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === gameState.currentQuestion?.serviceName
    setLastAnswerCorrect(isCorrect)
    setShowFeedback(true)

    setGameState(prev => {
      const newLevel = isCorrect ? prev.currentLevel + 1 : prev.currentLevel
      const newScore = isCorrect
        ? prev.currentScore + 50
        : Math.max(0, prev.currentScore - 25)
      const nextQuestion = questions[newLevel - 1]

      return {
        ...prev,
        currentScore: newScore,
        currentLevel: newLevel,
        currentQuestion: nextQuestion || null,
        isGameOver: !nextQuestion
      }
    })
  }

  const handleCloseFeedback = () => {
    setShowFeedback(false)
    if (gameState.isGameOver) {
      onFinish(gameState.currentScore, gameState.currentLevel)
    }
  }

  const handleFinishGame = () => {
    onFinish(gameState.currentScore, gameState.currentLevel)
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <GameHeader
        score={gameState.currentScore}
        level={gameState.currentLevel}
        playerName={playerName}
      />

      {gameState.currentQuestion && (
        <QuestionCard
          question={gameState.currentQuestion}
          onAnswer={handleAnswer}
        />
      )}

      {showFeedback && (
        <FeedbackModal
          isCorrect={lastAnswerCorrect}
          username={playerName}
          level={gameState.currentLevel}
          onClose={handleCloseFeedback}
          onFinish={handleFinishGame}
          score={gameState.currentScore}
        />
      )}
    </div>
  )
}

export default GameScreen
