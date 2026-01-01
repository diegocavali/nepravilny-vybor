import React, { useState } from 'react';
import { GameStateProvider } from './GameStateContext';
import StoryScreen from './components/StoryScreen';
import StatusBar from './components/StatusBar';
import EndScreen from './components/EndScreen';
import StoryPicker from './components/StoryPicker';
import { useGameState } from './GameStateContext';

// Компонент для отображения игры
const Game: React.FC<{ story: any }> = ({ story }) => {
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
  const [selectedStory, setSelectedStory] = useState<any>(null);

  if (!selectedStory) {
    return <StoryPicker onSelectStory={setSelectedStory} />;
  }

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
      scenes={Object.values(selectedStory.scenes)}
      startSceneId={selectedStory.startSceneId}
    >
      <Game story={selectedStory} />
    </GameStateProvider>
  );
}

export default App;