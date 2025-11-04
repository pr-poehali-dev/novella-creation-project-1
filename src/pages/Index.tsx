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
  isDeath?: boolean;
  refusedNights?: number;
}

const scenes: Record<string, Scene> = {
  start: {
    id: 'start',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/82c1e3af-bda2-4def-b1a8-9d3824839045.jpg',
    text: 'Добро пожаловать в "Пламя одержимости"\n\nИстория о лучнике, потерявшем крылья, и духе огня, потерявшем рассудок...',
    choices: [
      { text: 'Начать игру', nextScene: 'prologue' }
    ]
  },
  prologue: {
    id: 'prologue',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/d64f5e0e-2f7f-46b7-bb08-0f8504f74d46.jpg',
    text: 'Долина Драконов. Когда-то здесь цвели леса, которые охранял Винд Арчер — крылатый лучник. Его другом был Фаер Спирит, дух огня.\n\nНо Винд Арчер всё больше времени посвящал своему долгу... забыв о друге.',
    choices: [
      { text: 'Продолжить', nextScene: 'prologue2' }
    ]
  },
  prologue2: {
    id: 'prologue2',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/d64f5e0e-2f7f-46b7-bb08-0f8504f74d46.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: 'Винд... почему ты избегаешь меня? Я... я никогда не чувствовал такого. Проводи со мной больше времени. Пожалуйста...',
    choices: [
      { text: 'Продолжить', nextScene: 'prologue3' }
    ]
  },
  prologue3: {
    id: 'prologue3',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/d64f5e0e-2f7f-46b7-bb08-0f8504f74d46.jpg',
    text: 'Винд Арчер молчал. А потом... грубо отказал.\n\nЧто-то сломалось в Фаер Спирите в тот момент. Пламя ярости вырвалось наружу.',
    choices: [
      { text: 'Продолжить', nextScene: 'prologue4' }
    ]
  },
  prologue4: {
    id: 'prologue4',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/d64f5e0e-2f7f-46b7-bb08-0f8504f74d46.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: 'ЕСЛИ НЕ СО МНОЙ... ТО НИКОМУ!\n\n*Огонь поглотил весь лес. Крылья Винд Арчера были вырваны. Всё погрузилось во тьму...*',
    choices: [
      { text: 'Продолжить', nextScene: 'awakening' }
    ]
  },
  awakening: {
    id: 'awakening',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: '*Боль пронзает спину. Голова раскалывается.*\n\nТы медленно открываешь глаза. Это... Замок Огня? Твои крылья... их больше нет. Только кровавые раны на спине.',
    choices: [
      { text: 'Попытаться встать', nextScene: 'first_meeting' },
      { text: 'Осмотреться', nextScene: 'look_around' }
    ]
  },
  look_around: {
    id: 'look_around',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: 'Тронный зал из чёрного камня. Повсюду пляшут языки пламени. На стенах висят... твои вырванные крылья, как трофеи.',
    choices: [
      { text: 'Попытаться встать', nextScene: 'first_meeting' }
    ]
  },
  first_meeting: {
    id: 'first_meeting',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Фаер нежно гладит твои волосы* Ах, ты проснулся, моё солнышко... *прижимается ближе* Как ты себя чувствуешь? Прости, что пришлось вырвать крылья... *целует в лоб* Но теперь ты всегда будешь со мной. Только со мной.',
    choices: [
      { text: 'Фаер... почему ты это сделал?', nextScene: 'ask_why' },
      { text: 'Отпусти меня!', nextScene: 'demand_freedom' },
      { text: 'Промолчать', nextScene: 'stay_silent' }
    ]
  },
  ask_why: {
    id: 'ask_why',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Обнимает тебя, зарываясь лицом в твою шею* Почему? *мягко целует плечо* Потому что я люблю тебя, Винд... Так сильно. *нежно гладит по спине, избегая ран* Ты отверг меня тогда... но теперь мы вместе. Навсегда вместе.',
    choices: [
      { text: 'Я... не хотел тебя обидеть', nextScene: 'apologize' },
      { text: 'Это не любовь, это одержимость!', nextScene: 'call_obsession' }
    ]
  },
  demand_freedom: {
    id: 'demand_freedom',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Хватка на твоих плечах становится болезненной* Отпустить? *голос становится холодным* ОТПУСТИТЬ?! *огонь в глазах вспыхивает* После того, как ты ОТВЕРГ МЕНЯ?! *грубо встряхивает* Нет, Винд. *сжимает сильнее* Ты. Останешься. Здесь.',
    choices: [
      { text: 'Извини... я был не прав', nextScene: 'apologize' },
      { text: 'Ты сошёл с ума!', nextScene: 'death_anger' }
    ]
  },
  stay_silent: {
    id: 'stay_silent',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Нежно берёт твоё лицо в ладони* Молчишь? *мягко целует щёку* Умница... Ты такой умный, Винд. *обнимает* Я позабочусь о тебе. Дам тебе всё. *шепчет на ухо* Ты только мой...',
    choices: [
      { text: 'Продолжить', nextScene: 'captive_life' }
    ]
  },
  apologize: {
    id: 'apologize',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Глаза Фаера наполняются светом, он крепко обнимает тебя* Винд... *нежно целует губы* Ты правда так думаешь? *гладит твои волосы* Ты... останешься со мной? *прижимается всем телом* По своей воле?',
    choices: [
      { text: 'Да... я останусь', nextScene: 'accept_love' },
      { text: 'У меня нет выбора', nextScene: 'captive_life' }
    ]
  },
  call_obsession: {
    id: 'call_obsession',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: 'Одержимость?! ТЫ НАЗЫВАЕШЬ МОИ ЧУВСТВА ОДЕРЖИМОСТЬЮ?!\n\n*Пламя вокруг вспыхивает ярче*',
    choices: [
      { text: 'Прости! Я не то имел в виду!', nextScene: 'apologize' },
      { text: 'Да, это больная одержимость!', nextScene: 'death_anger' }
    ]
  },
  captive_life: {
    id: 'captive_life',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: 'Дни превратились в недели. Ты в плену Огненного Замка. Фаер Спирит постоянно рядом, его взгляд никогда не отпускает тебя.',
    choices: [
      { text: 'Продолжить', nextScene: 'morning_scene' }
    ]
  },
  morning_scene: {
    id: 'morning_scene',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Просыпаешься в объятиях Фаера* Доброе утро, солнышко... *нежно целует в губы* Ты так мило спишь. *гладит по волосам* Я всю ночь смотрел на тебя. Не мог оторваться. *обнимает крепче* Ты моё сокровище...',
    choices: [
      { text: 'Доброе утро...', nextScene: 'daily_life' },
      { text: 'Отпусти меня', nextScene: 'morning_anger' }
    ]
  },
  morning_anger: {
    id: 'morning_anger',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Хватка резко усиливается* Отпустить? *переворачивает на спину и нависает сверху* Отпустить тебя? ПОСЛЕ ТАКОГО ПРЕКРАСНОГО УТРА?! *впивается пальцами в плечи* Я дарю тебе нежность, а ты... *голос становится ледяным* Ты всё портишь.',
    choices: [
      { text: 'Прости, я не хотел...', nextScene: 'daily_life' },
      { text: 'Мне не нужна твоя нежность!', nextScene: 'death_rejection' }
    ]
  },
  death_rejection: {
    id: 'death_rejection',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Застывает. Глаза пусты* Не... нужна? *начинает душить* НЕ НУЖНА?! МОЯ ЛЮБОВЬ ТЕБЕ НЕ НУЖНА?!\n\n*Огонь вспыхивает по всему телу*\n\nТОГДА И ТЫ МНЕ НЕ НУЖЕН!\n\n*Сжигает дотла, не отпуская*',
    isDeath: true,
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  daily_life: {
    id: 'daily_life',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Садится рядом и обнимает за талию* Винд, любимый... *целует в щёку* Я приготовил тебе еду. *протягивает ложку к твоим губам* Ешь, пожалуйста. *нежно гладит руку* Ты должен быть сильным. Для меня.',
    choices: [
      { text: 'Спасибо, Фаер', nextScene: 'comply' },
      { text: 'Я не голоден', nextScene: 'refuse_food' },
      { text: 'Я хочу принять душ...', nextScene: 'ask_shower' },
      { text: 'Попытаться найти выход', nextScene: 'attempt_escape' }
    ]
  },
  ask_shower: {
    id: 'ask_shower',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Глаза загораются* Душ? *нежно улыбается* Конечно, любимый... *гладит по щеке* Я покажу тебе. *берёт за руку* Там есть горячие источники... очень... уединённое место. *ведёт по коридору*',
    choices: [
      { text: 'Идти за ним', nextScene: 'bathroom_scene' }
    ]
  },
  bathroom_scene: {
    id: 'bathroom_scene',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Открывает дверь в просторную комнату с парящим бассейном* Вот. *обнимает сзади* Хочешь, я помогу тебе?.. *целует в шею* Или... *медленно отходит* Я подожду здесь?',
    choices: [
      { text: 'Я... справлюсь сам, спасибо', nextScene: 'shower_alone' },
      { text: 'Можешь остаться...', nextScene: 'shower_together' }
    ]
  },
  shower_alone: {
    id: 'shower_alone',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Кивает, но глаза темнеют* Хорошо... *целует в лоб* Я буду... рядом. *медленно выходит и прикрывает дверь*',
    choices: [
      { text: 'Принять душ', nextScene: 'shower_spying' }
    ]
  },
  shower_spying: {
    id: 'shower_spying',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: '*Ты входишь в тёплую воду. Пар окутывает тело. Горячие струи стекают по коже...*\n\n*Вдруг ты замечаешь краем глаза — дверь приоткрыта. В щели горят два огненных глаза, неотрывно следящих за каждым твоим движением.*\n\n*Фаер наблюдает. Дыхание учащённое. Руки сжимают дверной косяк так сильно, что дерево начинает дымиться.*',
    choices: [
      { text: 'Сделать вид, что не заметил', nextScene: 'pretend_ignore' },
      { text: 'Фаер?! Ты подглядываешь?!', nextScene: 'confront_spying' },
      { text: 'Повернуться к двери спиной', nextScene: 'turn_away' }
    ]
  },
  pretend_ignore: {
    id: 'pretend_ignore',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: '*Ты продолжаешь мыться, делая вид, что ничего не заметил. Взгляд Фаера становится всё более жадным. Ты слышишь его тяжёлое дыхание даже через шум воды.*\n\n*Наконец дверь резко распахивается.*',
    choices: [
      { text: 'Обернуться', nextScene: 'fire_enters' }
    ]
  },
  confront_spying: {
    id: 'confront_spying',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Дверь распахивается полностью* Подглядываю? *входит* Я не подглядываю за тем, что МОЁ. *медленно приближается* Ты мой, Винд. *снимает одежду* Каждая часть тебя принадлежит мне. *входит в воду* И я имею право СМОТРЕТЬ.',
    choices: [
      { text: 'Прикрыться руками', nextScene: 'fire_possessive' },
      { text: 'Это... неправильно', nextScene: 'fire_angry_privacy' }
    ]
  },
  turn_away: {
    id: 'turn_away',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: '*Ты поворачиваешься спиной к двери. Слышишь как дверь скрипит — открывается шире.*',
    choices: [
      { text: 'Не оборачиваться', nextScene: 'fire_behind' }
    ]
  },
  fire_enters: {
    id: 'fire_enters',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Фаер стоит в дверях, дыхание тяжёлое, глаза горят* Прости... *делает шаг вперёд* Я не смог... не смог остаться там. *снимает рубашку* Ты так прекрасен... *входит в воду* Я хочу быть рядом. Всегда рядом.',
    choices: [
      { text: 'Разрешить ему войти', nextScene: 'shower_together' },
      { text: 'Пожалуйста, выйди', nextScene: 'reject_entry' }
    ]
  },
  fire_behind: {
    id: 'fire_behind',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Внезапно чувствуешь горячие руки на плечах* Винд... *Фаер обнимает сзади, прижимаясь всем телом* Почему отвернулся? *целует шею* Ты стесняешься меня? *руки скользят по мокрой коже* Или... прячешься?',
    choices: [
      { text: 'Я просто... не ожидал', nextScene: 'shower_together' },
      { text: 'Отстрани его', nextScene: 'push_away_shower' }
    ]
  },
  fire_possessive: {
    id: 'fire_possessive',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Хватает руки и разводит их в стороны* Не прячься от меня. *прижимает к стене бассейна* НИКОГДА не прячься от меня. *целует страстно* Я хочу видеть всё. Каждую часть тебя. *руки скользят по телу* Ты понял?',
    choices: [
      { text: 'Да... я понял', nextScene: 'shower_together' },
      { text: 'Это слишком...', nextScene: 'fire_angry_privacy' }
    ]
  },
  fire_angry_privacy: {
    id: 'fire_angry_privacy',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Застывает. Хватка усиливается* Неправильно? Слишком? *голос становится опасным* У ТЕБЯ НЕТ ПРАВА НА ПРИВАТНОСТЬ! *толкает под воду* ТЫ МОЙ! *поднимает обратно* Твоё тело — МОЁ! Твоя жизнь — МОЯ! *трясёт* ВСЁ В ТЕБЕ ПРИНАДЛЕЖИТ МНЕ!',
    choices: [
      { text: 'Прости! Ты прав!', nextScene: 'submit_shower' },
      { text: 'Я не вещь!', nextScene: 'death_defiance_shower' }
    ]
  },
  push_away_shower: {
    id: 'push_away_shower',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Падает назад от толчка. Медленно встаёт. Глаза пусты* Ты... оттолкнул меня? *вода вокруг начинает кипеть* ОТТОЛКНУЛ?! *хватает за горло и прижимает к стене* Я пришёл к тебе с ЛЮБОВЬЮ! *сжимает* А ты... ты ОТТОЛКНУЛ меня?!',
    choices: [
      { text: 'Прости! Я испугался!', nextScene: 'submit_shower' },
      { text: 'Отпусти меня!', nextScene: 'death_defiance_shower' }
    ]
  },
  reject_entry: {
    id: 'reject_entry',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Замирает в воде* Выйти? *голос ледяной* Ты просишь меня... ВЫЙТИ? *медленно приближается* Из МОЕГО замка? МОЕЙ ванны? К МОЕМУ пленнику? *хватает за волосы* У ТЕБЯ НЕТ ПРАВА МНЕ ОТКАЗЫВАТЬ!',
    choices: [
      { text: 'Прости! Оставайся!', nextScene: 'shower_together' },
      { text: 'У меня есть право!', nextScene: 'death_defiance_shower' }
    ]
  },
  submit_shower: {
    id: 'submit_shower',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Отпускает, дыхание тяжёлое* Хорошо... *обнимает нежно* Хорошо, любимый. *гладит волосы* Я не хотел пугать тебя... *целует в лоб* Просто запомни — ты всегда мой. *прижимает к себе* Всегда.',
    choices: [
      { text: 'Я понял...', nextScene: 'shower_together' }
    ]
  },
  shower_together: {
    id: 'shower_together',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Нежно моет твои волосы, плечи, спину* Ты такой красивый... *целует шею* Такой идеальный... *обнимает* Я так счастлив, что ты здесь. Со мной. *шепчет* Навсегда со мной...\n\n*Время в горячей воде тянется медленно, в объятиях Фаера*',
    choices: [
      { text: 'Закончить купание', nextScene: 'after_shower' }
    ]
  },
  death_defiance_shower: {
    id: 'death_defiance_shower',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Глаза полыхают яростью*\n\nТЫ СМЕЕШЬ...\n\n*Вода вокруг закипает*\n\nОТКАЗЫВАТЬ МНЕ ДАЖЕ ЗДЕСЬ?!\n\n*Топит под воду*\n\nЕСЛИ НЕ МОЖЕШЬ БЫТЬ ПОКОРНЫМ...\n\n*Держит под водой, не отпуская*\n\nТО НЕ НУЖЕН МНЕ ВООБЩЕ.\n\n*Последнее, что ты видишь — его безумные горящие глаза над поверхностью воды*',
    isDeath: true,
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  after_shower: {
    id: 'after_shower',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Заботливо вытирает тебя полотенцем* Теперь ты чистый... *целует плечо* И такой прекрасный... *обнимает* Спасибо, что позволил мне быть рядом, любимый.',
    choices: [
      { text: 'Вернуться к повседневной жизни', nextScene: 'evening_time' }
    ]
  },
  evening_time: {
    id: 'evening_time',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: 'Солнце садится за горизонт. Огненный замок озаряется тёплым светом. День близится к концу.',
    choices: [
      { text: 'Продолжить', nextScene: 'night_scene_0' }
    ]
  },
  night_scene_0: {
    id: 'night_scene_0',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Фаер ложится рядом, обнимая тебя сзади* Винд... *нежно целует шею* Пришла ночь. Наше время... *руки скользят по телу* Я так хочу тебя. *прижимается ближе* Будь моим... полностью.',
    refusedNights: 0,
    choices: [
      { text: 'Согласиться...', nextScene: 'intimate_scene' },
      { text: 'Я... устал сегодня', nextScene: 'refuse_night_1' }
    ]
  },
  intimate_scene: {
    id: 'intimate_scene',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Страстно целует, крепко обнимая* Ты мой... только мой... *шепчет на ухо* Я так люблю тебя, Винд...\n\n*Ночь проходит в объятиях Фаера*',
    refusedNights: 0,
    choices: [
      { text: 'Утро наступило...', nextScene: 'morning_scene' }
    ]
  },
  refuse_night_1: {
    id: 'refuse_night_1',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Хватка слабеет* Устал? *гладит по волосам, но голос звучит разочарованно* Хорошо... я понимаю. *целует в висок* Спи, любимый. Но завтра... *обнимает крепче* Завтра ты будешь моим.',
    refusedNights: 1,
    choices: [
      { text: 'Заснуть...', nextScene: 'morning_after_refusal' }
    ]
  },
  morning_after_refusal: {
    id: 'morning_after_refusal',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Фаер молча смотрит на тебя утром. Взгляд тяжелый* Доброе утро. *голос холоднее обычного* Надеюсь, ты хорошо отдохнул.',
    refusedNights: 1,
    choices: [
      { text: 'Д-доброе утро...', nextScene: 'day_after_refusal' }
    ]
  },
  day_after_refusal: {
    id: 'day_after_refusal',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: 'День проходит в тишине. Фаер рядом, но он необычно молчалив. Иногда ты ловишь его тяжелый взгляд.',
    refusedNights: 1,
    choices: [
      { text: 'Наступает вечер...', nextScene: 'evening_time_2' }
    ]
  },
  evening_time_2: {
    id: 'evening_time_2',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: 'Снова наступает ночь. Ты чувствуешь напряжение в воздухе.',
    refusedNights: 1,
    choices: [
      { text: 'Продолжить', nextScene: 'night_scene_1' }
    ]
  },
  night_scene_1: {
    id: 'night_scene_1',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Фаер ложится рядом, руки сразу обвивают тебя* Винд. *голос напряжённый* Вчера ты отказал мне. *крепче сжимает* Сегодня... *целует в шею, настойчивее* Сегодня ты не откажешь. Правда?',
    refusedNights: 1,
    choices: [
      { text: 'Согласиться', nextScene: 'intimate_scene' },
      { text: 'Я всё ещё не готов...', nextScene: 'refuse_night_2' }
    ]
  },
  refuse_night_2: {
    id: 'refuse_night_2',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Резко отталкивает тебя* НЕ ГОТОВ?! *встаёт с кровати* ДВЕ НОЧИ! ДВЕ НОЧИ Я ЖДУ! *хватает за плечи, впиваясь пальцами* Я ДАРОМ ТЕБЕ НЕЖНОСТЬ! ЗАБОТУ! ЛЮБОВЬ! *трясёт* А ТЫ... ТЫ ОТКАЗЫВАЕШЬ МНЕ?!\n\n*Глаза полыхают огнём*\n\nЯ БОЛЬШЕ НЕ МОГУ ЭТО ТЕРПЕТЬ!',
    refusedNights: 2,
    choices: [
      { text: 'Фаер, прости! Я передумал!', nextScene: 'last_chance' },
      { text: 'Ты не можешь меня заставить!', nextScene: 'death_refusal_night' }
    ]
  },
  last_chance: {
    id: 'last_chance',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Дыхание тяжёлое, медленно отпускает плечи* Передумал?.. *гладит по щеке дрожащей рукой* Хорошо. Хорошо... *обнимает, зарываясь лицом в плечо* Я так долго ждал... *прижимается* Не заставляй меня больше ждать, Винд. Пожалуйста...',
    refusedNights: 0,
    choices: [
      { text: 'Больше не буду...', nextScene: 'intimate_scene_makeup' }
    ]
  },
  intimate_scene_makeup: {
    id: 'intimate_scene_makeup',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Нежно, но настойчиво целует* Наконец-то... *обнимает так крепко, что больно* Ты мой. Навсегда мой...\n\n*Ночь проходит в страстных объятиях*',
    refusedNights: 0,
    choices: [
      { text: 'Утро...', nextScene: 'morning_scene' }
    ]
  },
  death_refusal_night: {
    id: 'death_refusal_night',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Замирает. Взгляд пустеет*\n\nНе... можешь?\n\n*Хватает за горло*\n\nНЕ МОЖЕШЬ ЗАСТАВИТЬ?! Я ОТДАЛ ТЕБЕ ВСЁ! ТЕРПЕЛ ДВЕ НОЧИ! А ТЫ... ТЫ ОТКАЗЫВАЕШЬ МНЕ В ПОСЛЕДНЕМ?!\n\n*Пламя охватывает всё тело*\n\nЕСЛИ ТЫ НЕ ХОЧЕШЬ БЫТЬ МОИМ ПОЛНОСТЬЮ... ТО НЕ БУДЕШЬ ВООБЩЕ!\n\n*Сжигает заживо, не отпуская руки с горла*',
    isDeath: true,
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  comply: {
    id: 'comply',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Фаер счастливо улыбается и страстно целует тебя* Вот и хорошо, моё сокровище... *обнимает и прижимает к себе* Видишь? Мы можем быть так счастливы вместе. *нежно гладит по голове* Я так люблю тебя, Винд...',
    choices: [
      { text: 'Можно я приму душ?', nextScene: 'ask_shower' },
      { text: 'Продолжить день', nextScene: 'evening_time' },
      { text: 'Искать момент для побега', nextScene: 'plan_escape' }
    ]
  },
  ask_shower: {
    id: 'ask_shower',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Глаза загораются* Душ? *встаёт* Конечно, любимый! *показывает на дверь* Вон там. *нежно гладит по щеке* Ты хочешь, чтобы я... помог тебе?',
    choices: [
      { text: 'Нет, я сам... спасибо', nextScene: 'shower_alone' },
      { text: 'Хорошо... поможешь?', nextScene: 'shower_together' }
    ]
  },
  shower_alone: {
    id: 'shower_alone',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: 'Ты заходишь в комнату с душем. Тёплый огонь освещает помещение. Вода странно тёплая, почти горячая, но приятная.',
    choices: [
      { text: 'Принять душ', nextScene: 'shower_scene' }
    ]
  },
  shower_scene: {
    id: 'shower_scene',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: 'Ты стоишь под струями тёплой воды. Наконец-то момент уединения...\n\nНо что-то не даёт тебе покоя. Чувство, что кто-то наблюдает...',
    choices: [
      { text: 'Оглянуться', nextScene: 'catch_fire' },
      { text: 'Игнорировать', nextScene: 'ignore_feeling' }
    ]
  },
  catch_fire: {
    id: 'catch_fire',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Ты резко оборачиваешься и видишь Фаера в приоткрытой двери* О-о... *замирает* Я... я просто... *глаза медленно скользят по твоему телу* Прости, я не хотел вторгаться... *но не отводит взгляд* Ты... такой красивый...',
    choices: [
      { text: 'Фаер! Выйди!', nextScene: 'fire_embarrassed' },
      { text: 'Ты... давно там стоишь?', nextScene: 'fire_caught' },
      { text: 'Заходи...', nextScene: 'invite_fire' }
    ]
  },
  ignore_feeling: {
    id: 'ignore_feeling',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: 'Ты решаешь игнорировать это чувство. Продолжаешь мыться...\n\nКогда ты выходишь из душа, Фаер сидит рядом с очень невинным выражением лица.',
    choices: [
      { text: 'Выйти из душа', nextScene: 'after_shower' }
    ]
  },
  fire_embarrassed: {
    id: 'fire_embarrassed',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Вздрагивает и закрывает дверь* Пр-прости! *голос слышен за дверью, смущённый* Я не специально! Я просто хотел убедиться, что ты... что с тобой всё в порядке! Я беспокоюсь о твоих ранах!',
    choices: [
      { text: 'Хорошо... ты можешь вернуться', nextScene: 'fire_returns' },
      { text: 'Подожди снаружи', nextScene: 'after_shower' }
    ]
  },
  fire_caught: {
    id: 'fire_caught',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Пауза. Потом медленно шагает внутрь* Да... *закрывает за собой дверь* Достаточно долго. *подходит ближе* Я не могу отвести взгляд от тебя, Винд. *протягивает руку* Ты... совершенство. *глаза горят* Позволишь мне прикоснуться?',
    choices: [
      { text: 'Хорошо...', nextScene: 'shower_together' },
      { text: 'Нет, это слишком', nextScene: 'reject_touch' }
    ]
  },
  invite_fire: {
    id: 'invite_fire',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Глаза расширяются* Ты... правда? *немедленно заходит и закрывает дверь* Винд... *подходит ближе, руки дрожат* Я так долго мечтал об этом... *нежно обнимает* Позволь мне позаботиться о тебе...',
    choices: [
      { text: 'Продолжить', nextScene: 'shower_together' }
    ]
  },
  shower_together: {
    id: 'shower_together',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Фаер нежно моет твою спину, целуя плечи* Так красиво... *шепчет на ухо* Каждый шрам... каждая рана... *обнимает сзади* Ты прекрасен даже с ними. *руки медленно скользят по телу* Ты мой, Винд... только мой...',
    choices: [
      { text: 'Продолжить', nextScene: 'shower_intimate' }
    ]
  },
  shower_intimate: {
    id: 'shower_intimate',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: 'Тёплая вода смывает всё. Руки Фаера так нежны и одновременно настойчивы. Время теряет смысл...\n\nКогда вы выходите, Фаер счастливо улыбается.',
    choices: [
      { text: 'Продолжить', nextScene: 'evening_time' }
    ]
  },
  reject_touch: {
    id: 'reject_touch',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Рука застывает в воздухе* Слишком? *голос становится холодным* Я видел каждую частичку твоего тела, а прикоснуться — слишком? *сжимает кулаки* Как долго ты будешь меня ОТТАЛКИВАТЬ, ВИНД?!',
    choices: [
      { text: 'Прости... можно', nextScene: 'shower_together' },
      { text: 'Я не готов к этому', nextScene: 'shower_conflict' }
    ]
  },
  fire_returns: {
    id: 'fire_returns',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Осторожно открывает дверь и заходит* Прости... *подходит ближе, протягивая полотенце* Я принёс это. *стоит слишком близко* Позволь мне помочь тебе вытереться? *взгляд скользит по телу* Пожалуйста...',
    choices: [
      { text: 'Хорошо...', nextScene: 'fire_helps' },
      { text: 'Спасибо, я сам', nextScene: 'after_shower' }
    ]
  },
  fire_helps: {
    id: 'fire_helps',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Медленно и нежно вытирает каждую каплю воды* Ты... прекрасен. *целует плечо* Каждый шрам, каждая рана... *обнимает полотенцем и прижимается* Я так хочу заботиться о тебе... всегда.',
    choices: [
      { text: 'Продолжить', nextScene: 'evening_time' }
    ]
  },
  shower_conflict: {
    id: 'shower_conflict',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Глаза темнеют* Не готов... *резко хватает за запястье* КОГДА ТЫ БУДЕШЬ ГОТОВ?! *прижимает к стене* Я ЖДУ! ДАЮ ТЕБЕ ВРЕМЯ! ТЕРПЛЮ! *другая рука скользит по твоему телу* НО МОЁ ТЕРПЕНИЕ НЕ БЕСКОНЕЧНО!',
    choices: [
      { text: 'Хорошо! Я готов!', nextScene: 'shower_together' },
      { text: 'Отпусти меня!', nextScene: 'death_shower' }
    ]
  },
  death_shower: {
    id: 'death_shower',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Хватка усиливается*\n\nОТПУСТИТЬ?!\n\n*Прижимает к стене сильнее*\n\nТЫ НАГОЙ! БЕЗ ОДЕЖДЫ! УЯЗВИМЫЙ! А Я НЕ МОГУ ПРИКОСНУТЬСЯ?!\n\n*Огонь вспыхивает*\n\nТОГДА НИКТО БОЛЬШЕ НЕ ПРИКОСНЁТСЯ К ТЕБЕ! НИКТО НЕ УВИДИТ ТЕБЯ!\n\n*Пламя поглощает всё*',
    isDeath: true,
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  after_shower: {
    id: 'after_shower',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Сидит рядом, когда ты выходишь* Лучше? *протягивает одежду* Я приготовил это для тебя. *улыбается нежно, но в глазах скрытое разочарование* Ты так красив...',
    choices: [
      { text: 'Спасибо, Фаер', nextScene: 'evening_time' }
    ]
  },
  refuse_food: {
    id: 'refuse_food',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Рука перестаёт гладить. Голос становится ледяным* Не голоден? *хватает за подбородок, заставляя смотреть в глаза* Винд... *сжимает болезненно* Ты. Испытываешь. Моё. Терпение. *грубо толкает* ЕШЬ. СЕЙЧАС.',
    choices: [
      { text: 'Хорошо, извини', nextScene: 'comply' },
      { text: 'Нет', nextScene: 'death_starvation' }
    ]
  },
  attempt_escape: {
    id: 'attempt_escape',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: 'Ты осторожно встаёшь и направляешься к выходу. Но огненная стена вспыхивает перед тобой.',
    choices: [
      { text: 'Продолжить', nextScene: 'caught_escaping' }
    ]
  },
  caught_escaping: {
    id: 'caught_escaping',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Грубо швыряет тебя на пол* КУДА ТЫ?! *наступает ногой на спину* Ты пытался СБЕЖАТЬ?! *давит сильнее на раны от крыльев* ПОСЛЕ ВСЕГО, ЧТО Я ДЛЯ ТЕБЯ СДЕЛАЛ?! *хватает за волосы, заставляя смотреть вверх*',
    choices: [
      { text: 'Прости! Прости, пожалуйста!', nextScene: 'beg_forgiveness' },
      { text: 'Я не могу здесь оставаться!', nextScene: 'death_escape_attempt' },
      { text: 'Я просто хотел подышать...', nextScene: 'lie_about_escape' }
    ]
  },
  lie_about_escape: {
    id: 'lie_about_escape',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Давит ногой сильнее* Подышать? *голос ледяной* ТЫ ДУМАЕШЬ, Я ИДИОТ?! *тянет за волосы* Ты был у ВЫХОДА! *швыряет головой в пол* НЕ ЛГИ МНЕ! НИКОГДА НЕ ЛГИ МНЕ!',
    choices: [
      { text: 'Прости! Я пытался сбежать!', nextScene: 'truth_escape' },
      { text: 'Я правда просто гулял...', nextScene: 'death_lies' }
    ]
  },
  truth_escape: {
    id: 'truth_escape',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Убирает ногу, дыхание тяжёлое* Хотя бы... правду сказал. *помогает встать* Понимаешь теперь? *обнимает, но крепко* Я не могу тебя отпустить. НИКОГДА. *целует в лоб* Попытаешься ещё раз — и я сломаю тебе ноги. Понял?',
    choices: [
      { text: 'Понял... больше не буду', nextScene: 'ending_prisoner' },
      { text: 'Ты монстр...', nextScene: 'death_insult' }
    ]
  },
  death_lies: {
    id: 'death_lies',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Глаза пустеют*\n\nТы... продолжаешь лгать мне в лицо.\n\n*Хватает за горло*\n\nЯ ДАРОМ ТЕБЕ ДОВЕРИЕ. ЛЮБОВЬ. ВТОРОЙ ШАНС. А ТЫ... ЛЖЁШЬ.\n\n*Огонь охватывает тебя*\n\nЛЖЕЦЫ НЕ ЗАСЛУЖИВАЮТ МОЕЙ ЛЮБВИ!\n\n*Сжигает заживо*',
    isDeath: true,
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  death_insult: {
    id: 'death_insult',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Замирает. Руки медленно разжимают объятия*\n\nМонстр?..\n\n*Шаг назад*\n\nЯ... МОНСТР?!\n\n*Хватает за шею и поднимает в воздух*\n\nЯ ЛЮБИЛ ТЕБЯ! СПАС! ДАЛ ДОМ! А ТЫ НАЗЫВАЕШЬ МЕНЯ МОНСТРОМ?!\n\n*Пламя вспыхивает*\n\nТОГДА Я ПОКАЖУ ТЕБЕ НАСТОЯЩЕГО МОНСТРА!\n\n*Медленная и мучительная смерть*',
    isDeath: true,
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  beg_forgiveness: {
    id: 'beg_forgiveness',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Дыхание тяжёлое, отпускает волосы* Хорошо... *убирает ногу* Хорошо. *помогает встать и неожиданно нежно обнимает* Я прощу тебя, любимый... *целует в макушку* Но больше никаких попыток побега. *гладит по голове* Понял?',
    choices: [
      { text: 'Да... я понял', nextScene: 'ending_prisoner' }
    ]
  },
  plan_escape: {
    id: 'plan_escape',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: 'Ты притворяешься послушным, но внутри планируешь побег. Проходят дни... Фаер начинает тебе доверять больше.',
    choices: [
      { text: 'Продолжить', nextScene: 'affection_scene' }
    ]
  },
  affection_scene: {
    id: 'affection_scene',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Фаер обнимает тебя сзади, прижимаясь всем телом* Винд... *нежно целует шею* Я так счастлив, что ты наконец понял. *гладит руки* Мы будем вместе вечно, правда? *переплетает пальцы с твоими* Скажи, что любишь меня...',
    choices: [
      { text: 'Я... люблю тебя, Фаер', nextScene: 'fire_trust' },
      { text: 'Промолчать', nextScene: 'fire_suspicious' }
    ]
  },
  fire_trust: {
    id: 'fire_trust',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Разворачивает тебя и страстно целует* Я знал! Знал, что ты меня любишь! *обнимает и кружит* Мне нужно отлучиться ненадолго... *гладит лицо* Подожди меня здесь, хорошо? *ещё один поцелуй* Я скоро вернусь, любимый.',
    choices: [
      { text: 'Хорошо, я подожду', nextScene: 'escape_opportunity' }
    ]
  },
  fire_suspicious: {
    id: 'fire_suspicious',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Хватка крепчает, голос холоднеет* Молчишь? *сжимает твои руки больнее* Я спросил. *разворачивает лицом к себе, хватая за подбородок* СКАЖИ ЧТО ЛЮБИШЬ МЕНЯ!',
    choices: [
      { text: 'Люблю! Я люблю тебя!', nextScene: 'fire_trust' },
      { text: 'Я не могу...', nextScene: 'death_refusal' }
    ]
  },
  death_refusal: {
    id: 'death_refusal',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Толкает на пол* НЕ МОЖЕШЬ?! *пинает в живот* Я ОТДАЛ ТЕБЕ ВСЁ! *наступает на грудь* ЗАБОТИЛСЯ! ЛЮБИЛ! *давит сильнее* А ТЫ... *огонь в глазах бушует* ТЫ ДАЖЕ СКАЗАТЬ НЕ МОЖЕШЬ...\n\n*Пламя охватывает тебя*\n\nЕсли ты не можешь любить меня... то никого не полюбишь. НИКОГДА.',
    isDeath: true,
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  escape_opportunity: {
    id: 'escape_opportunity',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: 'Однажды Фаер Спирит отлучается. Это твой шанс!',
    choices: [
      { text: 'Бежать сейчас!', nextScene: 'successful_escape' },
      { text: 'Слишком рискованно...', nextScene: 'ending_stockholm' }
    ]
  },
  successful_escape: {
    id: 'successful_escape',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/d64f5e0e-2f7f-46b7-bb08-0f8504f74d46.jpg',
    text: 'Ты бежишь сквозь пепел сгоревшего леса. Без крыльев, но свободный.',
    choices: [
      { text: 'Продолжить', nextScene: 'ending_freedom' }
    ]
  },
  accept_love: {
    id: 'accept_love',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Страстно целует тебя, обнимая так крепко, что больно* Винд... *покрывает поцелуями лицо и шею* Ты не представляешь, как я счастлив... *гладит, целует, прижимает* Наконец-то. Наконец-то ты мой. Только мой.',
    choices: [
      { text: 'Продолжить', nextScene: 'love_daily_routine' }
    ]
  },
  love_daily_routine: {
    id: 'love_daily_routine',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Проходят дни. Фаер постоянно обнимает, целует, не отходит ни на шаг* Винд, любимый... *гладит по волосам* Хочешь, я покажу тебе мою любимую часть замка? *берёт за руку* Там так красиво...',
    choices: [
      { text: 'Хорошо, пошли', nextScene: 'explore_castle' },
      { text: 'Можем остаться здесь?', nextScene: 'stay_close' }
    ]
  },
  explore_castle: {
    id: 'explore_castle',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Ведёт тебя по огненным коридорам, не выпуская руку* Смотри... *показывает на панорамное окно* Видишь весь мир отсюда? *обнимает сзади* Но мне нужен только ты. *целует в шею* Скажи, что любишь меня...',
    choices: [
      { text: 'Я люблю тебя, Фаер', nextScene: 'declare_love' },
      { text: 'Это... очень красиво', nextScene: 'avoid_words' }
    ]
  },
  stay_close: {
    id: 'stay_close',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Глаза загораются радостью* Ты хочешь быть рядом со мной?! *прижимает к себе* О, Винд... *покрывает лицо поцелуями* Ты делаешь меня таким счастливым! *ложится рядом, обнимая* Давай просто полежим так... вечно.',
    choices: [
      { text: 'Хорошо...', nextScene: 'intimate_moment' }
    ]
  },
  declare_love: {
    id: 'declare_love',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Разворачивает резко и страстно целует* Скажи ещё раз! *держит за лицо* СКАЖИ ЕЩЁ РАЗ! *целует снова и снова* Я так долго ждал этих слов... *слёзы радости на глазах* Ты мой. Навсегда мой.',
    choices: [
      { text: 'Продолжить', nextScene: 'ending_twisted_love' }
    ]
  },
  avoid_words: {
    id: 'avoid_words',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Хватка усиливается* Красиво? *разворачивает лицом к себе* Я спросил не об этом. *сжимает плечи* Я хочу услышать ТРИ СЛОВА, Винд. *взгляд становится опасным* Или ты... всё ещё сомневаешься?',
    choices: [
      { text: 'Я люблю тебя!', nextScene: 'declare_love' },
      { text: 'Я... не могу...', nextScene: 'punishment_doubt' }
    ]
  },
  intimate_moment: {
    id: 'intimate_moment',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Гладит по волосам, по лицу, по телу* Ты такой красивый... *нежно целует* Моё сокровище... *руки скользят ниже* Позволишь мне показать, как сильно я тебя люблю?',
    choices: [
      { text: 'Да...', nextScene: 'passionate_scene' },
      { text: 'Сейчас не время...', nextScene: 'gentle_refusal' }
    ]
  },
  passionate_scene: {
    id: 'passionate_scene',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Целует страстно и нежно одновременно* Ты мой... только мой... *шепчет между поцелуями* Навсегда...\n\n*Время теряет смысл в его объятиях*',
    choices: [
      { text: 'Продолжить', nextScene: 'ending_twisted_love' }
    ]
  },
  gentle_refusal: {
    id: 'gentle_refusal',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Замирает. Руки напрягаются* Не время? *медленно поднимает взгляд* Опять? *голос становится холодным* Мы уже проходили это, Винд. И ты знаешь, чем это кончается.',
    choices: [
      { text: 'Прости! Я передумал!', nextScene: 'passionate_scene' },
      { text: 'Ты обещал быть нежным...', nextScene: 'test_patience' }
    ]
  },
  test_patience: {
    id: 'test_patience',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Дыхание учащается. Сжимает кулаки* Обещал... быть нежным? *хватает за подбородок* Я И БЫЛ НЕЖНЫМ! Я ДАЮ ТЕБЕ ВСЁ! *встряхивает* А ты постоянно ИСПЫТЫВАЕШЬ МОЁ ТЕРПЕНИЕ!\n\n*Огонь вспыхивает в глазах*\n\nХВАТИТ ИГРАТЬ СО МНОЙ!',
    choices: [
      { text: 'Хорошо! Я готов! Прости!', nextScene: 'passionate_scene' },
      { text: 'Я не играю! Отпусти!', nextScene: 'punishment_doubt' }
    ]
  },
  punishment_doubt: {
    id: 'punishment_doubt',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Швыряет на пол* ТЫ ВСЁ ЕЩЁ СОМНЕВАЕШЬСЯ ВО МНЕ?! *наступает ногой на спину* ПОСЛЕ ТОГО, КАК Я ДАЛ ТЕБЕ ВТОРОЙ ШАНС?! *давит сильнее* Ты думал, я позволю тебе снова меня ОТВЕРГНУТЬ?!\n\n*Хватает за волосы*\n\nТы либо МОЙ ПОЛНОСТЬЮ... либо не будешь ничьим. ВЫБИРАЙ!',
    choices: [
      { text: 'Я твой! Полностью твой!', nextScene: 'forceful_acceptance' },
      { text: 'Я не могу так жить!', nextScene: 'death_final_rejection' }
    ]
  },
  forceful_acceptance: {
    id: 'forceful_acceptance',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Отпускает волосы, помогает встать* Правильный выбор... *нежно вытирает слёзы* Я не хотел быть грубым, любимый... *целует* Но ты оставляешь мне выбора. *обнимает* Теперь ты понимаешь? Мы созданы друг для друга.',
    choices: [
      { text: 'Да... я понимаю...', nextScene: 'ending_broken_love' }
    ]
  },
  death_final_rejection: {
    id: 'death_final_rejection',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Застывает. Глаза пустеют*\n\nНе можешь... так жить?\n\n*Медленно встаёт*\n\nТогда... не живи вообще.\n\n*Пламя поглощает тебя — медленно, мучительно*\n\nЕсли я не могу иметь тебя живым... то никто не сможет.',
    isDeath: true,
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  ending_broken_love: {
    id: 'ending_broken_love',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: 'Концовка: "Сломленная любовь"\n\nТы принадлежишь Фаеру. Душой и телом. Ты больше не сопротивляешься. Не возражаешь. Не отказываешь.\n\nЭто любовь? Или выживание?\n\nТы уже не знаешь разницы.',
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  ending_twisted_love: {
    id: 'ending_twisted_love',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: 'Концовка: "Извращённая любовь"\n\nТы принял чувства Фаера. Не знаешь, любовь это или стокгольмский синдром. Но теперь вы вместе в этом огненном замке. Твоя клетка стала уютнее... но это всё ещё клетка.',
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  ending_stockholm: {
    id: 'ending_stockholm',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: 'Концовка: "Сломленный дух"\n\nДни превратились в месяцы. Ты больше не думаешь о побеге. Фаер рядом. Всегда рядом. Ты не знаешь, где заканчивается страх и начинается привязанность. Возможно, это уже неважно.',
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  ending_prisoner: {
    id: 'ending_prisoner',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: 'Концовка: "Вечный пленник"\n\nТы остался. Не по любви, а по страху. Каждый день — выживание. Каждое слово — расчёт. Ты птица без крыльев в золотой клетке. И выхода нет.',
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  ending_freedom: {
    id: 'ending_freedom',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/d64f5e0e-2f7f-46b7-bb08-0f8504f74d46.jpg',
    text: 'Концовка: "Горькая свобода"\n\nТы сбежал. Без крыльев, через пепел того, что когда-то было домом. Но даже сейчас, на свободе, ты слышишь шёпот огня: "Я найду тебя, Винд. Найду..."\n\nСвобода оказалась горькой. Но это всё ещё свобода.',
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  death_anger: {
    id: 'death_anger',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: 'ТЫ... ПОСМЕЛ...\n\n*Огонь поглощает всё*\n\nЕсли не можешь быть моим... не будешь ничьим.',
    isDeath: true,
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  death_escape_attempt: {
    id: 'death_escape_attempt',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: 'НЕТ! Я НЕ ПОЗВОЛЮ ТЕБЕ УЙТИ!\n\n*Пламя окружает тебя*\n\nЕсли ты не хочешь остаться... то никто тебя не получит. НИКТО.',
    isDeath: true,
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  death_starvation: {
    id: 'death_starvation',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: 'Упрямый до конца... Что ж. Если ты отказываешься даже от этого...\n\n*Пламя вспыхивает в глазах Фаера*\n\nТогда ты мне не нужен.',
    isDeath: true,
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
    const saved = localStorage.getItem('dragon_valley_save');
    if (saved) {
      setSavedGame(saved);
    }
  }, []);

  const handleChoice = (nextSceneId: string) => {
    const nextScene = scenes[nextSceneId];
    if (nextScene) {
      setCurrentScene(nextScene);
      if (!nextScene.isEnding) {
        localStorage.setItem('dragon_valley_save', nextSceneId);
      }
    }
  };

  const handleSave = () => {
    localStorage.setItem('dragon_valley_save', currentScene.id);
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
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
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[70vh] w-auto animate-fade-in z-20">
              <img
                src={currentScene.character}
                alt="Character"
                className="h-full w-auto object-contain animate-pulse-slow"
              />
            </div>
          )}

          <Card
            className={`w-full max-w-4xl mx-auto backdrop-blur-md bg-card/90 border-2 ${
              currentScene.isDeath ? 'border-destructive/70' : 'border-primary/30'
            } p-6 md:p-8 transition-all duration-500 relative z-30 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {currentScene.speaker && (
              <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
                currentScene.isDeath ? 'text-destructive animate-glitch' : 'text-primary'
              }`}>
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
              <div className={`mt-6 p-4 border-2 ${
                currentScene.isDeath ? 'border-destructive bg-destructive/20' : 'border-primary/50 bg-primary/10'
              } rounded-lg text-center`}>
                <p className={`font-bold ${currentScene.isDeath ? 'text-destructive' : 'text-primary'}`}>
                  {currentScene.isDeath ? '💀 КОНЕЦ 💀' : '🔥 Концовка достигнута 🔥'}
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}