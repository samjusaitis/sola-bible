import { Bible } from '../Bible';

function sortRange(range) {
  return range[0] > range[1] ? [range[1], range[0]] : [range[0], range[1]];
}

/**
 * Ensure provided `chapter` is within the scope of the provided `bookId`.
 *
 * @param   {number}  bookId
 * @param   {number}  chapter
 * @returns {number}  normalisedChapter
 */
export function normaliseChapter(bookId, chapter) {
  const bookChapterCount = Bible.book(bookId).chapterCount;
  return Math.min(Math.max(chapter, 1), bookChapterCount);
}

/**
 * Ensure provided `chapter` is within the scope of the provided `bookId`.
 *
 * @param   {number}  bookId
 * @param   {number}  chapter
 * @param   {number}  verse
 * @returns {number}  normalisedVerse
 */
export function normaliseVerse(bookId, chapter, verse) {
  const maxVerses = Bible.chapter(bookId, chapter).verseCount;
  return verse > maxVerses ? maxVerses : verse;
}

/**
 * Ensures provided `chapterRange` is within the scope of the provided `bookId`.
 *
 * @param {number[]}  chapterRange
 * @param {number}  bookId
 * @returns {number[] | undefined}  normalisedChapterRange
 */
export function normaliseChapterRange(chapterRange, bookId) {
  if (!Array.isArray(chapterRange)) return undefined;

  const sortedRange = sortRange(chapterRange);

  return [
    normaliseChapter(bookId, sortedRange[0]),
    normaliseChapter(bookId, sortedRange[1]),
  ];
}
