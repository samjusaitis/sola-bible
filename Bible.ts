import { BibleSubset, BibleBookNameLength } from './enums';
import {
  BibleBookNameLengthValue,
  BibleSubsetValue,
  BookId,
  BookRange,
} from './types';
import { books } from './lib/books';
import { subsets } from './lib/subsets';

type BibleBookReturn = {
  name: string;
  nameShort: string;
  nameAbbr: string;
  identifier: string;
  chapterCount: number;
  wordCount: number;
  testament: string;
  nameByLength: (length: BibleBookNameLengthValue) => string;
};

type BibleChapterReturn = {
  wordCount: number;
  verseCount: number;
  year: number;
};

type BibleSubsetReturn = {
  name: string;
  range: BookRange;
  bookStart: number;
  bookEnd: number;
  bookCount: number;
  bookArray: (trimStart?: number, trimEnd?: number) => number[];
};

function parseBookId(bookId: number | string): BookId {
  const bookIdNumber = Number(bookId);

  return Math.min(
    Math.max(bookIdNumber, Bible.BOOK_START),
    Bible.BOOK_END,
  ) as BookId;
}

export const Bible = {
  BOOK_START: 1,
  BOOK_END: 66,
  BOOK_OT_END: 39,
  BOOK_NT_START: 40,
  BOOK_COUNT: 66,
  CHAPTER_COUNT: 1189,
  WORD_COUNT: 789634,

  book(id: BookId): BibleBookReturn | undefined {
    const bookId = parseBookId(id);

    if (isNaN(bookId) || bookId < 1 || bookId > books.length) return undefined;

    const book = books[bookId - 1];

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
    const book = books[bookId - 1];
    const chapterIndex = chapter - 1;

    return {
      wordCount: book.chapterWordCounts[chapterIndex],
      verseCount: book.verseCounts[chapterIndex],
      year: book.chapterYears[chapterIndex],
    };
  },

  subset(key: BibleSubsetValue): BibleSubsetReturn {
    const subset = subsets?.[key] || subsets[BibleSubset.ALL];

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
};
