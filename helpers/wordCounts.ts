import { books } from '../lib/books';
import { BookId } from '../types';

/**
 * Returns the word count for the provided `bookIdStart` and `bookIdEnd`.
 */
export function bookRangeWordCount(bookIdStart: BookId, bookIdEnd: BookId) {
  return books
    .slice(bookIdStart - 1, bookIdEnd)
    .map((book) => book.wordCount)
    .reduce((a, b) => a + b, 0);
}

/**
 * Returns the word count for the provided `startChapter` and `endChapter`
 * within the provided `bookId`.
 */
export function chapterRangeWordCount(
  bookId: BookId,
  startChapter = 1,
  endChapter: number,
): number {
  const bookData = books[bookId - 1];

  if (!bookData) return 0;

  const wordCounts: number[] = bookData.chapterWordCounts.slice(
    startChapter - 1,
    endChapter,
  );

  return wordCounts.reduce((a: number, b: number) => a + b, 0);
}
