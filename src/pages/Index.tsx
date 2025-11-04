import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Choice {
  text: string;
  nextScene: string;
}

interface Scene {
  id: string;
  background: string;
  character?: string;
  text: string;
  speaker?: string;
  choices?: Choice[];
  isEnding?: boolean;
}

const scenes: Record<string, Scene> = {
  start: {
    id: 'start',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/82c1e3af-bda2-4def-b1a8-9d3824839045.jpg',
    text: 'Добро пожаловать в "Вечную любовь"...',
    choices: [
      { text: 'Начать игру', nextScene: 'intro' }
    ]
  },
  intro: {
    id: 'intro',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/5e9f29a2-2f89-4064-887d-b2250597e238.jpg',
    text: 'Это была обычная школа... Или так казалось. Первый день в новом классе. Ты ещё не знал, что твоя жизнь изменится навсегда.',
    choices: [
      { text: 'Войти в класс', nextScene: 'meet_yuki' }
    ]
  },
  meet_yuki: {
    id: 'meet_yuki',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/5e9f29a2-2f89-4064-887d-b2250597e238.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/69e7464c-f478-4b43-b1f2-3f177b0d42af.jpg',
    speaker: 'Юки',
    text: 'О, новенький! Меня зовут Юки. Я так рада познакомиться... Ты такой особенный. Я сразу это почувствовала.',
    choices: [
      { text: 'Привет, приятно познакомиться', nextScene: 'yuki_happy' },
      { text: 'Ох, спасибо...', nextScene: 'yuki_obsessed' }
    ]
  },
  yuki_happy: {
    id: 'yuki_happy',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/5e9f29a2-2f89-4064-887d-b2250597e238.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/69e7464c-f478-4b43-b1f2-3f177b0d42af.jpg',
    speaker: 'Юки',
    text: 'Ты мне нравишься всё больше... Давай проводить вместе каждую минуту? Ведь правда... Мы созданы друг для друга.',
    choices: [
      { text: 'Конечно, почему бы и нет', nextScene: 'deep_obsession' },
      { text: 'Я не уверен...', nextScene: 'yuki_sad' }
    ]
  },
  yuki_obsessed: {
    id: 'yuki_obsessed',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/5e9f29a2-2f89-4064-887d-b2250597e238.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/69e7464c-f478-4b43-b1f2-3f177b0d42af.jpg',
    speaker: 'Юки',
    text: 'Ты стесняешься... Это так мило. Не волнуйся, я позабочусь о тебе. Я всегда буду рядом. Всегда. И никто не встанет между нами.',
    choices: [
      { text: 'Это звучит... странно', nextScene: 'dark_turn' },
      { text: 'Спасибо за заботу', nextScene: 'deep_obsession' }
    ]
  },
  deep_obsession: {
    id: 'deep_obsession',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/5e9f29a2-2f89-4064-887d-b2250597e238.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/69e7464c-f478-4b43-b1f2-3f177b0d42af.jpg',
    speaker: 'Юки',
    text: 'Я знала! Знала, что ты поймёшь! Мы будем вместе... навсегда. Никто не сможет нас разлучить. Никто.',
    choices: [
      { text: 'Продолжить', nextScene: 'ending_together' }
    ]
  },
  yuki_sad: {
    id: 'yuki_sad',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/5e9f29a2-2f89-4064-887d-b2250597e238.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/69e7464c-f478-4b43-b1f2-3f177b0d42af.jpg',
    speaker: 'Юки',
    text: 'Не уверен...? Почему? Я же делаю всё для тебя! Неужели ты не понимаешь?! Если не со мной... то ни с кем.',
    choices: [
      { text: 'Попытаться уйти', nextScene: 'ending_escape' },
      { text: 'Остаться', nextScene: 'ending_trapped' }
    ]
  },
  dark_turn: {
    id: 'dark_turn',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/5e9f29a2-2f89-4064-887d-b2250597e238.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/69e7464c-f478-4b43-b1f2-3f177b0d42af.jpg',
    speaker: 'Юки',
    text: 'Странно? Нет-нет-нет... Это любовь. Настоящая любовь. Ты просто ещё не понял. Но поймёшь. Обещаю.',
    choices: [
      { text: 'Бежать', nextScene: 'ending_escape' },
      { text: 'Принять её чувства', nextScene: 'ending_together' }
    ]
  },
  ending_together: {
    id: 'ending_together',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/82c1e3af-bda2-4def-b1a8-9d3824839045.jpg',
    text: 'Концовка: "Вечная любовь"\n\nВы остались с Юки. Каждый день она окружает тебя заботой, но ты чувствуешь, что выхода нет. Её любовь поглотила тебя полностью. Теперь вы вместе... навсегда.',
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  ending_escape: {
    id: 'ending_escape',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/82c1e3af-bda2-4def-b1a8-9d3824839045.jpg',
    text: 'Концовка: "Побег"\n\nТы сбежал. Но даже сейчас, ночью, ты слышишь её шёпот: "Я найду тебя...". Побег оказался иллюзией. Она всегда с тобой.',
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  ending_trapped: {
    id: 'ending_trapped',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/82c1e3af-bda2-4def-b1a8-9d3824839045.jpg',
    text: 'Концовка: "Ловушка"\n\nТы остался, боясь последствий. Теперь каждый день — это страх. Её улыбка. Её взгляд. Ты в ловушке, из которой не выбраться.',
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  }
};

export default function Index() {
  const [currentScene, setCurrentScene] = useState<Scene>(scenes.start);
  const [textVisible, setTextVisible] = useState(false);
  const [savedGame, setSavedGame] = useState<string | null>(null);

  useEffect(() => {
    setTextVisible(false);
    const timer = setTimeout(() => setTextVisible(true), 100);
    return () => clearTimeout(timer);
  }, [currentScene]);

  useEffect(() => {
    const saved = localStorage.getItem('yandere_save');
    if (saved) {
      setSavedGame(saved);
    }
  }, []);

  const handleChoice = (nextSceneId: string) => {
    const nextScene = scenes[nextSceneId];
    if (nextScene) {
      setCurrentScene(nextScene);
      if (!nextScene.isEnding) {
        localStorage.setItem('yandere_save', nextSceneId);
      }
    }
  };

  const handleSave = () => {
    localStorage.setItem('yandere_save', currentScene.id);
    setSavedGame(currentScene.id);
  };

  const handleLoad = () => {
    if (savedGame && scenes[savedGame]) {
      setCurrentScene(scenes[savedGame]);
    }
  };

  const handleMenu = () => {
    setCurrentScene(scenes.start);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${currentScene.background})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleSave}
            className="backdrop-blur-sm bg-secondary/80 hover:bg-secondary"
          >
            <Icon name="Save" size={16} className="mr-1" />
            Сохранить
          </Button>
          {savedGame && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleLoad}
              className="backdrop-blur-sm bg-secondary/80 hover:bg-secondary"
            >
              <Icon name="Upload" size={16} className="mr-1" />
              Загрузить
            </Button>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleMenu}
            className="backdrop-blur-sm bg-secondary/80 hover:bg-secondary"
          >
            <Icon name="Menu" size={16} className="mr-1" />
            Меню
          </Button>
        </div>

        <div className="flex-1 flex items-end p-4 md:p-8">
          {currentScene.character && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[70vh] w-auto animate-fade-in">
              <img
                src={currentScene.character}
                alt="Character"
                className="h-full w-auto object-contain animate-pulse-slow"
              />
            </div>
          )}

          <Card
            className={`w-full max-w-4xl mx-auto backdrop-blur-md bg-card/90 border-2 border-primary/30 p-6 md:p-8 transition-all duration-500 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {currentScene.speaker && (
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 animate-glitch">
                {currentScene.speaker}
              </h3>
            )}

            <p className="text-lg md:text-xl leading-relaxed mb-6 whitespace-pre-line">
              {currentScene.text}
            </p>

            {currentScene.choices && (
              <div className="flex flex-col gap-3">
                {currentScene.choices.map((choice, index) => (
                  <Button
                    key={index}
                    onClick={() => handleChoice(choice.nextScene)}
                    className="w-full text-lg py-6 bg-primary hover:bg-primary/80 transition-all hover:scale-105"
                  >
                    {choice.text}
                  </Button>
                ))}
              </div>
            )}

            {currentScene.isEnding && (
              <div className="mt-6 p-4 border-2 border-destructive/50 rounded-lg bg-destructive/10 text-center">
                <p className="text-destructive font-bold">🌹 Концовка достигнута 🌹</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
