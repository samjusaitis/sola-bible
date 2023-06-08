import { Bible } from '../Bible';
import { BookId, Range } from '../types';

function sortRange(range: Range) {
  return range[0] > range[1] ? [range[1], range[0]] : [range[0], range[1]];
}

/**
 * Ensure provided `chapter` is within the scope of the provided `bookId`.
 */
export function normaliseChapter(bookId: BookId, chapter: number) {
  const bookChapterCount = Bible.book(bookId)?.chapterCount || 0;
  return Math.min(Math.max(chapter, 1), bookChapterCount);
}

/**
 * Ensure provided `chapter` is within the scope of the provided `bookId`.
 */
export function normaliseVerse(bookId: BookId, chapter: number, verse: number) {
  const maxVerses = Bible.chapter(bookId, chapter).verseCount;
  return verse > maxVerses ? maxVerses : verse;
}

/**
 * Ensures provided `chapterRange` is within the scope of the provided `bookId`.
 */
export function normaliseChapterRange(
  chapterRange: Range,
  bookId: BookId,
): Range | undefined {
  if (!Array.isArray(chapterRange)) return undefined;

  const sortedRange = sortRange(chapterRange);

  return [
    normaliseChapter(bookId, sortedRange[0]),
    normaliseChapter(bookId, sortedRange[1]),
  ];
}
