import { Bible } from '../Bible';
import { BibleBookNameLength } from '../enums';

// prettier-ignore
/**
 *  Books that can be grouped together when naming
 *  i.e.  1 & 2 Samuel
 *        1 & 2 Kings
 *        1 & 2 Chronicles
 *        1 & 2 Corinthians
 *        1 & 2 Thessalonians
 *        1 & 2 Timothy
 *        1 & 2 Peter
 *        1, 2 & 3 John
 */
const GROUPED_BOOKS = Object.freeze([[9, 10], [11, 12], [13, 14], [46, 47], [52, 53], [54, 55], [60, 61], [62, 63, 64]]);

/**
 *  Books that can be joined together when naming
 *  i.e.  Ezra / Nehemiah
 */
const JOINED_BOOKS = Object.freeze([[15, 16]]);

export function isBookJoinable(bookId) {
  return JOINED_BOOKS.flat().includes(bookId);
}

export function isBookPartOfGroup(bookId) {
  const isGroupedBook = GROUPED_BOOKS.flat().includes(bookId);
  const isJoinedBook = isBookJoinable(bookId);
  return isGroupedBook || isJoinedBook;
}

/**
 * Returns an array of the bookIds in a book group.
 *
 * @param   {number}    bookId
 * @returns {number[]}  bookIds
 */
export function getBookGroup(bookId) {
  if (!isBookPartOfGroup(bookId)) return [bookId];

  const isJoinedBook = isBookJoinable(bookId);
  const groups = isJoinedBook ? JOINED_BOOKS : GROUPED_BOOKS;

  return groups.find((group) => group.includes(bookId));
}

/**
 * Returns the name of a book group.
 *
 * @param   {number}               bookId
 * @param   {BibleBookNameLength}  length
 * @returns {string}               bookGroupName
 */
export function getBookGroupName(bookId, length = BibleBookNameLength.FULL) {
  if (!isBookPartOfGroup(bookId)) return [bookId];

  const isJoinedBook = isBookJoinable(bookId);

  const group = getBookGroup(bookId);

  if (isJoinedBook) {
    return `${Bible.book(group[0]).name}/${Bible.book(group[1]).name}`;
  }

  const numerals = group.length === 3 ? '1, 2 & 3' : '1 & 2';
  const groupBookName = Bible.book(bookId).nameByLength(length).substring(2);
  return `${numerals} ${groupBookName}`;
}
