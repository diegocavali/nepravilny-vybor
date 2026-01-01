import React from 'react';
import { GameState } from '../types';

interface StatusBarProps {
  gameState: GameState;
}

const StatusBar: React.FC<StatusBarProps> = ({ gameState }) => {
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
    </div>
  );
};

export default StatusBar;