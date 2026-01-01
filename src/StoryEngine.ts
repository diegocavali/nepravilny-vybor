import { GameState, Choice, Scene, ChoiceCondition, ChoiceEffect } from './types';

// Основной движок игры
class StoryEngine {
  private gameState: GameState;
  private scenes: Scene[];
  private currentSceneId: string;

  constructor(initialState: GameState, scenes: Scene[], startSceneId: string) {
    this.gameState = { ...initialState };
    this.scenes = [...scenes];
    this.currentSceneId = startSceneId;
  }

  // Получить текущую сцену
  getCurrentScene(): Scene | null {
    return this.scenes.find(scene => scene.id === this.currentSceneId) || null;
 }

  // Проверить, удовлетворяет ли состояние условиям
  private checkCondition(condition: ChoiceCondition): boolean {
    const { type, property, value } = condition;
    const currentValue = this.gameState[property];

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
        return false;
    }
  }

  // Проверить, удовлетворяются ли все условия для выбора
  private checkAllConditions(conditions?: ChoiceCondition[]): boolean {
    if (!conditions || conditions.length === 0) {
      return true;
    }

    return conditions.every(condition => this.checkCondition(condition));
  }

  // Применить эффекты выбора к состоянию
  private applyEffects(effects?: ChoiceEffect[]): void {
    if (!effects || effects.length === 0) {
      return;
    }

    effects.forEach(effect => {
      (this.gameState as any)[effect.property] = effect.value;
    });
  }

  // Сделать выбор
  makeChoice(choiceId: string): Scene | null {
    const currentScene = this.getCurrentScene();
    if (!currentScene) {
      return null;
    }

    const choice = currentScene.choices.find(c => c.id === choiceId);
    if (!choice) {
      return null;
    }

    // Проверить условия
    if (!this.checkAllConditions(choice.conditions)) {
      return this.getCurrentScene(); // Остаться на той же сцене
    }

    // Применить эффекты
    this.applyEffects(choice.effects);

    // Перейти к следующей сцене
    this.currentSceneId = choice.nextSceneId;

    return this.getCurrentScene();
  }

  // Получить текущее состояние игрока
  getGameState(): GameState {
    return { ...this.gameState };
  }

  // Сбросить игру
  reset(initialState: GameState, startSceneId: string): void {
    this.gameState = { ...initialState };
    this.currentSceneId = startSceneId;
  }
}

export default StoryEngine;