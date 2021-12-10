import { books } from '../lib/books';

/**
 * Returns the word count for the provided `bookIdStart` and `bookIdEnd`.
 *
 * @param   {number}  bookIdStart
 * @param   {number}  bookIdEnd
 * @returns {number}  wordCount
 */
export function bookRangeWordCount(bookIdStart, bookIdEnd) {
  return books
    .slice(bookIdStart - 1, bookIdEnd)
    .map((book) => book.wordCount)
    .reduce((a, b) => a + b, 0);
}

/**
 * Returns the word count for the provided `startChapter` and `endChapter`
 * within the provided `bookId`.
 *
 * @param   {number}  bookId
 * @param   {number}  startChapter
 * @param   {number}  [endChapter]
 * @returns {number}  wordCount
 */
export function chapterRangeWordCount(bookId, startChapter = 1, endChapter) {
  const bookData = books[bookId - 1];

  if (!bookData) return 0;

  return bookData.chapterWordCounts
    .slice(startChapter - 1, endChapter)
    .reduce((a, b) => a + b, 0);
}
