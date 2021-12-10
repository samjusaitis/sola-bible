import { books } from '../lib/books';

/**
 * Returns the chapter count for the provided `bookIdStart` and `bookIdEnd`.
 *
 * @param   {number}  bookIdStart
 * @param   {number}  bookIdEnd
 * @returns {number}  chapterCount
 */
export function getBookRangeChapterCount(bookIdStart, bookIdEnd) {
  return books
    .slice(bookIdStart - 1, bookIdEnd)
    .map((book) => book.chapterCount)
    .reduce((a, b) => a + b, 0);
}
