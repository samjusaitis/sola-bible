import { Bible } from '../Bible';
import { BookId } from '../types';

/**
 * Ensure provided `chapter` is within the scope of the provided `bookId`.
 */
export function normaliseChapter(bookId: BookId, chapter: number) {
   const bookChapterCount = Bible.book(bookId)?.chapterCount || 0;
   return Math.min(Math.max(chapter, 1), bookChapterCount);
}
