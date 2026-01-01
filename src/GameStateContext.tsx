import React, { createContext, useContext, useState, ReactNode } from 'react';
import StoryEngine from './StoryEngine';
import { GameState, Scene } from './types';

interface GameStateContextType {
  storyEngine: StoryEngine;
  currentScene: Scene | null;
  gameState: GameState;
  makeChoice: (choiceId: string) => void;
  resetGame: () => void;
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

interface GameStateProviderProps {
  children: ReactNode;
  initialState: GameState;
  scenes: Scene[];
  startSceneId: string;
}

export const GameStateProvider: React.FC<GameStateProviderProps> = ({ 
  children, 
  initialState, 
  scenes, 
  startSceneId 
}) => {
 const storyEngine = new StoryEngine(initialState, scenes, startSceneId);
  const [currentScene, setCurrentScene] = useState<Scene | null>(storyEngine.getCurrentScene());
  const [gameState, setGameState] = useState<GameState>(storyEngine.getGameState());

  const makeChoice = (choiceId: string) => {
    const newScene = storyEngine.makeChoice(choiceId);
    setCurrentScene(newScene);
    setGameState(storyEngine.getGameState());
  };

  const resetGame = (newStartSceneId?: string) => {
    const resetStartSceneId = newStartSceneId || startSceneId;
    storyEngine.reset(initialState, resetStartSceneId);
    setCurrentScene(storyEngine.getCurrentScene());
    setGameState(storyEngine.getGameState());
  };

  return (
    <GameStateContext.Provider value={{ 
      storyEngine, 
      currentScene, 
      gameState, 
      makeChoice, 
      resetGame 
    }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};