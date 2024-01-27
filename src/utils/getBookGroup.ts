import { isBookPartOfGroup } from './isBookPartOfGroup';
import { isBookJoinable } from './isBookJoinable';
import { groupedBooks, joinedBooks } from '../../data/bookGroups';
import { BookGroup, BookId } from '../types';

/**
 * Returns an array of the bookIds in a book group.
 */
export function getBookGroup(bookId: BookId): BookGroup {
   if (!isBookPartOfGroup(bookId)) return [bookId];

   const isJoinedBook = isBookJoinable(bookId);
   const groups = isJoinedBook ? joinedBooks : groupedBooks;
   const result = groups.find((group) => group.includes(bookId));

   return result || [bookId];
}
