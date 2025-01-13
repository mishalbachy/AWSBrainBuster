import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import PlayerNameModal from './components/PlayerNameModal';

type Screen = 'start' | 'game' | 'leaderboard';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start');
  const [showPlayerNameModal, setShowPlayerNameModal] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [currentScore, setCurrentScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);

  const handleStartGame = () => setShowPlayerNameModal(true);
  const handleShowLeaderboard = () => setCurrentScreen('leaderboard');
  const handleBackToStart = () => {
    setCurrentScreen('start');
    setCurrentPlayer('');
    setCurrentScore(0);
    setCurrentLevel(1);
  };
  const handleExitGame = () => window.close();

  const handlePlayerNameSubmit = (playerName: string) => {
    setCurrentPlayer(playerName);
    setShowPlayerNameModal(false);
    setCurrentScreen('game');
  };

  const handleGameFinish = (score: number, level: number) => {
    setCurrentScore(score);
    setCurrentLevel(level);
    setCurrentScreen('leaderboard');
  };

  return (
    <div className="min-h-screen bg-indigo-950">
      {currentScreen === 'start' && (
        <StartScreen 
          onStartGame={handleStartGame}
          onExitGame={handleExitGame}
          onShowLeaderboard={handleShowLeaderboard}
        />
      )}
      {currentScreen === 'game' && (
        <GameScreen 
          onFinish={handleGameFinish}
          playerName={currentPlayer}
        />
      )}
      {currentScreen === 'leaderboard' && (
        <LeaderboardScreen 
          onBackToStart={handleBackToStart}
          currentEntry={currentPlayer ? {
            username: currentPlayer,
            score: currentScore,
            level: currentLevel
          } : undefined}
        />
      )}
      {showPlayerNameModal && (
        <PlayerNameModal onSubmit={handlePlayerNameSubmit} />
      )}
    </div>
  );
}

export default App;