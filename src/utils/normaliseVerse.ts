import { BookId } from '../types';
import { Bible } from '../Bible';

/**
 * Ensure provided `chapter` is within the scope of the provided `bookId`.
 */
export function normaliseVerse(bookId: BookId, chapter: number, verse: number) {
   const maxVerses = Bible.chapter(bookId, chapter).verseCount;
   return verse > maxVerses ? maxVerses : verse;
}
