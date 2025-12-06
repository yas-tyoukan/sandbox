import { Sprite } from 'pixi.js';
import { STORAGE_KEY_HIGH_SCORES } from '~/constants/gameConfig';

export type Score = {
  name: string;
  value: number;
};

const defaultScores: Score[] = [
  { name: 'Bob', value: 7 },
  { name: 'Chuck', value: 5 },
  { name: 'Cork', value: 4 },
  { name: 'Mondor', value: 4 },
  { name: 'Gunthor', value: 3 },
  { name: 'Katrina', value: 2 },
  { name: 'Verryl', value: 2 },
  { name: 'Evil Overlord', value: 1 },
  { name: 'Sprite', value: 1 },
  { name: 'Slicer', value: 0 },
];

export function getHighScores() {
  const rawScores = localStorage.getItem(STORAGE_KEY_HIGH_SCORES);
  const localScores = rawScores ? JSON.parse(rawScores) : null;
  // ローカル保存されたスコアが10件でなければデフォルトスコアを使う
  const scores: Score[] =
    localScores === null || localScores.length !== 10 ? [...defaultScores] : localScores;
  return scores;
}

export function isInHighScore(level: number) {
  const scores = getHighScores();
  return scores.some((score) => level > score.value);
}

export function addHighScore(name: string, level: number) {
  const scores = getHighScores();
  scores.push({ name, value: level });
  // スコアをレベル順にソートし、上位10件を保存
  scores.sort((a, b) => b.value - a.value);
  const newScores = scores.slice(0, 10);
  localStorage.setItem(STORAGE_KEY_HIGH_SCORES, JSON.stringify(newScores));
}

export function clearHighScores() {
  localStorage.removeItem(STORAGE_KEY_HIGH_SCORES);
}
