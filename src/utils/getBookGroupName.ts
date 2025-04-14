import { isBookPartOfGroup } from './isBookPartOfGroup';
import { getBookGroup } from './getBookGroup';
import { BibleBookNameLength } from '../enums';
import { BibleBookNameLengthValue, BookId } from '../types';
import { isBookJoinable } from './isBookJoinable';
import { Bible } from '../Bible';

/**
 * Returns the name of a book group.
 */
export function getBookGroupName(
   book: BookId,
   length: BibleBookNameLengthValue = BibleBookNameLength.FULL,
) {
   if (!isBookPartOfGroup(book)) return undefined;

   const isJoinedBook = isBookJoinable(book);

   const group = getBookGroup(book);

   if (!group) return undefined;

   if (isJoinedBook && group[0] && group[1]) {
      return `${Bible.book(group[0]).name}/${Bible.book(group[1]).name}`;
   }

   const numerals = group.length === 3 ? '1, 2 & 3' : '1 & 2';
   const groupBookName = Bible.book(book).nameByLength(length).substring(2);
   return `${numerals} ${groupBookName}`;
}
