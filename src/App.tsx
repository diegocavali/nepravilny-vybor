import React from 'react';
import { GameStateProvider } from './GameStateContext';
import StoryScreen from './components/StoryScreen';
import StatusBar from './components/StatusBar';
import EndScreen from './components/EndScreen';
import { scenes } from './story';
import { useGameState } from './GameStateContext';

// Компонент для отображения игры
const Game: React.FC = () => {
  const { currentScene, gameState } = useGameState();

  // Проверяем, является ли сцена финальной (без выборов)
  const isEndScene = currentScene && currentScene.choices.length === 0;

  return (
    <div className="App">
      <StatusBar gameState={gameState} />
      {isEndScene ? <EndScreen /> : <StoryScreen scene={currentScene} />}
    </div>
  );
};

function App() {
  // Начальное состояние игрока
 const initialState = {
    drunk: false,
    injured: false,
    mood: 'calm' as const,
    alive: true
  };

  return (
    <GameStateProvider
      initialState={initialState}
      scenes={scenes}
      startSceneId="start"
    >
      <Game />
    </GameStateProvider>
  );
}

export default App;