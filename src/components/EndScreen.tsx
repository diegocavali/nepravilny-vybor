import React from 'react';
import { useGameState } from '../GameStateContext';

const EndScreen: React.FC = () => {
  const { resetGame } = useGameState();

  const handleRestart = () => {
    resetGame();
 };

  return (
    <div className="scene-container end-screen">
      <h2>Игра завершена</h2>
      <p>Спасибо за прохождение этой истории!</p>
      <button className="restart-button" onClick={handleRestart}>
        Начать заново
      </button>
    </div>
 );
};

 export default EndScreen;