import React from 'react';
import { Choice } from '../types';
import { useGameState } from '../GameStateContext';

interface ChoiceButtonProps {
  choice: Choice;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ choice }) => {
  const { makeChoice, gameState } = useGameState();

  // Проверить, доступен ли выбор
  const isAvailable = choice.conditions?.every(condition => {
    const { type, property, value } = condition;
    const currentValue = gameState[property];

    switch (type) {
      case 'has':
        return Boolean(currentValue) === value;
      case 'notHas':
        return Boolean(currentValue) !== value;
      case 'equals':
        return currentValue === value;
      case 'notEquals':
        return currentValue !== value;
      default:
        return true;
    }
  }) ?? true;

  const handleClick = () => {
    if (isAvailable) {
      makeChoice(choice.id);
    }
  };

  if (!isAvailable && choice.disabledText) {
    return (
      <button className="choice-button" disabled={true}>
        {choice.disabledText}
      </button>
    );
  }

  if (!isAvailable) {
    return null; // Скрыть кнопку, если недоступна и нет текста для disabled
  }

 return (
    <button className="choice-button" onClick={handleClick}>
      {choice.text}
    </button>
  );
};

export default ChoiceButton;