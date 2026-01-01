import { Scene } from '../types';

export const datingStory = {
  id: "dating",
  title: "Свидание",
  startSceneId: "start",
  scenes: {
    'start': {
      id: 'start',
      text: 'Ты идешь на свидание с девушкой мечты. У тебя есть несколько вариантов: встретиться с друзьями перед встречей, купить подарок, или пойти напрямую.',
      choices: [
        {
          id: 'meet-friends',
          text: 'Встретиться с друзьями',
          nextSceneId: 'friends',
          effects: [
            { property: 'mood', value: 'confident' }
          ]
        },
        {
          id: 'buy-gift',
          text: 'Купить подарок',
          nextSceneId: 'gift',
          conditions: [
            { type: 'notHas', property: 'injured', value: true }
          ],
          disabledText: 'Нельзя идти за подарком с травмой'
        },
        {
          id: 'go-directly',
          text: 'Пойти напрямую',
          nextSceneId: 'date',
          effects: [
            { property: 'mood', value: 'calm' }
          ]
        }
      ]
    },
    'friends': {
      id: 'friends',
      text: 'Ты встречаешься с друзьями. Они предлагают выпить. Ты можешь принять предложение или отказаться.',
      choices: [
        {
          id: 'drink',
          text: 'Выпить',
          nextSceneId: 'drunk-date',
          effects: [
            { property: 'drunk', value: true },
            { property: 'mood', value: 'confident' }
          ]
        },
        {
          id: 'no-drink',
          text: 'Отказаться',
          nextSceneId: 'sober-date',
          effects: [
            { property: 'mood', value: 'calm' }
          ]
        }
      ]
    },
    'gift': {
      id: 'gift',
      text: 'Ты покупаешь красивый подарок. Теперь ты чувствуешь себя увереннее и идешь на свидание.',
      choices: [
        {
          id: 'go-to-date',
          text: 'Пойти на свидание',
          nextSceneId: 'date-with-gift',
          effects: [
            { property: 'mood', value: 'confident' }
          ]
        }
      ]
    },
    'date': {
      id: 'date',
      text: 'Ты приходишь на свидание. Девушка рада тебя видеть. Что ты будешь делать?',
      choices: [
        {
          id: 'be-friendly',
          text: 'Быть дружелюбным',
          nextSceneId: 'successful-date',
          conditions: [
            { type: 'notHas', property: 'drunk', value: true }
          ],
          disabledText: 'Нельзя быть дружелюбным в пьяном виде'
        },
        {
          id: 'be-confident',
          text: 'Быть уверенным',
          nextSceneId: 'successful-date',
          conditions: [
            { type: 'equals', property: 'mood', value: 'confident' }
          ],
          disabledText: 'Нужно быть уверенным в себе'
        },
        {
          id: 'fight',
          text: 'Подраться с конкурентом',
          nextSceneId: 'fight-outcome',
          conditions: [
            { type: 'notHas', property: 'drunk', value: true }
          ],
          disabledText: 'Нельзя драться в пьяном виде'
        }
      ]
    },
    'drunk-date': {
      id: 'drunk-date',
      text: 'Ты приходишь на свидание в пьяном виде. Девушка шокирована. Что делать?',
      choices: [
        {
          id: 'apologize',
          text: 'Извиниться',
          nextSceneId: 'rejected-date',
          effects: [
            { property: 'mood', value: 'angry' }
          ]
        },
        {
          id: 'leave',
          text: 'Уйти',
          nextSceneId: 'end',
          effects: [
            { property: 'alive', value: false }
          ]
        }
      ]
    },
    'sober-date': {
      id: 'sober-date',
      text: 'Ты приходишь на свидание трезвым и спокойным. Девушка рада тебя видеть.',
      choices: [
        {
          id: 'talk-nice',
          text: 'Поговорить по-хорошему',
          nextSceneId: 'successful-date',
          effects: [
            { property: 'mood', value: 'calm' }
          ]
        },
        {
          id: 'be-shy',
          text: 'Быть застенчивым',
          nextSceneId: 'rejected-date',
          effects: [
            { property: 'mood', value: 'calm' }
          ]
        }
      ]
    },
    'date-with-gift': {
      id: 'date-with-gift',
      text: 'Ты приходишь на свидание с подарком. Девушка в восторге!',
      choices: [
        {
          id: 'continue-date',
          text: 'Продолжить свидание',
          nextSceneId: 'successful-date',
          effects: [
            { property: 'mood', value: 'confident' }
          ]
        }
      ]
    },
    'successful-date': {
      id: 'successful-date',
      text: 'Свидание прошло отлично! Вы отлично провели время и договорились о следующей встрече.',
      choices: [
        {
          id: 'end-happy',
          text: 'Завершить игру',
          nextSceneId: 'end'
        }
      ]
    },
    'rejected-date': {
      id: 'rejected-date',
      text: 'Свидание прошло неудачно. Девушка не заинтересована в тебе.',
      choices: [
        {
          id: 'end-sad',
          text: 'Завершить игру',
          nextSceneId: 'end'
        }
      ]
    },
    'fight-outcome': {
      id: 'fight-outcome',
      text: 'Ты вступаешь в драку с конкурентом. Исход зависит от твоего состояния.',
      choices: [
        {
          id: 'win-fight',
          text: 'Победить',
          nextSceneId: 'successful-date',
          conditions: [
            { type: 'notHas', property: 'injured', value: true }
          ],
          effects: [
            { property: 'mood', value: 'confident' }
          ]
        },
        {
          id: 'lose-fight',
          text: 'Проиграть',
          nextSceneId: 'rejected-date',
          effects: [
            { property: 'injured', value: true },
            { property: 'mood', value: 'angry' }
          ]
        }
      ]
    },
    'end': {
      id: 'end',
      text: 'Игра завершена. Спасибо за прохождение!',
      choices: []
    }
  } as Record<string, Scene>
};