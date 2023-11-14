import { Bible } from '../Bible';
import { BookId } from '../types';

/**
 * Returns the word count of the books between the provided
 * `start` and `end` book IDs.
 */
export function getBookRangeWordCount(start: BookId, end: BookId) {
  if (!Bible.isValidBook(start) || !Bible.isValidBook(end) || start > end) {
    return 0;
  }

  let count = 0;

  for (let bookId = start; bookId <= end; bookId++) {
    count += Bible.book(bookId).wordCount;
  }

  return count;
}
