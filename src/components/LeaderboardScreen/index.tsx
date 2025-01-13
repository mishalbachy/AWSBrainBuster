import React, { useEffect, useState } from 'react'
import { Trophy, ArrowLeft, Medal } from 'lucide-react'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb'

interface LeaderboardEntry {
  userId: string
  username: string
  score: number
  level: number
}

interface LeaderboardScreenProps {
  onBackToStart: () => void
  currentEntry?: LeaderboardEntry
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

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  onBackToStart,
  currentEntry
}) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        // Using Scan instead of Query
        const command = new ScanCommand({
          TableName: 'Players',
          Limit: 100 // Limit to top 100 players
        })

        const response = await docClient.send(command)

        if (response.Items) {
          const formattedData: LeaderboardEntry[] = response.Items.map(
            item => ({
              userId: item.userId,
              username: item.username,
              score: item.score,
              level: item.level
            })
          )

          // Sort by score in descending order
          formattedData.sort((a, b) => b.score - a.score)
          setLeaderboardData(formattedData)
        }
      } catch (err) {
        setError('Failed to fetch leaderboard data')
        console.error('Error fetching leaderboard data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeaderboardData()
  }, [])

  // Combine current entry with leaderboard data if it exists
  const allEntries = currentEntry
    ? [...leaderboardData, currentEntry].sort((a, b) => b.score - a.score)
    : leaderboardData

  if (isLoading) {
    return (
      <div className='min-h-screen bg-indigo-950 p-6 flex items-center justify-center'>
        <div className='text-indigo-200'>
          <Trophy className='w-8 h-8 animate-pulse mx-auto mb-4' />
          <p>Loading leaderboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen bg-indigo-950 p-6 flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-red-400 mb-4'>{error}</p>
          <button
            onClick={onBackToStart}
            className='text-indigo-200 hover:text-orange-400 transition-colors'
          >
            Return to Start
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-indigo-950 p-6'>
      <div className='max-w-2xl mx-auto'>
        <button
          onClick={onBackToStart}
          className='flex items-center gap-2 text-indigo-200 hover:text-orange-400 transition-colors mb-8'
        >
          <ArrowLeft className='w-5 h-5' />
          Back to Start
        </button>

        <div className='bg-gradient-to-b from-indigo-800/50 to-indigo-900/50 rounded-xl p-6 shadow-lg border border-indigo-600/20'>
          <div className='flex items-center gap-3 mb-8'>
            <Trophy className='w-8 h-8 text-orange-400' />
            <h1 className='text-3xl font-modak text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600'>
              Leaderboard
            </h1>
          </div>

          {allEntries.length === 0 ? (
            <div className='text-center text-indigo-300 py-8'>
              No scores recorded yet. Be the first to play!
            </div>
          ) : (
            <div className='space-y-4'>
              {allEntries.map((entry, index) => (
                <div
                  key={`${entry.userId}-${entry.score}`}
                  className={`flex items-center gap-4 ${
                    currentEntry?.userId === entry.userId
                      ? 'bg-orange-500/20 border-orange-500/50'
                      : 'bg-indigo-800/30 border-indigo-600/20'
                  } p-4 rounded-lg border transition-colors duration-300`}
                >
                  <div className='flex-shrink-0 w-8 text-center'>
                    {index === 0 && (
                      <Medal className='w-6 h-6 text-yellow-400' />
                    )}
                    {index === 1 && <Medal className='w-6 h-6 text-gray-400' />}
                    {index === 2 && (
                      <Medal className='w-6 h-6 text-orange-700' />
                    )}
                    {index > 2 && (
                      <span className='text-indigo-200'>{index + 1}</span>
                    )}
                  </div>
                  <div className='flex-grow'>
                    <h3 className='text-orange-200 font-semibold'>
                      {entry.username}
                    </h3>
                    <p className='text-indigo-300 text-sm'>
                      Level {entry.level}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='text-orange-400 font-bold text-xl'>
                      {entry.score}
                    </p>
                    <p className='text-indigo-400 text-sm'>points</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LeaderboardScreen
