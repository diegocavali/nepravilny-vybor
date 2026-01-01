// Типы для игры "Interactive Date Story"

// Состояние игрока
export interface GameState {
  drunk: boolean;
  injured: boolean;
  mood: 'calm' | 'angry' | 'confident';
  alive: boolean;
}

// Условие для выбора
export interface ChoiceCondition {
  type: 'has' | 'notHas' | 'equals' | 'notEquals';
  property: keyof GameState;
  value: boolean | string | number;
}

// Эффект от выбора
export interface ChoiceEffect {
  property: keyof GameState;
  value: boolean | string | number;
}

// Выбор (вариант действия)
export interface Choice {
  id: string;
  text: string;
  nextSceneId: string;
  conditions?: ChoiceCondition[];
  effects?: ChoiceEffect[];
  disabledText?: string; // Текст, показываемый если выбор недоступен
}

// Сцена
export interface Scene {
  id: string;
  text: string;
  choices: Choice[];
}