import { normaliseChapter } from './normaliseChapter';
import { sortRange } from './internal';
import { BookId, Range } from '../types';

/**
 * Ensures provided `chapterRange` is within the scope of the provided `bookId`.
 */
export function normaliseChapterRange(
  chapterRange: Range,
  bookId: BookId,
): Range {
  if (!Array.isArray(chapterRange)) {
    throw new Error(
      'Invalid chapter range provided to normaliseChapterRange().',
    );
  }

  const sortedRange = sortRange(chapterRange);

  return [
    normaliseChapter(bookId, sortedRange[0]),
    normaliseChapter(bookId, sortedRange[1]),
  ];
}
