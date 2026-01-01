import React from 'react';
import { GameState } from '../types';
import { useGameState } from '../GameStateContext';

interface StatusBarProps {
  gameState: GameState;
}

const StatusBar: React.FC<StatusBarProps> = ({ gameState }) => {
  const { resetGame } = useGameState();

  const handleStoryChange = () => {
    // Сброс игры и возврат к выбору сюжета через App
    resetGame();
    window.location.hash = '#';
    window.location.reload();
  };

  return (
    <div className="status-bar">
      <div className="status-item">
        <span>Состояние:</span>
        <span>{gameState.drunk ? ' 🍺 Пьяный' : ' 🧘 Трезвый'}</span>
      </div>
      <div className="status-item">
        <span>Здоровье:</span>
        <span>{gameState.injured ? ' ⚕️ Ранен' : ' 🏃 Здоров'}</span>
      </div>
      <div className="status-item">
        <span>Настроение:</span>
        <span>
          {gameState.mood === 'calm' ? ' 😌 Спокойный' :
           gameState.mood === 'angry' ? ' 😠 Злой' :
           ' 😎 Уверенный'}
        </span>
      </div>
      <div className="status-item">
        <span>Жизнь:</span>
        <span>{gameState.alive ? ' ❤️ Жив' : ' 💀 Мертв'}</span>
      </div>
      <div className="status-item">
        <button onClick={handleStoryChange} className="change-story-button">
          Сменить сюжет
        </button>
      </div>
    </div>
  );
};

export default StatusBar;