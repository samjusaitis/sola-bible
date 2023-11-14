import { BookGroup } from '../../types';

/**
 *  Books that can be grouped together when naming
 *
 *  i.e.  1 & 2 Samuel
 *        1 & 2 Kings
 *        1 & 2 Chronicles
 *        1 & 2 Corinthians
 *        1 & 2 Thessalonians
 *        1 & 2 Timothy
 *        1 & 2 Peter
 *        1, 2 & 3 John
 */
export const groupedBooks = Object.freeze<BookGroup[]>([
  [9, 10],
  [11, 12],
  [13, 14],
  [46, 47],
  [52, 53],
  [54, 55],
  [60, 61],
  [62, 63, 64],
]);
