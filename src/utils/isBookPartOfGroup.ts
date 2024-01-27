import { groupedBooks } from '../../data/bookGroups';
import { BookId } from '../types';
import { isBookJoinable } from './isBookJoinable';

export function isBookPartOfGroup(book: BookId) {
   const isGroupedBook = groupedBooks.flat().includes(book);
   const isJoinedBook = isBookJoinable(book);
   return isGroupedBook || isJoinedBook;
}
