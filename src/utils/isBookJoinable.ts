import { BookId } from '../types';
import { joinedBooks } from '../../data/bookGroups';

export function isBookJoinable(book: BookId) {
   return joinedBooks.flat().includes(book);
}
