import { books } from '../lib/books';

/**
 * Returns the chapter count for the provided `bookIdStart` and `bookIdEnd`.
 */
export function getBookRangeChapterCount(
  bookIdStart: number,
  bookIdEnd: number,
): number {
  return books
    .slice(bookIdStart - 1, bookIdEnd)
    .map((book) => book.chapterCount)
    .reduce((a, b) => a + b, 0);
}
