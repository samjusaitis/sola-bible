import { Bible } from '../Bible';
import { BibleSubset } from '../enums';
import { BibleSubsetValue, BookId } from '../types';

/**
 * Returns the relevant smallest BibleSubset that includes the provided
 * `bookRange`.
 */
export function getSubsetFromBookRange(
   bookStart: BookId,
   bookEnd: BookId,
): BibleSubsetValue {
   if (
      typeof bookStart !== 'number' ||
      typeof bookEnd !== 'number' ||
      bookEnd < bookStart ||
      bookStart < Bible.BOOK_START ||
      bookEnd > Bible.BOOK_END
   ) {
      throw new Error(
         'Invalid book range supplied to getSubsetFromBookRange()',
      );
   }

   const inSubset = (subset: BibleSubsetValue) => {
      return (
         bookStart >= Bible.subset(subset).bookStart &&
         bookEnd <= Bible.subset(subset).bookEnd
      );
   };

   const isWithinOT = bookEnd <= Bible.BOOK_OT_END;
   const isWithinNT = bookStart >= Bible.BOOK_NT_START;

   // Handle in Old Testament
   if (isWithinOT) {
      if (inSubset(BibleSubset.TORAH)) {
         return BibleSubset.TORAH;
      }

      if (inSubset(BibleSubset.PROPHETS)) {
         return BibleSubset.PROPHETS;
      }

      if (inSubset(BibleSubset.WISDOM)) {
         if (inSubset(BibleSubset.PSALMS)) {
            return BibleSubset.PSALMS;
         }

         if (inSubset(BibleSubset.PROVERBS)) {
            return BibleSubset.PROVERBS;
         }

         return BibleSubset.WISDOM;
      }

      return BibleSubset.OT;
   }

   // Handle in New Testament
   if (isWithinNT) {
      if (inSubset(BibleSubset.GOSPELS)) {
         return BibleSubset.GOSPELS;
      }

      if (inSubset(BibleSubset.GOSPELS_ACTS)) {
         return BibleSubset.GOSPELS_ACTS;
      }

      if (inSubset(BibleSubset.LETTERS)) {
         return BibleSubset.LETTERS;
      }

      return BibleSubset.NT;
   }

   return BibleSubset.ALL;
}
