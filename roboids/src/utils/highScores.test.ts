import { describe, test, expect, beforeEach, vi } from 'vitest';
import { getHighScores, isInHighScore, addHighScore, type Score } from './highScores';
import { STORAGE_KEY_HIGH_SCORES } from '~/constants/gameConfig';

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
  { name: 'Slicer', value: 1 },
];

// localStorage モック
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('ハイスコア機能のテスト', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('getHighScores()', () => {
    test('localStorageに何もなければデフォルトスコアを返す', () => {
      const scores = getHighScores();
      expect(scores).toEqual(defaultScores);
    });

    test('localStorageに10件ちょうどある場合はそれを返す', () => {
      const customScores: Score[] = Array.from({ length: 10 }).map((_, i) => ({
        name: `Player${i}`,
        value: i,
      }));

      localStorage.setItem(STORAGE_KEY_HIGH_SCORES, JSON.stringify(customScores));

      const scores = getHighScores();
      expect(scores).toEqual(customScores);
    });

    test('localStorageの件数が10件でない場合はデフォルトを返す', () => {
      const customScores: Score[] = [{ name: 'OnlyOne', value: 999 }];

      localStorage.setItem(STORAGE_KEY_HIGH_SCORES, JSON.stringify(customScores));

      const scores = getHighScores();
      expect(scores).toEqual(defaultScores);
    });
  });

  describe('isInHighScore()', () => {
    test('スコアが最低値より高ければtrueを返す', () => {
      expect(isInHighScore(100)).toBe(true);
    });

    test('スコアがすべて以下ならfalseを返す', () => {
      expect(isInHighScore(0)).toBe(false);
      expect(isInHighScore(1)).toBe(false);
    });
  });

  describe('addHighScore()', () => {
    test('新しいスコアを追加して上位10件のみを保存する', () => {
      addHighScore('NewPlayer', 999);

      const stored: Score[] = JSON.parse(localStorage.getItem(STORAGE_KEY_HIGH_SCORES) || '[]');

      expect(stored.length).toBe(10);
      expect(stored[0]).toEqual({ name: 'NewPlayer', value: 999 });
    });

    test('スコアが降順にソートされて保存される', () => {
      addHighScore('MidPlayer', 6);

      const stored: Score[] = JSON.parse(localStorage.getItem(STORAGE_KEY_HIGH_SCORES) || '[]');

      for (let i = 0; i < stored.length - 1; i++) {
        expect(stored[i].value).toBeGreaterThanOrEqual(stored[i + 1].value);
      }
    });

    test('低いスコアを追加しても10位圏外なら残らない', () => {
      addHighScore('LowPlayer', -1);

      const stored: Score[] = JSON.parse(localStorage.getItem(STORAGE_KEY_HIGH_SCORES) || '[]');

      const exists = stored.some((s) => s.name === 'LowPlayer');
      expect(exists).toBe(false);
    });
  });
});
