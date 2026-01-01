import React from 'react';
import { stories } from '../stories';

interface StoryPickerProps {
  onSelectStory: (story: any) => void;
}

const StoryPicker: React.FC<StoryPickerProps> = ({ onSelectStory }) => {
  return (
    <div className="story-picker">
      <h1>Неправильный выбор</h1>
      <h2>Выберите сюжет</h2>
      <div className="story-list">
        {stories.map((story) => (
          <div key={story.id} className="story-item">
            <button onClick={() => onSelectStory(story)}>
              {story.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryPicker;