# Неправильный выбор

Платформа интерактивных историй с поддержкой множества сюжетов. Игрок может выбирать из доступных историй, делая выборы, которые влияют на состояние персонажа и дальнейший сюжет.

## Установка и запуск

1. Убедитесь, что у вас установлены Node.js и npm
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Запустите проект в режиме разработки:
   ```bash
   npm run dev
   ```
4. Откройте в браузере: http://localhost:5173

## Структура проекта

- `src/types.ts` - определения типов для игры
- `src/StoryEngine.ts` - основной движок игры
- `src/GameStateContext.tsx` - контекст состояния игры
- `src/stories/` - сюжеты игры
  - `dating.ts` - сюжет "Свидание" (пример)
  - `index.ts` - экспорт доступных сюжетов
- `src/components/` - компоненты интерфейса
  - `StoryPicker.tsx` - экран выбора сюжета
  - `StatusBar.tsx` - отображение состояния персонажа
  - `StoryScreen.tsx` - отображение текущей сцены
  - `ChoiceButton.tsx` - кнопки выбора
  - `EndScreen.tsx` - экран завершения игры
- `src/App.tsx` - главный компонент приложения
- `src/styles.css` - стили приложения

## Добавление нового сюжета

Для добавления новой истории создайте файл в `src/stories/` в следующем формате:

```typescript
import { Scene } from '../types';

export const newStory = {
  id: "unique-id",
  title: "Название сюжета",
  startSceneId: "start",
  scenes: {
    'start': {
      id: 'start',
      text: 'Текст начальной сцены',
      choices: [
        // ... варианты выбора
      ]
    },
    // ... другие сцены
  } as Record<string, Scene>
};
```

Затем добавьте новый сюжет в `src/stories/index.ts`:

```typescript
import { datingStory } from './dating';
import { newStory } from './new-story-file';

export const stories = [
  datingStory,
  newStory
];
```

## Автор

Diego Cavali