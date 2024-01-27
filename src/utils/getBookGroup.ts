import { isBookPartOfGroup } from './isBookPartOfGroup';
import { isBookJoinable } from './isBookJoinable';
import { groupedBooks, joinedBooks } from '../../data/bookGroups';
import { BookGroup, BookId } from '../types';

/**
 * Returns an array of the book in a book group.
 */
export function getBookGroup(book: BookId): BookGroup {
   if (!isBookPartOfGroup(book)) return [book];

   const isJoinedBook = isBookJoinable(book);
   const groups = isJoinedBook ? joinedBooks : groupedBooks;
   const result = groups.find((group) => group.includes(book));

   return result || [book];
}
