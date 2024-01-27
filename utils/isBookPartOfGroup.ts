import { groupedBooks } from '../data/bookGroups';
import { BookId } from '../types';
import { isBookJoinable } from './isBookJoinable';

export function isBookPartOfGroup(bookId: BookId) {
   const isGroupedBook = groupedBooks.flat().includes(bookId);
   const isJoinedBook = isBookJoinable(bookId);
   return isGroupedBook || isJoinedBook;
}
