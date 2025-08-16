import React, { useState } from 'react';
import { GameState } from './types/index';
import { useGameLogic } from './hooks/useGameLogic';
import TitleScreen from './components/TitleScreen';
import HowToPlayScreen from './components/HowToPlayScreen';
import CountdownScreen from './components/CountdownScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<GameState>(GameState.TITLE);
  const { gameResult, initializeGame, recordQuestionResult, finalizeGame } = useGameLogic();

  const handleStartGame = () => {
    initializeGame();
    setCurrentScreen(GameState.HOW_TO_PLAY);
  };

  const handleGameComplete = () => {
    finalizeGame();
    setCurrentScreen(GameState.RESULTS);
  };

  const renderScreen = () => {
    switch (currentScreen) {
    case GameState.TITLE:
      return <TitleScreen
        onPlay={handleStartGame}
      />;
    case GameState.HOW_TO_PLAY:
      return <HowToPlayScreen
        onOK={() => setCurrentScreen(GameState.COUNT_DOWN)}
        onBack={() => setCurrentScreen(GameState.TITLE)}
      />;
    case GameState.COUNT_DOWN:
      return <CountdownScreen
        onCountdownEnd={() => setCurrentScreen(GameState.PLAYING)}
      />;
    case GameState.PLAYING:
      return <GameScreen
        onComplete={handleGameComplete}
        onRecordResult={recordQuestionResult}
        onRestart={handleStartGame}
        onBackToTitle={() => setCurrentScreen(GameState.TITLE)}
      />;
    case GameState.RESULTS:
      return <ResultScreen
        gameResult={gameResult}
        onTitle={() => setCurrentScreen(GameState.TITLE)}
        onReplay={handleStartGame}
      />;
    default:
      return null;
    }
  }

  return <div>{ renderScreen() }</div>;
}

export default App;
