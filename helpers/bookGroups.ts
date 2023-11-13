import { Bible } from '../Bible';
import { BibleBookNameLength } from '../enums';
import { BibleBookNameLengthValue, BookId } from '../types';

type BookIdGroup = readonly BookId[];

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
const GROUPED_BOOKS: readonly BookIdGroup[] = [
  [9, 10],
  [11, 12],
  [13, 14],
  [46, 47],
  [52, 53],
  [54, 55],
  [60, 61],
  [62, 63, 64],
] as const;

/**
 *  Books that can be joined together when naming
 *  i.e.  Ezra / Nehemiah
 */
const JOINED_BOOKS: readonly BookIdGroup[] = [[15, 16]] as const;

export function isBookJoinable(bookId: BookId) {
  return JOINED_BOOKS.flat().includes(bookId);
}

export function isBookPartOfGroup(bookId: BookId) {
  const isGroupedBook = GROUPED_BOOKS.flat().includes(bookId);
  const isJoinedBook = isBookJoinable(bookId);
  return isGroupedBook || isJoinedBook;
}

/**
 * Returns an array of the bookIds in a book group.
 */
export function getBookGroup(bookId: BookId): BookIdGroup | undefined {
  if (!isBookPartOfGroup(bookId)) return [bookId];

  const isJoinedBook = isBookJoinable(bookId);
  const groups = isJoinedBook ? JOINED_BOOKS : GROUPED_BOOKS;

  return groups.find((group) => group.includes(bookId));
}

/**
 * Returns the name of a book group.
 */
export function getBookGroupName(
  bookId: BookId,
  length: BibleBookNameLengthValue = BibleBookNameLength.FULL,
) {
  if (!isBookPartOfGroup(bookId)) return undefined;

  const isJoinedBook = isBookJoinable(bookId);

  const group = getBookGroup(bookId);

  if (!group) return undefined;

  if (isJoinedBook && group[0] && group[1]) {
    return `${Bible.book(group[0]).name}/${!Bible.book(group[1]).name}`;
  }

  const numerals = group.length === 3 ? '1, 2 & 3' : '1 & 2';
  const groupBookName = Bible.book(bookId)!.nameByLength(length).substring(2);
  return `${numerals} ${groupBookName}`;
}
