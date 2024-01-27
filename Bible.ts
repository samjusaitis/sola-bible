import { BibleSubset, BibleBookNameLength } from './enums';
import {
   BibleBookReturn,
   BibleChapterReturn,
   BibleSubsetReturn,
   BibleSubsetValue,
   BookId,
} from './types';
import { books } from './data/books';
import { subsets } from './data/subsets';

export const Bible = {
   BOOK_START: 1 as const,
   BOOK_END: 66 as const,
   BOOK_OT_END: 39 as const,
   BOOK_NT_START: 40 as const,
   BOOK_COUNT: 66 as const,
   CHAPTER_COUNT: 1189 as const,
   WORD_COUNT: 789634 as const,

   book(bookId: BookId): BibleBookReturn {
      if (!Bible.isValidBook(bookId)) {
         throw new Error('Invalid bookId supplied to Bible.book().');
      }

      const book = books[bookId];

      return {
         name: book.name,
         nameShort: book.nameShort,
         nameAbbr: book.nameAbbr,
         identifier: book.identifier,
         chapterCount: book.chapterCount,
         wordCount: book.wordCount,
         testament: bookId <= this.BOOK_OT_END ? 'OT' : 'NT',

         nameByLength: (length) => {
            switch (length) {
               case BibleBookNameLength.SHORT:
                  return book.nameShort;
               case BibleBookNameLength.ABBREVIATED:
                  return book.nameAbbr;
               case BibleBookNameLength.FULL:
               default:
                  return book.name;
            }
         },
      };
   },

   chapter(bookId: BookId, chapter: number): BibleChapterReturn {
      if (!Bible.isValidBook(bookId)) {
         throw new Error('Invalid bookId supplied to Bible.book().');
      }

      const book = books[bookId];
      const chapterIndex = chapter - 1;

      const wordCount = book.chapterWordCounts[chapterIndex];
      const verseCount = book.verseCounts[chapterIndex];
      const year = book.chapterYears[chapterIndex];

      if (
         typeof wordCount !== 'number' ||
         typeof verseCount !== 'number' ||
         typeof year !== 'number'
      ) {
         throw new Error(
            'Invalid chapter for bookId supplied to Bible.chapter().',
         );
      }

      return { wordCount, verseCount, year };
   },

   subset(key?: BibleSubsetValue): BibleSubsetReturn {
      const subset =
         key && subsets?.[key] ? subsets[key] : subsets[BibleSubset.ALL];

      return {
         name: subset.name,
         range: [subset.bookStart, subset.bookEnd],
         bookStart: subset.bookStart,
         bookEnd: subset.bookEnd,
         bookCount: subset.bookEnd - subset.bookStart + 1,

         bookArray: (trimStart, trimEnd) => {
            let { bookStart, bookEnd } = subset;

            bookStart = Math.min(
               Math.max(trimStart || bookStart, bookStart),
               bookEnd,
            ) as BookId;

            bookEnd = Math.max(
               Math.min(trimEnd || bookEnd, bookEnd),
               bookStart,
            ) as BookId;

            const bookIdArray: BookId[] = [];

            for (let bookId = bookStart; bookId <= bookEnd; bookId++) {
               bookIdArray.push(bookId);
            }

            return bookIdArray;
         },
      };
   },

   isValidBook(bookId: number): bookId is BookId {
      return (
         typeof bookId === 'number' &&
         bookId >= Bible.BOOK_START &&
         bookId <= Bible.BOOK_END
      );
   },
};
