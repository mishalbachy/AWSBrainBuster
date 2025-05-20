import React, { useEffect, useState } from 'react';
import { Trophy, ArrowLeft, Medal } from 'lucide-react';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

interface LeaderboardEntry {
  userId: string;
  username: string;
  score: number;
  level: number;
}

interface LeaderboardScreenProps {
  onBackToStart: () => void;
  currentEntry?: {
    username: string;
    score: number;
    level: number;
  };
}

const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY as string
  }
});
const docClient = DynamoDBDocumentClient.from(client);

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  onBackToStart,
  currentEntry
}) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const command = new ScanCommand({
          TableName: 'Players',
          Limit: 100
        });

        const response = await docClient.send(command);

        if (response.Items) {
          const formattedData: LeaderboardEntry[] = response.Items.map(item => ({
            userId: item.userId,
            username: item.username,
            score: item.score,
            level: item.level
          }));

          formattedData.sort((a, b) => b.score - a.score);
          setLeaderboardData(formattedData);
        }
      } catch (err) {
        setError('Failed to fetch leaderboard data');
        console.error('Error fetching leaderboard data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  const allEntries = currentEntry
    ? [...leaderboardData, currentEntry].sort((a, b) => b.score - a.score)
    : leaderboardData;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-benext-navy p-6 flex items-center justify-center">
        <div className="text-benext-gray">
          <Trophy className="w-8 h-8 animate-pulse mx-auto mb-4" />
          <p>Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-benext-navy p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={onBackToStart}
            className="text-benext-gray hover:text-benext-orange transition-colors"
          >
            Return to Start
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-benext-navy p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBackToStart}
          className="flex items-center gap-2 text-benext-gray hover:text-benext-orange transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Start
        </button>

        <div className="bg-benext-blue bg-opacity-10 rounded-xl p-6 shadow-lg border border-benext-blue/30">
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="w-8 h-8 text-benext-orange" />
            <h1 className="text-3xl font-bold text-benext-orange">
              Leaderboard
            </h1>
          </div>

          {allEntries.length === 0 ? (
            <div className="text-center text-benext-gray py-8">
              No scores recorded yet. Be the first to play!
            </div>
          ) : (
            <div className="space-y-4">
              {allEntries.map((entry, index) => (
                <div
                  key={entry.userId || `${entry.username}-${entry.score}`}
                  className={`flex items-center gap-4 ${
                    currentEntry?.username === entry.username
                      ? 'bg-benext-orange bg-opacity-20 border-benext-orange'
                      : 'bg-benext-blue bg-opacity-10 border-benext-blue/30'
                  } p-4 rounded-lg border transition-colors duration-300`}
                >
                  <div className="flex-shrink-0 w-8 text-center">
                    {index === 0 && <Medal className="w-6 h-6 text-yellow-400" />}
                    {index === 1 && <Medal className="w-6 h-6 text-gray-400" />}
                    {index === 2 && <Medal className="w-6 h-6 text-orange-700" />}
                    {index > 2 && (
                      <span className="text-benext-gray">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-benext-orange font-semibold">
                      {entry.username}
                    </h3>
                    <p className="text-benext-gray text-sm">
                      Level {entry.level}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-benext-orange font-bold text-xl">
                      {entry.score}
                    </p>
                    <p className="text-benext-gray text-sm">points</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardScreen;