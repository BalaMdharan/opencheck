export type TextStats = {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
};

export function getTextStats(text: string): TextStats {
  const trimmed = text.trim();
  return {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    words: trimmed ? trimmed.split(/\s+/).length : 0,
    sentences: trimmed ? trimmed.split(/[.!?]+\s|[.!?]+$/).filter(Boolean).length : 0,
  };
}

export const MIN_WORDS = 50;
export const MAX_WORDS = 5000;
