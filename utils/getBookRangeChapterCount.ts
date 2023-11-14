import { BookId } from '../types';
import { Bible } from '../Bible';

/**
 * Returns the chapter count of the books between the provided
 * `start` and `end` book IDs.
 */
export function getBookRangeChapterCount(start: BookId, end: BookId): number {
  if (!Bible.isValidBook(start) || !Bible.isValidBook(end) || start > end) {
    return 0;
  }

  let count = 0;

  for (let bookId = start; bookId <= end; bookId++) {
    count += Bible.book(bookId).chapterCount;
  }

  return count;
}
