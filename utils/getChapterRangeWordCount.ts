import { BookId } from '../types';
import { Bible } from '../Bible';

/**
 * Returns the word count of the chapters between the provided
 * `chapterStart` and `chapterEnd`, in the provided `bookId`.
 */
export function getChapterRangeWordCount(
  bookId: BookId,
  chapterStart: number,
  chapterEnd: number,
): number {
  if (
    !Bible.isValidBook(bookId) ||
    typeof chapterStart !== 'number' ||
    typeof chapterEnd !== 'number' ||
    chapterStart > chapterEnd
  ) {
    return 0;
  }

  let count = 0;

  for (let chapter = chapterStart; chapter <= chapterEnd; chapter++) {
    count += Bible.chapter(bookId, chapter).wordCount;
  }

  return count;
}
