import React, { useState } from 'react'
import { LogOut, ArrowRight } from 'lucide-react'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

interface FeedbackActionsProps {
  score: number
  username: string
  level: number
  onClose: () => void
  onFinish: () => void
}

// Initialize DynamoDB clients
const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY as string
  }
})
const docClient = DynamoDBDocumentClient.from(client)

const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const createUniqueUserId = (username: string): string => {
  const randomNum = generateRandomNumber(1000, 9999)
  return `${username}-${randomNum}`
}

export const FeedbackActions: React.FC<FeedbackActionsProps> = ({
  score,
  username,
  level,
  onClose,
  onFinish
}) => {
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFinishGame = async () => {
    // Validate required fields
    if (!username || username.trim() === '') {
      console.error('Username is missing')
      setError('Username is required')
      return
    }

    if (typeof level !== 'number' || level < 0) {
      console.error('Invalid level')
      setError('Invalid level')
      return
    }

    // Prevent double submission
    if (isSaving) {
      return
    }

    setIsSaving(true)
    try {
      const uniqueUserId = createUniqueUserId(username)

      // Log the data being saved
      console.log('Saving data:', {
        userId: uniqueUserId,
        username,
        score,
        level
      })

      const command = new PutCommand({
        TableName: 'Players',
        Item: {
          userId: uniqueUserId,
          username: username.trim(),
          score: score,
          level: level,
          createdAt: new Date().toISOString()
        }
      })

      await docClient.send(command)
      console.log('Score saved successfully')
      onFinish() // Navigate to LeaderboardScreen
    } catch (error) {
      console.error('Error saving score:', error)
      setError('Failed to save score. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className='flex flex-col w-full gap-3 mt-4'>
      {error && (
        <div className='text-red-400 text-sm text-center mb-2'>{error}</div>
      )}
      <button
        onClick={onClose}
        className='flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-all'
        disabled={isSaving}
      >
        <ArrowRight className='w-5 h-5' />
        Continue Game
      </button>
      <button
        onClick={handleFinishGame}
        disabled={isSaving || !username || !level} // Disable if required fields are missing
        className='flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50'
      >
        {isSaving ? (
          <span className='animate-spin'>⏳</span>
        ) : (
          <LogOut className='w-5 h-5' />
        )}
        {isSaving ? 'Saving...' : 'Finish Game'}
      </button>
    </div>
  )
}
