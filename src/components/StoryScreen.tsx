import React from 'react';
import { Scene } from '../types';
import ChoiceButton from './ChoiceButton';

interface StoryScreenProps {
  scene: Scene | null;
}

const StoryScreen: React.FC<StoryScreenProps> = ({ scene }) => {
 if (!scene) {
    return <div>Сцена не найдена</div>;
  }

  return (
    <div className="scene-container">
      <div className="scene-text">{scene.text}</div>
      <div className="choices-container">
        {scene.choices.map(choice => (
          <ChoiceButton key={choice.id} choice={choice} />
        ))}
      </div>
    </div>
  );
};

export default StoryScreen;