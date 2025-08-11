import React, { useState } from 'react';
import { GameState } from './types/index'
import TitleScreen from './components/TitleScreen';
import HowToPlayScreen from './components/HowToPlayScreen';
import CountdownScreen from './components/Countdown';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<GameState>(GameState.TITLE);

  const renderScreen = () => {
    switch (currentScreen) {
    case GameState.TITLE:
      return <TitleScreen onStart={() => setCurrentScreen(GameState.HOW_TO_PLAY)} />;
    case GameState.HOW_TO_PLAY:
      return <HowToPlayScreen />;
    case GameState.COUNT_DOWN:
      return <CountdownScreen />;
    case GameState.PLAYING:
      return <GameScreen />;
    case GameState.RESULTS:
      return <ResultScreen />;
    default:
      return null;
    }
  }

  return <div>{ renderScreen() }</div>;
}

export default App;
