import { BibleSubset, BibleBookNameLength } from './enums';
import {
   BibleBookReturn,
   BibleChapterReturn,
   BibleSubsetReturn,
   BibleSubsetValue,
   BookId,
} from './types';
import { books } from '../data/books';
import { subsets } from '../data/subsets';

export const Bible = {
   BOOK_START: 1 as const,
   BOOK_END: 66 as const,
   BOOK_OT_END: 39 as const,
   BOOK_NT_START: 40 as const,
   BOOK_COUNT: 66 as const,
   CHAPTER_COUNT: 1189 as const,
   WORD_COUNT: 789634 as const,

   book(book: BookId): BibleBookReturn {
      if (!Bible.isValidBook(book)) {
         throw new Error('Invalid book identifier supplied to Bible.book().');
      }

      const bookData = books[book];

      return {
         name: bookData.name,
         nameShort: bookData.nameShort,
         nameAbbr: bookData.nameAbbr,
         identifier: bookData.identifier,
         chapterCount: bookData.chapterCount,
         verseCount: bookData.verseCount,
         wordCount: bookData.wordCount,
         testament: book <= this.BOOK_OT_END ? 'OT' : 'NT',

         nameByLength: (length) => {
            switch (length) {
               case BibleBookNameLength.SHORT:
                  return bookData.nameShort;
               case BibleBookNameLength.ABBREVIATED:
                  return bookData.nameAbbr;
               case BibleBookNameLength.FULL:
               default:
                  return bookData.name;
            }
         },
      };
   },

   chapter(book: BookId, chapter: number): BibleChapterReturn {
      if (!Bible.isValidBook(book)) {
         throw new Error('Invalid book identifier supplied to Bible.book().');
      }

      const bookData = books[book];
      const chapterIndex = chapter - 1;

      const wordCount = bookData.chapterWordCounts[chapterIndex];
      const verseCount = bookData.chapterVerseCounts[chapterIndex];
      const year = bookData.chapterYears[chapterIndex];

      if (
         typeof wordCount !== 'number' ||
         typeof verseCount !== 'number' ||
         typeof year !== 'number'
      ) {
         throw new Error(
            'Invalid chapter for book supplied to Bible.chapter().',
         );
      }

      return { wordCount, verseCount, year };
   },

   subset(key?: BibleSubsetValue | null): BibleSubsetReturn {
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

            const bookArray: BookId[] = [];

            for (let book = bookStart; book <= bookEnd; book++) {
               bookArray.push(book);
            }

            return bookArray;
         },
      };
   },

   isValidBook(book: number): book is BookId {
      return (
         typeof book === 'number' &&
         book >= Bible.BOOK_START &&
         book <= Bible.BOOK_END
      );
   },
};
