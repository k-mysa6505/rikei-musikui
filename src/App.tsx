import React, { useState } from 'react';
import { GameState } from './types/index';
import TitleScreen from './components/TitleScreen';
import HowToPlayScreen from './components/HowToPlayScreen';
import CountdownScreen from './components/CountdownScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<GameState>(GameState.TITLE);

  const renderScreen = () => {
    switch (currentScreen) {
    case GameState.TITLE:
      return <TitleScreen
        onPlay={() => setCurrentScreen(GameState.HOW_TO_PLAY)}
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
        onComplete={() => setCurrentScreen(GameState.RESULTS)}
      />;
    case GameState.RESULTS:
      return <ResultScreen
        onTitle={() => setCurrentScreen(GameState.TITLE)}
        onReplay={() => setCurrentScreen(GameState.COUNT_DOWN)}
      />;
    default:
      return null;
    }
  }

  return <div>{ renderScreen() }</div>;
}

export default App;
