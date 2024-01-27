import { sortRange } from './internal';
import { BookId, Range } from '../types';
import { Passage } from '../Passage';

/**
 * Ensures provided `chapterRange` is within the scope of the provided `book`.
 */
export function normaliseChapterRange(
   chapterRange: Range,
   book: BookId,
): Range {
   if (!Array.isArray(chapterRange)) {
      throw new Error(
         'Invalid chapter range provided to normaliseChapterRange().',
      );
   }

   const sortedRange = sortRange(chapterRange);

   return [
      Passage.normaliseChapter(book, sortedRange[0]),
      Passage.normaliseChapter(book, sortedRange[1]),
   ];
}
