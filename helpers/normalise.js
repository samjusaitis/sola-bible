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
    this.normaliseChapter(bookId, sortedRange[0]),
    this.normaliseChapter(bookId, sortedRange[1]),
  ];
}
