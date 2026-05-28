'use client';

type KanaSelectorState = {
  selected: 'hiragana' | 'katakana';
  selectedSubset: string;
};

type CollectionSelectorState = {
  selectedCollection: string;
  selectedSubunitByUnit: Partial<Record<string, string>>;
};

const KANA_SELECTOR_STORAGE_KEY = 'kana-unit-selector-selection';
const KANJI_SELECTOR_STORAGE_KEY = 'kanji-unit-selector-selection';
const VOCAB_SELECTOR_STORAGE_KEY = 'vocabulary-unit-selector-selection';

const canUseSessionStorage = () => typeof window !== 'undefined';

const readJson = <T>(key: string): T | null => {
  if (!canUseSessionStorage()) return null;

  try {
    const stored = sessionStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : null;
  } catch {
    return null;
  }
};

const writeJson = (key: string, value: unknown) => {
  if (!canUseSessionStorage()) return;

  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Session storage can be unavailable in privacy modes.
  }
};

const remove = (key: string) => {
  if (!canUseSessionStorage()) return;

  try {
    sessionStorage.removeItem(key);
  } catch {
    // Session storage can be unavailable in privacy modes.
  }
};

export const getKanaSelectorState = () =>
  readJson<KanaSelectorState>(KANA_SELECTOR_STORAGE_KEY);

export const saveKanaSelectorState = (state: KanaSelectorState) => {
  writeJson(KANA_SELECTOR_STORAGE_KEY, state);
};

export const clearKanaSelectorState = () => {
  remove(KANA_SELECTOR_STORAGE_KEY);
};

const collectionSelectorKeyByType = {
  kanji: KANJI_SELECTOR_STORAGE_KEY,
  vocabulary: VOCAB_SELECTOR_STORAGE_KEY,
} as const;

type CollectionSelectorContentType = keyof typeof collectionSelectorKeyByType;

export const getCollectionSelectorState = (
  contentType: CollectionSelectorContentType,
) => readJson<CollectionSelectorState>(collectionSelectorKeyByType[contentType]);

export const saveCollectionSelectorState = (
  contentType: CollectionSelectorContentType,
  state: CollectionSelectorState,
) => {
  writeJson(collectionSelectorKeyByType[contentType], state);
};

export const clearCollectionSelectorState = (
  contentType: CollectionSelectorContentType,
) => {
  remove(collectionSelectorKeyByType[contentType]);
};
