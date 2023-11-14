import { BookId } from '../types';
import { joinedBooks } from '../data/bookGroups';

export function isBookJoinable(bookId: BookId) {
  return joinedBooks.flat().includes(bookId);
}
