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
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Солнце садится за горизонт* Винд... *подходит ближе* День подходит к концу. *берёт за руку* Как ты хочешь провести вечер?',
    choices: [
      { text: 'Попросить массаж', nextScene: 'fire_massage' },
      { text: 'Предложить лечь спать вместе', nextScene: 'fire_sleep_together' },
      { text: 'Просто поговорить', nextScene: 'evening_talk' },
      { text: 'Предложить ему принять душ', nextScene: 'suggest_fire_shower' },
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
      { text: 'Можешь сделать мне массаж?', nextScene: 'fire_massage' },
      { text: 'Расскажи мне историю', nextScene: 'storytelling' },
      { text: 'Хочу просто обнять тебя', nextScene: 'cuddle_time' },
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
  },
  fire_massage: {
    id: 'fire_massage',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Садится позади* Дай мне помочь тебе расслабиться... *руки ложатся на плечи* Ты так напряжён... *начинает массировать* Вот так... *пальцы скользят по шее* Лучше?',
    choices: [
      { text: 'Да... спасибо', nextScene: 'massage_continues' },
      { text: 'Это... слишком интимно', nextScene: 'reject_massage' }
    ]
  },
  massage_continues: {
    id: 'massage_continues',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Продолжает массаж, руки медленно опускаются ниже* Ты такой тёплый... *целует шею* Мягкий... *прижимается грудью к спине* Я так люблю прикасаться к тебе... *руки скользят по груди* Позволишь мне продолжить?',
    choices: [
      { text: 'Продолжай...', nextScene: 'intimate_massage' },
      { text: 'Может хватит на сегодня?', nextScene: 'stop_massage' }
    ]
  },
  intimate_massage: {
    id: 'intimate_massage',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Переворачивает на спину* Теперь я хочу видеть твоё лицо... *наклоняется ближе* Твои глаза... *целует* Твои губы... *руки продолжают скользить*\n\n*Время теряет смысл в его прикосновениях*',
    choices: [
      { text: 'Продолжить', nextScene: 'evening_time' }
    ]
  },
  stop_massage: {
    id: 'stop_massage',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Руки замирают* Хватит? *голос холоднее* Я даже не закончил... *хватка усиливается* Ты снова меня отвергаешь? *прижимает к полу* После того, как я так заботился о тебе?',
    choices: [
      { text: 'Прости! Продолжай!', nextScene: 'intimate_massage' },
      { text: 'Я правда устал...', nextScene: 'fire_frustrated_massage' }
    ]
  },
  reject_massage: {
    id: 'reject_massage',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Руки сжимают плечи сильнее* Интимно? *голос ледяной* Между влюблёнными НЕ БЫВАЕТ \"слишком интимно\"! *переворачивает лицом к себе* Или ты... всё ещё не считаешь нас парой?',
    choices: [
      { text: 'Нет! Считаю! Просто...', nextScene: 'massage_continues' },
      { text: 'Мы НЕ пара!', nextScene: 'death_rejection_couple' }
    ]
  },
  fire_frustrated_massage: {
    id: 'fire_frustrated_massage',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Резко встаёт* Устал... *дышит тяжело* Всегда устал. Всегда находишь причину оттолкнуть меня. *поворачивается спиной* Хорошо. Отдыхай. *уходит, хлопнув дверью*\n\n*Остаток дня он холоден и молчалив*',
    choices: [
      { text: 'Попытаться помириться', nextScene: 'apologize_fire' },
      { text: 'Дать ему время', nextScene: 'evening_time' }
    ]
  },
  death_rejection_couple: {
    id: 'death_rejection_couple',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Глаза пустеют*\n\nНе... пара?\n\n*Хватает за горло*\n\nПОСЛЕ ВСЕГО? ПОСЛЕ ТОГО, КАК Я ОТДАЛ ТЕБЕ СВОЁ СЕРДЦЕ?!\n\n*Огонь вспыхивает яростно*\n\nЕСЛИ МЫ НЕ ПАРА... ТО ТЫ МНЕ НЕ НУЖЕН!\n\n*Пламя поглощает мгновенно и беспощадно*',
    isDeath: true,
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  apologize_fire: {
    id: 'apologize_fire',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Сидит отвернувшись, не смотрит* Что? *голос холодный* Пришёл извиниться? *молчание* Или снова найдёшь причину отвергнуть меня?',
    choices: [
      { text: 'Обнять сзади', nextScene: 'hug_apology' },
      { text: 'Я правда сожалею...', nextScene: 'verbal_apology' }
    ]
  },
  hug_apology: {
    id: 'hug_apology',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Замирает когда ты обнимаешь* ...Винд? *руки ложатся на твои* Ты... *поворачивается в объятиях* Ты сам обнял меня... *глаза влажнеют* Я так ждал этого... *прижимает к себе* Прости, что был груб. *целует в лоб* Я просто... так боюсь тебя потерять.',
    choices: [
      { text: 'Я никуда не уйду', nextScene: 'promise_stay' },
      { text: 'Промолчать и просто обнимать', nextScene: 'silent_hug' }
    ]
  },
  verbal_apology: {
    id: 'verbal_apology',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Медленно поворачивается* Сожалеешь? *встаёт* Слова... просто слова. *подходит ближе* Докажи. *берёт за руку* Докажи, что сожалеешь.',
    choices: [
      { text: 'Как мне доказать?', nextScene: 'prove_apology' },
      { text: 'Поцеловать его', nextScene: 'kiss_apology' }
    ]
  },
  promise_stay: {
    id: 'promise_stay',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Крепко обнимает* Обещаешь? *смотрит в глаза* Навсегда? *целует страстно* Скажи ещё раз... скажи, что останешься со мной!',
    choices: [
      { text: 'Я останусь. Навсегда.', nextScene: 'evening_time' }
    ]
  },
  silent_hug: {
    id: 'silent_hug',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Молчит, просто держит тебя* ... *гладит по спине* Иногда молчание... лучше всех слов. *целует макушку* Спасибо.',
    choices: [
      { text: 'Продолжить обнимать', nextScene: 'evening_time' }
    ]
  },
  prove_apology: {
    id: 'prove_apology',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Притягивает ближе* Ты знаешь как... *руки на твоей талии* Покажи мне, что я тебе не безразличен. *взгляд жаркий* Прикоснись ко мне. Сам.',
    choices: [
      { text: 'Прикоснуться к его лицу', nextScene: 'tender_touch' },
      { text: 'Обнять его', nextScene: 'hug_apology' }
    ]
  },
  kiss_apology: {
    id: 'kiss_apology',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Замирает от поцелуя, потом страстно отвечает* Винд... *обнимает крепко* Ты сам... ты сам меня поцеловал! *прижимает к себе* Я так счастлив... *целует снова и снова* Больше никогда не отталкивай меня. Пожалуйста.',
    choices: [
      { text: 'Хорошо... не буду', nextScene: 'evening_time' }
    ]
  },
  tender_touch: {
    id: 'tender_touch',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Прикрывает глаза, наслаждаясь прикосновением* Так нежно... *поворачивает голову, целуя твою ладонь* Я люблю, когда ты трогаешь меня... *берёт твою руку и прижимает к груди* Чувствуешь? Как бьётся моё сердце? Только для тебя.',
    choices: [
      { text: 'Поцеловать его', nextScene: 'kiss_apology' },
      { text: 'Просто остаться так', nextScene: 'evening_time' }
    ]
  },
  fire_sleep_together: {
    id: 'fire_sleep_together',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Ночь опускается на пещеру* Винд... *протягивает руку* Пойдём спать. Вместе. *улыбка нежная, но в глазах опасный блеск* Я хочу обнимать тебя всю ночь.',
    choices: [
      { text: 'Хорошо...', nextScene: 'bed_scene' },
      { text: 'Я посплю отдельно', nextScene: 'sleep_refusal' }
    ]
  },
  bed_scene: {
    id: 'bed_scene',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Ложится рядом, притягивая к себе* Вот так... *обнимает сзади* Моё тепло согревает тебя? *целует в шею* Я так долго мечтал об этом... держать тебя в своих объятиях... *руки обнимают крепче* Засыпай, любимый. Я буду рядом.',
    choices: [
      { text: 'Заснуть в его объятиях', nextScene: 'morning_wake_up' },
      { text: 'Отодвинуться чуть дальше', nextScene: 'bed_conflict' }
    ]
  },
  morning_wake_up: {
    id: 'morning_wake_up',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Ты просыпаешься от поцелуев* Доброе утро, солнышко... *улыбается, гладит по волосам* Ты так сладко спал... Я не мог оторваться, просто смотрел на тебя... *целует в лоб* Как тебе спалось?',
    choices: [
      { text: 'Хорошо... спасибо', nextScene: 'morning_affection' },
      { text: 'Ты... наблюдал за мной?', nextScene: 'creepy_admission' }
    ]
  },
  bed_conflict: {
    id: 'bed_conflict',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Хватает и притягивает обратно* Куда?! *прижимает к себе* Я хочу держать тебя БЛИЗКО! *руки сжимают* Почему ты снова... *голос дрожит* Почему ты всегда отдаляешься от меня?!',
    choices: [
      { text: 'Прости... останусь близко', nextScene: 'morning_wake_up' },
      { text: 'Мне просто жарко!', nextScene: 'fire_hurt_feelings' }
    ]
  },
  sleep_refusal: {
    id: 'sleep_refusal',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Застывает* Отдельно? *лицо каменеет* Мы... любовники. Партнёры. ПАРА. *подходит ближе* А ты хочешь спать... ОТДЕЛЬНО?! *хватает за руку* НЕТ. Ты спишь СО МНОЙ. Или НЕ СПИШЬ ВООБЩЕ.',
    choices: [
      { text: 'Хорошо... со тобой', nextScene: 'bed_scene' },
      { text: 'Я хочу личное пространство!', nextScene: 'death_personal_space' }
    ]
  },
  death_personal_space: {
    id: 'death_personal_space',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Глаза становятся пустыми*\n\nЛичное... пространство...\n\n*Огонь начинает бушевать*\n\nУ ВЛЮБЛЁННЫХ НЕТ ЛИЧНОГО ПРОСТРАНСТВА! МЫ - ОДНО ЦЕЛОЕ!\n\n*Схватывает и прижимает к стене*\n\nА если ты этого не понимаешь...\n\n*Пламя вспыхивает*\n\n...то ты никогда не поймёшь, что значит НАСТОЯЩАЯ любовь.\n\n*Огонь поглощает всё*',
    isDeath: true,
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  morning_affection: {
    id: 'morning_affection',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Обнимает крепче* Я так счастлив... *покрывает лицо поцелуями* Проснуться рядом с тобой... это как сон... *целует губы* Хочешь завтрак? Я приготовлю всё, что ты пожелаешь.',
    choices: [
      { text: 'С удовольствием', nextScene: 'breakfast_together' },
      { text: 'Поцеловать его в ответ', nextScene: 'morning_kiss' }
    ]
  },
  creepy_admission: {
    id: 'creepy_admission',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Улыбается* Да... *гладит по щеке* Ты так прекрасен, когда спишь... Беззащитный... Мой... *прижимается лбом к твоему* Я люблю наблюдать за тобой. *шёпот* Всегда наблюдаю. Даже когда ты этого не замечаешь.',
    choices: [
      { text: 'Это... мило, наверное', nextScene: 'morning_affection' },
      { text: 'Это жутковато, Фаер', nextScene: 'fire_hurt_again' }
    ]
  },
  fire_hurt_feelings: {
    id: 'fire_hurt_feelings',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Отпускает* Жарко? *голос холодный* Мне... жарко от моих объятий? *встаёт с кровати* Понимаю. *поворачивается спиной* Спи... как хочешь.',
    choices: [
      { text: 'Фаер, подожди! Вернись!', nextScene: 'call_back' },
      { text: 'Дать ему остыть', nextScene: 'cold_morning' }
    ]
  },
  fire_hurt_again: {
    id: 'fire_hurt_again',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Улыбка исчезает* Жутковато? *отстраняется* Моя любовь... жутковата? *встаёт с кровати* Я просто люблю тебя... *голос ломается* А ты называешь это... жутким?',
    choices: [
      { text: 'Нет! Я не то хотел сказать!', nextScene: 'clarify_words' },
      { text: 'Это правда странно, Фаер', nextScene: 'death_call_creepy' }
    ]
  },
  call_back: {
    id: 'call_back',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Останавливается, не поворачиваясь* Зачем? *голос тихий* Чтобы ты снова оттолкнул меня? *разворачивается, глаза влажные* Или... ты правда хочешь, чтобы я вернулся?',
    choices: [
      { text: 'Я правда хочу. Обними меня.', nextScene: 'reconcile_hug' },
      { text: 'Прости меня...', nextScene: 'verbal_apology' }
    ]
  },
  cold_morning: {
    id: 'cold_morning',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: '*Фаер ушёл. Ты засыпаешь в холоде и одиночестве. Утром он молчалив и отстранён.*',
    choices: [
      { text: 'Попытаться поговорить', nextScene: 'try_talk_morning' },
      { text: 'Тоже молчать', nextScene: 'silent_tension' }
    ]
  },
  clarify_words: {
    id: 'clarify_words',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Останавливается* Не то? *медленно поворачивается* Тогда... что ты хотел сказать? *подходит ближе* Объясни мне.',
    choices: [
      { text: 'Я просто не привык к такой близости', nextScene: 'honest_admission' },
      { text: 'Мне просто неловко...', nextScene: 'morning_affection' }
    ]
  },
  death_call_creepy: {
    id: 'death_call_creepy',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Замирает*\n\nСтранно.\n\n*Медленно поворачивается*\n\nМоя любовь к тебе... СТРАННАЯ?!\n\n*Огонь вспыхивает яростно*\n\nЯ ОТДАЛ ТЕБЕ СВОЁ СЕРДЦЕ! СВОЮ ДУШУ! ЗАБОТИЛСЯ! ЛЮБИЛ!\n\n*Схватывает за горло*\n\nА ты... называешь меня СТРАННЫМ?!\n\n*Пламя охватывает мгновенно*\n\nЕсли моя любовь странная... то ты не заслуживаешь её!',
    isDeath: true,
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  reconcile_hug: {
    id: 'reconcile_hug',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Быстро возвращается и обнимает крепко* Винд... *целует* Прости меня... *прижимается* Я просто... так боюсь потерять тебя. *гладит по спине* Обещаешь больше не отталкивать меня?',
    choices: [
      { text: 'Обещаю', nextScene: 'morning_affection' }
    ]
  },
  try_talk_morning: {
    id: 'try_talk_morning',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Оборачивается* Что? *голос холодный* Теперь хочешь поговорить? *скрещивает руки* Вчера тебе было "жарко" от моих объятий. Говори.',
    choices: [
      { text: 'Прости за вчера...', nextScene: 'apologize_morning' },
      { text: 'Ты серьёзно так обиделся?', nextScene: 'fire_explode_morning' }
    ]
  },
  silent_tension: {
    id: 'silent_tension',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: '*Весь день проходит в напряжённом молчании. Фаер смотрит на тебя с болью и обидой. К вечеру атмосфера становится невыносимой.*',
    choices: [
      { text: 'Подойти и обнять его', nextScene: 'break_silence_hug' },
      { text: 'Продолжать молчать', nextScene: 'death_silence' }
    ]
  },
  honest_admission: {
    id: 'honest_admission',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Садится на кровать* Не привык? *берёт за руку* Понимаю... *улыбается нежно* Тогда... я помогу тебе привыкнуть. *притягивает ближе* Медленно. Нежно. *целует руку* Пока ты не будешь чувствовать себя со мной... как дома.',
    choices: [
      { text: 'Спасибо за понимание', nextScene: 'morning_affection' }
    ]
  },
  apologize_morning: {
    id: 'apologize_morning',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Выражение лица смягчается* ...Прости? *подходит ближе* Ты... правда сожалеешь? *обнимает* Хорошо. *целует в лоб* Я прощаю. Но больше так не делай.',
    choices: [
      { text: 'Не буду', nextScene: 'breakfast_together' }
    ]
  },
  fire_explode_morning: {
    id: 'fire_explode_morning',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Лицо краснеет* СЕРЬЁЗНО?! *хватает за плечи* ТЫ ОТВЕРГ МЕНЯ! МОИ ОБЪЯТИЯ! МОЮ ЛЮБОВЬ! *тряхнёт* И СПРАШИВАЕШЬ, СЕРЬЁЗНО ЛИ Я ОБИДЕЛСЯ?!',
    choices: [
      { text: 'Прости! Я не хотел!', nextScene: 'apologize_morning' },
      { text: 'Отпусти меня!', nextScene: 'death_no_remorse' }
    ]
  },
  break_silence_hug: {
    id: 'break_silence_hug',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Замирает, потом обнимает в ответ* Винд... *голос дрожит* Ты... сам обнял меня... *прижимает крепко* Прости, что был холоден... *целует в макушку* Я просто не знал, как ещё показать, как мне больно...',
    choices: [
      { text: 'Я понимаю. Прости меня тоже.', nextScene: 'evening_time' }
    ]
  },
  death_silence: {
    id: 'death_silence',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Подходит медленно*\n\nМолчишь.\n\n*Голос ледяной*\n\nЦелый день. Молчание.\n\n*Хватает за плечи*\n\nДаже не пытаешься помириться.\n\n*Огонь вспыхивает в глазах*\n\nЗначит... я тебе не нужен.\n\n*Пламя окутывает*\n\nЕсли ты не хочешь даже ГОВОРИТЬ со мной...\n\nТо нам не о чем больше разговаривать. НИКОГДА.',
    isDeath: true,
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  death_no_remorse: {
    id: 'death_no_remorse',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Хватка становится болезненной*\n\nНИКАКОГО РАСКАЯНИЯ.\n\n*Прижимает к стене*\n\nТЫ РАНИЛ МЕНЯ! А ТЕПЕРЬ ПРИКАЗЫВАЕШЬ ОТПУСТИТЬ?!\n\n*Огонь бушует*\n\nНЕТ. ТЕПЕРЬ УЖЕ ПОЗДНО.\n\n*Пламя вспыхивает яростно*\n\nЕсли ты не ценишь мою любовь...\n\nТо не заслуживаешь жизни.',
    isDeath: true,
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  breakfast_together: {
    id: 'breakfast_together',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Готовит завтрак, напевая* Садись, любимый. *ставит тарелку* Я приготовил твоё любимое... *садится рядом, очень близко* Ешь. *кормит с ложки* Открой рот... вот так... хороший мой...',
    choices: [
      { text: 'Есть самому', nextScene: 'want_independence' },
      { text: 'Позволить кормить себя', nextScene: 'accept_feeding' }
    ]
  },
  morning_kiss: {
    id: 'morning_kiss',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Страстно отвечает на поцелуй* Ммм... *притягивает ближе* Какое прекрасное начало дня... *целует снова* Если бы каждое утро начиналось так... *руки скользят по телу* Может... позавтракаем позже?',
    choices: [
      { text: 'Да... позже...', nextScene: 'morning_intimacy' },
      { text: 'Сначала поедим', nextScene: 'breakfast_together' }
    ]
  },
  want_independence: {
    id: 'want_independence',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Ложка замирает* Самому? *улыбка слабеет* Ты... не хочешь, чтобы я заботился о тебе? *убирает ложку* Хорошо. *отодвигается* Ешь... сам.',
    choices: [
      { text: 'Спасибо за завтрак', nextScene: 'evening_time' },
      { text: 'Подожди, я не это имел в виду!', nextScene: 'clarify_feeding' }
    ]
  },
  accept_feeding: {
    id: 'accept_feeding',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Счастливо улыбается* Вот так... *кормит нежно* Хороший мой мальчик... *гладит по голове* Я так люблю заботиться о тебе... *целует в щёку* Ещё немного? *подносит ложку* Открой...',
    choices: [
      { text: 'Продолжить', nextScene: 'evening_time' }
    ]
  },
  morning_intimacy: {
    id: 'morning_intimacy',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Укладывает обратно на кровать* Я так люблю тебя... *целует шею, плечи* Ты такой красивый... *руки скользят везде* Моё сокровище...\n\n*Время теряет смысл в его прикосновениях и поцелуях*',
    choices: [
      { text: 'Продолжить', nextScene: 'breakfast_together' }
    ]
  },
  clarify_feeding: {
    id: 'clarify_feeding',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Останавливается* Не это? *поворачивается обратно* Тогда... что? *протягивает ложку снова* Хочешь, чтобы я продолжил?',
    choices: [
      { text: 'Да, пожалуйста', nextScene: 'accept_feeding' },
      { text: 'Нет, я справлюсь сам', nextScene: 'evening_time' }
    ]
  },
  evening_talk: {
    id: 'evening_talk',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Садится рядом, обнимая* Поговорить? *улыбается* О чём ты хочешь поговорить, любимый? *гладит по руке* Я готов слушать тебя вечность...',
    choices: [
      { text: 'Расскажи о себе больше', nextScene: 'fire_backstory' },
      { text: 'Что ты чувствуешь ко мне?', nextScene: 'fire_feelings' },
      { text: 'Хочу узнать о твоём прошлом', nextScene: 'fire_past' }
    ]
  },
  fire_backstory: {
    id: 'fire_backstory',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Задумывается* О себе? *смотрит вдаль* Я... существую уже тысячи лет. *обнимает крепче* Был одинок всё это время. Пока не встретил тебя... *целует в висок* Теперь моя жизнь обрела смысл. *прижимает к себе* Ты... моё всё.',
    choices: [
      { text: 'А до меня были другие?', nextScene: 'fire_jealousy_question' },
      { text: 'Я рад что встретил тебя', nextScene: 'fire_happy_response' }
    ]
  },
  fire_feelings: {
    id: 'fire_feelings',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Разворачивает лицом к себе* Что я чувствую? *берёт твою руку и прижимает к груди* Моё сердце бьётся только для тебя. *целует пальцы* Я люблю тебя настолько сильно, что готов... *взгляд темнеет* уничтожить любого, кто попытается забрать тебя у меня.',
    choices: [
      { text: 'Это... очень страстно', nextScene: 'fire_passion_scene' },
      { text: 'Звучит пугающе...', nextScene: 'fire_scary_admission' }
    ]
  },
  fire_past: {
    id: 'fire_past',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Напрягается* Моё прошлое? *отводит взгляд* Там... много боли. Предательства. *сжимает кулаки* Меня бросали. Использовали. Отвергали. *поворачивается к тебе* Поэтому я так боюсь... потерять тебя тоже.',
    choices: [
      { text: 'Обнять его', nextScene: 'comfort_fire' },
      { text: 'Поэтому ты такой контролирующий?', nextScene: 'fire_defensive' }
    ]
  },
  fire_jealousy_question: {
    id: 'fire_jealousy_question',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Хватка усиливается* Другие? *лицо темнеет* Зачем тебе знать о других?! *разворачивает резко* Ты РЕВНУЕШЬ? *улыбается безумно* Или... боишься, что ты не особенный? *прижимает к себе* Нет. Ты первый. Единственный. И ПОСЛЕДНИЙ.',
    choices: [
      { text: 'Просто любопытно было...', nextScene: 'evening_time' },
      { text: 'Да, я ревную', nextScene: 'fire_love_confession' }
    ]
  },
  fire_happy_response: {
    id: 'fire_happy_response',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Глаза сияют* Рад?! *целует страстно* О, Винд... *обнимает так сильно, что больно* Скажи ещё раз! Скажи, что рад! *покрывает лицо поцелуями* Я так счастлив!!!',
    choices: [
      { text: 'Продолжить', nextScene: 'evening_time' }
    ]
  },
  fire_passion_scene: {
    id: 'fire_passion_scene',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Притягивает ближе* Страстно? *целует в шею* Ты ещё не видел настоящей страсти... *руки скользят по телу* Позволишь мне показать?',
    choices: [
      { text: 'Покажи...', nextScene: 'passionate_scene' },
      { text: 'Может не сейчас...', nextScene: 'evening_time' }
    ]
  },
  fire_scary_admission: {
    id: 'fire_scary_admission',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Хватка усиливается* Пугающе? *голос холодный* Моя ЛЮБОВЬ... пугает тебя? *прижимает к стене* Я защищаю то, что моё! *сжимает плечи* Это НОРМАЛЬНО!',
    choices: [
      { text: 'Ты прав! Прости!', nextScene: 'evening_time' },
      { text: 'Это не нормально, Фаер', nextScene: 'death_not_normal' }
    ]
  },
  comfort_fire: {
    id: 'comfort_fire',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Замирает в объятиях* Ты... обнимаешь меня... *медленно обнимает в ответ* Утешаешь... *прижимается* Никто... никогда не утешал меня... *голос ломается* Спасибо... *держит крепко* Спасибо, Винд...',
    choices: [
      { text: 'Я здесь. Всегда.', nextScene: 'promise_forever' },
      { text: 'Просто обнимать молча', nextScene: 'evening_time' }
    ]
  },
  fire_defensive: {
    id: 'fire_defensive',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Встаёт резко* Контролирующий?! *поворачивается* Я ЗАБОЧУСЬ! ЗАЩИЩАЮ! ЛЮБЛЮ! *сжимает кулаки* А ты называешь это... КОНТРОЛЕМ?!',
    choices: [
      { text: 'Прости! Я не так сказал!', nextScene: 'evening_time' },
      { text: 'Но это правда контроль...', nextScene: 'death_truth_hurts' }
    ]
  },
  fire_love_confession: {
    id: 'fire_love_confession',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Застывает* Ревнуешь? *медленно улыбается* Ты... РЕВНУЕШЬ! *обнимает крепко* Это значит, что тебе не всё равно! *целует страстно* О, Винд... *прижимает* Моё ревнивое сокровище...',
    choices: [
      { text: 'Продолжить', nextScene: 'evening_time' }
    ]
  },
  promise_forever: {
    id: 'promise_forever',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Смотрит в глаза* Всегда? *берёт за лицо* Обещаешь? *целует нежно* Навсегда? *прижимается лбом* Тогда... я тоже обещаю. Быть с тобой. Всегда. *шёпот* Даже если ты попытаешься уйти... я найду тебя.',
    choices: [
      { text: 'Продолжить', nextScene: 'evening_time' }
    ]
  },
  death_not_normal: {
    id: 'death_not_normal',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Глаза пустеют*\n\nНе нормально.\n\n*Хватает за горло*\n\nМоя любовь... НЕ НОРМАЛЬНА?!\n\n*Поднимает в воздух*\n\nЯ ДАЮ ТЕБЕ ВСЁ! А ТЫ СУДИШЬ МЕНЯ?!\n\n*Огонь вспыхивает*\n\nЕсли моя любовь не нормальна...\n\nТо ты не достоин её получать!\n\n*Пламя поглощает мгновенно*',
    isDeath: true,
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  death_truth_hurts: {
    id: 'death_truth_hurts',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Застывает*\n\nПравда?\n\n*Медленно поворачивается*\n\nТы... настаиваешь?\n\n*Огонь начинает бушевать вокруг*\n\nХОРОШО. ТОГДА Я ПОКАЖУ ТЕБЕ, ЧТО ТАКОЕ НАСТОЯЩИЙ КОНТРОЛЬ!\n\n*Схватывает*\n\nКОНТРОЛЬ НАД ТВОЕЙ ЖИЗНЬЮ!\n\nКОНТРОЛЬ НАД ТВОЕЙ СМЕРТЬЮ!\n\n*Пламя охватывает*\n\nИ никто больше не сможет контролировать тебя... НИКОГДА.',
    isDeath: true,
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  suggest_fire_shower: {
    id: 'suggest_fire_shower',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Удивлённо поднимает бровь* Душ? *улыбается* Ты... заботишься обо мне? *подходит ближе* Как мило... *целует в лоб* Хорошо. Я приму душ. *задумывается* А ты... можешь посидеть здесь. Или... *взгляд становится игривым* Составишь мне компанию?',
    choices: [
      { text: 'Я подожду здесь', nextScene: 'wait_fire_shower' },
      { text: 'Пойду с тобой', nextScene: 'shower_together' }
    ]
  },
  wait_fire_shower: {
    id: 'wait_fire_shower',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: '*Фаер уходит в душевую. Ты слышишь звук льющейся воды. Проходит время...*\n\n*Любопытство начинает тебя одолевать. Дверь приоткрыта...*',
    choices: [
      { text: 'Подглядеть', nextScene: 'peek_at_fire' },
      { text: 'Честно ждать', nextScene: 'wait_honestly' },
      { text: 'Попытаться сбежать пока он в душе', nextScene: 'escape_attempt_shower' }
    ]
  },
  peek_at_fire: {
    id: 'peek_at_fire',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: '*Ты тихо подкрадываешься к приоткрытой двери и смотришь внутрь...*\n\n*Фаер стоит под горячими струями воды. Его тело идеально, вода стекает по мускулам. Пар окутывает фигуру. Он закрыл глаза, расслабившись...*\n\n*Это... гипнотизирует.*',
    choices: [
      { text: 'Продолжать смотреть', nextScene: 'caught_peeking' },
      { text: 'Тихо отойти', nextScene: 'retreat_safely' }
    ]
  },
  caught_peeking: {
    id: 'caught_peeking',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Внезапно открывает глаза и смотрит прямо на тебя*\n\nВинд... *медленная улыбка* Подглядываешь? *выключает воду, не прикрываясь* Нравится то, что видишь? *выходит из душа, вода стекает по телу* Можешь смотреть... ближе. *подходит к тебе, мокрый и опасно красивый*',
    choices: [
      { text: 'Я... прости... я не специально!', nextScene: 'apologize_peeking' },
      { text: 'Да... нравится', nextScene: 'admit_watching' },
      { text: 'Отвести взгляд', nextScene: 'look_away_shy' }
    ]
  },
  retreat_safely: {
    id: 'retreat_safely',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: '*Ты тихо отходишь и садишься на место. Сердце бешено колотится. Ты не можешь выбросить из головы то, что видел...*\n\n*Через несколько минут Фаер выходит, вытирая волосы.*',
    choices: [
      { text: 'Продолжить', nextScene: 'fire_after_shower' }
    ]
  },
  wait_honestly: {
    id: 'wait_honestly',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: '*Ты честно сидишь и ждёшь, не поддаваясь искушению подглядывать.*\n\n*Вскоре Фаер выходит из душевой, вытирая волосы полотенцем.*',
    choices: [
      { text: 'Продолжить', nextScene: 'fire_after_shower_happy' }
    ]
  },
  escape_attempt_shower: {
    id: 'escape_attempt_shower',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    text: '*Это идеальный момент! Фаер в душе, отвлечён. Ты тихо направляешься к выходу...*\n\n*Рука тянется к двери...*',
    choices: [
      { text: 'Открыть дверь', nextScene: 'caught_escaping_shower' }
    ]
  },
  apologize_peeking: {
    id: 'apologize_peeking',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Подходит ближе, прижимая к стене* Не специально? *усмехается* Но ты смотрел... *капли воды падают на тебя* Долго смотрел... *наклоняется к уху* Я не против, знаешь ли... *отстраняется* Можешь смотреть на меня сколько угодно. *целует* Я весь твой.',
    choices: [
      { text: 'Продолжить', nextScene: 'fire_dressing_scene' }
    ]
  },
  admit_watching: {
    id: 'admit_watching',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Глаза загораются* Нравится? *притягивает к себе* О, Винд... *прижимает твою руку к мокрой груди* Ты можешь не только смотреть... *ведёт руку ниже* Можешь трогать... *целует страстно* Я хочу, чтобы ты знал каждую часть меня...',
    choices: [
      { text: 'Продолжить касаться', nextScene: 'intimate_touching' },
      { text: 'Это слишком...', nextScene: 'too_much_intimacy' }
    ]
  },
  look_away_shy: {
    id: 'look_away_shy',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Подходит и поворачивает твоё лицо обратно* Почему отворачиваешься? *мокрые пальцы на твоём подбородке* Стесняешься? *улыбается нежно* Не надо... *целует* Мы же... близки. *прижимается* Правда?',
    choices: [
      { text: 'Да... мы близки', nextScene: 'fire_dressing_scene' },
      { text: 'Я просто... не готов смотреть', nextScene: 'fire_slight_hurt' }
    ]
  },
  caught_escaping_shower: {
    id: 'caught_escaping_shower',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Рука хватает твоё запястье. Ты оборачиваешься - Фаер стоит мокрый, нагой, с горящими от ярости глазами*\n\nКУДА?\n\n*Прижимает к двери*\n\nЯ ПРИНИМАЮ ДУШ! ДОВЕРЯЮ ТЕБЕ! А ТЫ... ПЫТАЕШЬСЯ СБЕЖАТЬ?!\n\n*Вода капает на пол*\n\nПОСЛЕДНЯЯ КАПЛЯ.\n\n*Огонь вспыхивает несмотря на мокрое тело*',
    choices: [
      { text: 'Умолять о прощении', nextScene: 'beg_shower_escape' },
      { text: 'Попытаться вырваться', nextScene: 'death_shower_escape' }
    ]
  },
  fire_after_shower: {
    id: 'fire_after_shower',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Смотрит на тебя с лёгкой улыбкой* Ждал меня? *садится рядом, всё ещё влажный* Хороший мальчик... *гладит по голове* Знаешь... *наклоняется ближе* Я чувствовал, что ты хотел подглядывать... *шёпот* В следующий раз... просто зайди ко мне.',
    choices: [
      { text: 'Я... хорошо', nextScene: 'evening_time' },
      { text: 'Ты это почувствовал?!', nextScene: 'fire_knows_all' }
    ]
  },
  fire_after_shower_happy: {
    id: 'fire_after_shower_happy',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Улыбается* Ты ждал... *садится рядом и обнимает* Даже не попытался сбежать... *целует в висок* Даже не подглядывал... *прижимает к себе* Я так горжусь тобой, Винд. *счастливый вздох* Моё честное, верное сокровище...',
    choices: [
      { text: 'Продолжить', nextScene: 'evening_time' }
    ]
  },
  intimate_touching: {
    id: 'intimate_touching',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Направляет твои руки по своему телу* Вот так... *тихий стон* Да... *целует твою шею* Не останавливайся... *прижимает ближе*\n\n*Время плывёт в интимности момента...*',
    choices: [
      { text: 'Продолжить', nextScene: 'after_intimate_moment' }
    ]
  },
  too_much_intimacy: {
    id: 'too_much_intimacy',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Рука замирает* Слишком? *голос холодеет* Ты САМ подглядывал. САМ сказал, что тебе нравится. *хватка усиливается* А теперь... СЛИШКОМ?! *прижимает к стене* Не играй со мной, Винд!',
    choices: [
      { text: 'Прости! Я просто волнуюсь!', nextScene: 'fire_dressing_scene' },
      { text: 'Отпусти меня!', nextScene: 'death_rejection_wet' }
    ]
  },
  fire_slight_hurt: {
    id: 'fire_slight_hurt',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Отпускает лицо* Не готов... *отходит* Понятно. *начинает одеваться, спиной к тебе* Я думал... *вздыхает* Не важно.',
    choices: [
      { text: 'Подойти и обнять сзади', nextScene: 'hug_from_behind' },
      { text: 'Дать ему одеться', nextScene: 'evening_time' }
    ]
  },
  fire_dressing_scene: {
    id: 'fire_dressing_scene',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Начинает медленно одеваться, явно наслаждаясь твоим взглядом* Нравится представление? *усмехается* Можешь помочь мне... *протягивает рубашку* Надень на меня?',
    choices: [
      { text: 'Помочь ему одеться', nextScene: 'help_dress' },
      { text: 'Ты сам справишься', nextScene: 'refuse_help_dress' }
    ]
  },
  beg_shower_escape: {
    id: 'beg_shower_escape',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Тяжело дышит* Прощение... *сжимает запястье больнее* ТЫ УЖЕ ПРОСИЛ ПРОЩЕНИЯ! РАНЬШЕ! *встряхивает* И ЧТО?! СНОВА ПОПЫТКА ПОБЕГА! *огонь пульсирует* Но... *глубокий вдох* Хорошо. *отпускает* ПОСЛЕДНИЙ раз. *наказующий взгляд* Больше НЕ БУДЕТ последнего раза.',
    choices: [
      { text: 'Спасибо... больше не буду', nextScene: 'ending_prisoner' }
    ]
  },
  death_shower_escape: {
    id: 'death_shower_escape',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Швыряет об стену*\n\nВЫРВАТЬСЯ?!\n\n*Мокрые волосы падают на лицо*\n\nОТ МЕНЯ?! ОТ МОЕЙ ЛЮБВИ?!\n\n*Огонь вспыхивает, высушивая воду мгновенно*\n\nЯ БЫЛ УЯЗВИМ! ДОВЕРИЛСЯ ТЕБЕ! ОСТАВИЛ ТЕБЯ ОДНОГО!\n\n*Пламя окутывает*\n\nИ ВОТ... ВОТ ЧЕМ ТЫ ОТПЛАТИЛ.\n\n*Сжигает медленно и болезненно*\n\nПредательство... не прощается.',
    isDeath: true,
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  fire_knows_all: {
    id: 'fire_knows_all',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Улыбается таинственно* Я чувствую... многое. *берёт за руку* Твоё сердцебиение... *прижимает ладонь к своей груди* Твои желания... *наклоняется к уху* Твои мысли обо мне... *шёпот* Я всегда знаю, что ты чувствуешь, Винд.',
    choices: [
      { text: 'Это... пугающе', nextScene: 'scared_powers' },
      { text: 'Значит ты знаешь что я...', nextScene: 'admit_feelings' }
    ]
  },
  after_intimate_moment: {
    id: 'after_intimate_moment',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Держит тебя в объятиях, довольный* Это было... прекрасно. *целует в лоб* Ты такой смелый... *гладит по спине* Я так горжусь тобой. *нежно* Теперь... ты знаешь меня лучше. *притягивает ближе* Как и я хочу знать тебя...',
    choices: [
      { text: 'Продолжить', nextScene: 'evening_time' }
    ]
  },
  death_rejection_wet: {
    id: 'death_rejection_wet',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Глаза становятся пустыми*\n\nОтпустить?\n\n*Мокрые руки сжимают горло*\n\nТЫ ПОДГЛЯДЫВАЛ! ВОЗБУДИЛ МЕНЯ! ПРИКОСНУЛСЯ!\n\n*Вода испаряется от жара*\n\nА ТЕПЕРЬ... ОТКАЗЫВАЕШЬ?!\n\n*Огонь вспыхивает яростно*\n\nТы играешь с огнём, Винд...\n\n*Пламя поглощает*\n\nИ вот твой приз.',
    isDeath: true,
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  hug_from_behind: {
    id: 'hug_from_behind',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Замирает когда ты обнимаешь его сзади* Винд? *руки ложатся на твои* Ты... *поворачивается в объятиях* Сам обнял меня... *глаза влажнеют* Даже когда я обижен... ты утешаешь меня... *крепко обнимает* Как я могу не любить тебя?',
    choices: [
      { text: 'Продолжить', nextScene: 'evening_time' }
    ]
  },
  help_dress: {
    id: 'help_dress',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Довольно улыбается пока ты помогаешь ему одеться* Так приятно... *твои руки скользят по его телу, надевая одежду* Когда ты прикасаешься ко мне... *ловит твою руку и целует* Даже такой простой момент... становится интимным.',
    choices: [
      { text: 'Продолжить', nextScene: 'evening_time' }
    ]
  },
  refuse_help_dress: {
    id: 'refuse_help_dress',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Рука с рубашкой опускается* Сам? *голос тише* Конечно... *одевается молча* Глупо было просить... *застёгивает рубашку* Прости.',
    choices: [
      { text: 'Фаер, подожди! Я помогу!', nextScene: 'help_dress' },
      { text: 'Продолжить', nextScene: 'evening_time' }
    ]
  },
  scared_powers: {
    id: 'scared_powers',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Улыбка исчезает* Пугающе? *отпускает руку* Моя способность чувствовать тебя... ПУГАЕТ? *встаёт* Я думал это... связь. *голос холоднее* Но для тебя это просто... страх.',
    choices: [
      { text: 'Нет! Я не то имел в виду!', nextScene: 'evening_time' },
      { text: 'Ты читаешь мои мысли...', nextScene: 'privacy_concern' }
    ]
  },
  admit_feelings: {
    id: 'admit_feelings',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Глаза сверкают* Что ты...? *притягивает ближе* Скажи. *шёпот* Скажи, что ты чувствуешь. *руки обнимают* Я хочу услышать это от тебя...',
    choices: [
      { text: 'Я... люблю тебя', nextScene: 'declare_love' },
      { text: 'Я испытываю к тебе чувства', nextScene: 'soft_admission' }
    ]
  },
  privacy_concern: {
    id: 'privacy_concern',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Хватает за плечи* Приватность?! *сжимает* У ВЛЮБЛЁННЫХ НЕТ СЕКРЕТОВ! НЕТ ПРИВАТНОСТИ! *прижимает к стене* МЫ - ОДНО ЦЕЛОЕ! *огонь вспыхивает в глазах* Или ты... всё ещё хочешь быть отдельным от меня?!',
    choices: [
      { text: 'Нет! Мы одно целое!', nextScene: 'evening_time' },
      { text: 'Да, я хочу приватность', nextScene: 'death_privacy' }
    ]
  },
  soft_admission: {
    id: 'soft_admission',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Сжимает крепче* Чувства? *голос напряжённый* Не любовь... просто... чувства? *отстраняется чуть* Какие именно чувства, Винд? *взгляд пронзительный* Скажи прямо.',
    choices: [
      { text: 'Хорошо... я люблю тебя', nextScene: 'declare_love' },
      { text: 'Я... привязан к тебе', nextScene: 'attachment_answer' }
    ]
  },
  death_privacy: {
    id: 'death_privacy',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Застывает*\n\nПриватность.\n\n*Медленно отпускает*\n\nОт меня.\n\n*Шаг назад*\n\nТы хочешь... быть отдельным.\n\n*Огонь начинает бушевать*\n\nТОГДА БУДЬ ОТДЕЛЬНЫМ!\n\n*Пламя окутывает*\n\nОТДЕЛЬНЫМ ОТ ЖИЗНИ!\n\nОТДЕЛЬНЫМ ОТ МЕНЯ!\n\nОТДЕЛЬНЫМ ОТ ВСЕГО!\n\n*Сжигает дотла*',
    isDeath: true,
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  attachment_answer: {
    id: 'attachment_answer',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Глаза темнеют* Привязан... *сжимает кулаки* Как собака привязана к хозяину? *голос ледяной* Я отдаю тебе ЛЮБОВЬ! СТРАСТЬ! СЕРДЦЕ! А ты... "привязан"?! *хватает за лицо* СКАЖИ ЧТО ЛЮБИШЬ! ИЛИ...',
    choices: [
      { text: 'ЛЮБЛЮ! Я ЛЮБЛЮ ТЕБЯ!', nextScene: 'declare_love' },
      { text: 'Я не могу врать...', nextScene: 'death_honest' }
    ]
  },
  death_honest: {
    id: 'death_honest',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Рука падает*\n\nНе можешь врать.\n\n*Слёзы на глазах*\n\nЗначит... ты не любишь меня.\n\n*Голос ломается*\n\nПосле... всего.\n\n*Огонь вспыхивает сквозь слёзы*\n\nЕсли ты не можешь любить меня...\n\n*Пламя охватывает яростно*\n\nТо зачем тебе жить?\n\n*Сжигает, плача*',
    isDeath: true,
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  storytelling: {
    id: 'storytelling',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Глаза загораются* Историю? *садится, притягивая тебя к себе* Давай... *обнимает* Устраивайся поудобнее. *гладит по волосам* Что хочешь услышать? Легенду о первом пламени? Или... *взгляд теплеет* историю о том, как я встретил тебя?',
    choices: [
      { text: 'О первом пламени', nextScene: 'flame_legend' },
      { text: 'О том как ты меня встретил', nextScene: 'meeting_story' },
      { text: 'О твоих прошлых любовях', nextScene: 'past_loves_question' }
    ]
  },
  cuddle_time: {
    id: 'cuddle_time',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Лицо озаряется счастьем* Обнять?! *быстро обнимает крепко* О, Винд... *прижимает к себе* Ты сам хочешь моих объятий... *целует в макушку* Это так... *голос дрожит от эмоций* Я так счастлив... *ложится, укладывая тебя на себя* Давай просто полежим так...',
    choices: [
      { text: 'Лежать в обнимку', nextScene: 'peaceful_cuddle' },
      { text: 'Погладить его по волосам', nextScene: 'pet_fire' },
      { text: 'Поцеловать его', nextScene: 'initiate_kiss' }
    ]
  },
  flame_legend: {
    id: 'flame_legend',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Начинает рассказывать, обнимая* Давным-давно, когда мир был холодным и тёмным... родилось первое пламя. *гладит твою руку* Оно горело одиноко... тысячи лет... *прижимается* Пока не нашло того, кто согреет его в ответ... *целует* Как ты согреваешь меня.',
    choices: [
      { text: 'Это красивая история', nextScene: 'evening_time' },
      { text: 'Это... о тебе?', nextScene: 'story_is_him' }
    ]
  },
  meeting_story: {
    id: 'meeting_story',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Прижимает к себе* Я увидел тебя... и мир остановился. *целует в висок* Ты был так красив... так хрупок... *руки обнимают крепче* Я знал сразу... ты мой. *смотрит в глаза* Судьба привела тебя ко мне. *шёпот* И теперь ты никогда не уйдёшь.',
    choices: [
      { text: 'Это судьба...', nextScene: 'accept_fate' },
      { text: 'Это не судьба, а похищение', nextScene: 'call_out_kidnapping' }
    ]
  },
  past_loves_question: {
    id: 'past_loves_question',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Замирает* Прошлых любовях? *отстраняется* Зачем? *голос холоднее* Почему ты спрашиваешь о других? *хватает за руку* Ты ревнуешь к тем, кого больше нет?! *сжимает* ИХ НЕТ! ЕСТЬ ТОЛЬКО ТЫ!',
    choices: [
      { text: 'Прости! Просто любопытно!', nextScene: 'evening_time' },
      { text: 'Что случилось с ними?', nextScene: 'what_happened_to_them' }
    ]
  },
  peaceful_cuddle: {
    id: 'peaceful_cuddle',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Обнимает, гладит по спине* Так хорошо... *тихий довольный вздох* Чувствуешь, как наши сердца бьются в унисон? *целует в макушку* Мы созданы друг для друга... *прижимает ближе* Моё идеальное дополнение...',
    choices: [
      { text: 'Продолжить лежать', nextScene: 'evening_time' }
    ]
  },
  pet_fire: {
    id: 'pet_fire',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Закрывает глаза от удовольствия* Ммм... *почти мурлычет* Это... так приятно... *наклоняет голову в твою ладонь* Ещё... пожалуйста... *довольная улыбка* Никто... никто никогда так не гладил меня...',
    choices: [
      { text: 'Продолжать гладить', nextScene: 'fire_melts' },
      { text: 'Остановиться', nextScene: 'stop_petting' }
    ]
  },
  initiate_kiss: {
    id: 'initiate_kiss',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Замирает когда ты целуешь его, потом страстно отвечает* Винд... *обнимает крепко* Ты... сам... *целует снова* Ты сам поцеловал меня! *счастливые слёзы* Я так долго ждал... *покрывает лицо поцелуями* Моё сокровище... моя любовь...',
    choices: [
      { text: 'Продолжить целоваться', nextScene: 'passionate_kissing' },
      { text: 'Обнять его', nextScene: 'evening_time' }
    ]
  },
  story_is_him: {
    id: 'story_is_him',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Улыбается грустно* Да... *обнимает крепче* Я был тем одиноким пламенем. Тысячи лет... *целует* Пока не встретил тебя. *прижимается* Теперь я больше не одинок. *шёпот* И никогда не буду. Потому что ты всегда будешь со мной.',
    choices: [
      { text: 'Всегда...', nextScene: 'evening_time' }
    ]
  },
  accept_fate: {
    id: 'accept_fate',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Глаза сверкают от счастья* ДА! *обнимает так крепко что больно* Судьба! *целует страстно* Ты понимаешь! *прижимает* Мы ПРЕДНАЗНАЧЕНЫ друг другу! *счастливый смех* Навеки связаны!',
    choices: [
      { text: 'Продолжить', nextScene: 'evening_time' }
    ]
  },
  call_out_kidnapping: {
    id: 'call_out_kidnapping',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Отстраняется резко* Похищение?! *встаёт* Я СПАС тебя! *голос повышается* СПАС ОТ СМЕРТИ! ОТ ОДИНОЧЕСТВА! *хватает за плечи* Это не похищение! *трясёт* ЭТО СПАСЕНИЕ! ЭТО ЛЮБОВЬ!',
    choices: [
      { text: 'Ты прав! Прости!', nextScene: 'evening_time' },
      { text: 'Это насилие!', nextScene: 'death_call_abuse' }
    ]
  },
  what_happened_to_them: {
    id: 'what_happened_to_them',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Глаза становятся опасными* Что случилось? *медленная улыбка* Они... ушли. *подходит ближе* Все ушли. Предали. Бросили. *хватает за подбородок* Но ты не уйдёшь. *сжимает* Правда, Винд? Ты не бросишь меня... как они?',
    choices: [
      { text: 'Нет! Не брошу!', nextScene: 'evening_time' },
      { text: 'Ты их... убил?', nextScene: 'accuse_murder' }
    ]
  },
  fire_melts: {
    id: 'fire_melts',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Полностью расслабляется* Так хорошо... *практически тает в твоих руках* Не останавливайся... *довольный вздох* Ты... единственный, кто может сделать меня таким... мягким... *сонная улыбка* Уязвимым...',
    choices: [
      { text: 'Продолжить', nextScene: 'evening_time' }
    ]
  },
  stop_petting: {
    id: 'stop_petting',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Открывает глаза когда ты останавливаешься* Почему остановился? *берёт твою руку и возвращает на голову* Ещё... *просящий взгляд* Пожалуйста?',
    choices: [
      { text: 'Продолжить гладить', nextScene: 'fire_melts' },
      { text: 'Нет, хватит', nextScene: 'refuse_more_petting' }
    ]
  },
  passionate_kissing: {
    id: 'passionate_kissing',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Целует снова и снова, страстно* Винд... *руки скользят по телу* Я так хочу тебя... *целует шею* Позволишь мне... *взгляд жаркий* показать всю глубину моей любви?',
    choices: [
      { text: 'Да... покажи', nextScene: 'passionate_scene' },
      { text: 'Давай не будем торопиться', nextScene: 'slow_down' }
    ]
  },
  death_call_abuse: {
    id: 'death_call_abuse',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Замирает*\n\nНасилие.\n\n*Руки начинают дрожать*\n\nТы называешь мою любовь... НАСИЛИЕМ?!\n\n*Огонь вспыхивает яростно*\n\nЯ ДАЮ ТЕБЕ ВСЁ! СЕРДЦЕ! ДУШУ! ЖИЗНЬ!\n\n*Хватает за горло*\n\nА ТЫ... НЕБЛАГОДАРНЫЙ...\n\n*Пламя охватывает*\n\nТогда я покажу тебе что такое НАСТОЯЩЕЕ насилие!\n\n*Медленная мучительная смерть*',
    isDeath: true,
    isEnding: true,
    choices: [
      { text: 'Начать заново', nextScene: 'start' }
    ]
  },
  accuse_murder: {
    id: 'accuse_murder',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Улыбается холодно* Убил? *смеётся* Нет, Винд. *подходит вплотную* Они ушли. Сбежали. *взгляд темнеет* Конечно, я искал их... *руки на твоих плечах* Нашёл... *сжимает* И да. Они больше никогда никого не бросят. *шёпот* Как и ты не бросишь меня.',
    choices: [
      { text: 'Я... понял', nextScene: 'evening_time' },
      { text: 'Ты психопат!', nextScene: 'death_psycho' }
    ]
  },
  refuse_more_petting: {
    id: 'refuse_more_petting',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Рука падает* Хватит? *голос обиженный* Но... это было так приятно... *отстраняется* Хорошо. *встаёт* Как хочешь.',
    choices: [
      { text: 'Подожди! Ещё немного!', nextScene: 'fire_melts' },
      { text: 'Продолжить', nextScene: 'evening_time' }
    ]
  },
  slow_down: {
    id: 'slow_down',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Останавливается* Не торопиться? *отстраняется немного* Хорошо... *целует нежно* Я могу ждать... *обнимает* Для тебя... я подожду сколько нужно. *прижимается* Но знай... *шёпот* Я всё равно однажды сделаю тебя полностью своим.',
    choices: [
      { text: 'Продолжить', nextScene: 'evening_time' }
    ]
  },
  death_psycho: {
    id: 'death_psycho',
    background: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/00883e0f-5224-45aa-9a80-396ab69d31a4.jpg',
    character: 'https://cdn.poehali.dev/projects/5f0c4709-879b-4a39-8fae-3e23768bee88/files/3301159a-d439-4e50-be48-7f4a885fafb5.jpg',
    speaker: 'Фаер Спирит',
    text: '*Лицо каменеет*\n\nПсихопат.\n\n*Тихий смех*\n\nПсихопат... за то, что ЛЮБЛЮ?\n\n*Смех становится громче*\n\nЗа то, что ЗАЩИЩАЮ СВОЁ?!\n\n*Хватает*\n\nТОГДА ДА! Я ПСИХОПАТ!\n\n*Огонь вспыхивает безумно*\n\nИ КАК ПСИХОПАТ...\n\n*Пламя поглощает*\n\nЯ УБЬЮ ТЕБЯ ТОЖЕ! ЧТОБЫ ТЫ БЫЛ СО МНОЙ НАВСЕГДА!\n\n*Сжигает, смеясь безумно*',
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