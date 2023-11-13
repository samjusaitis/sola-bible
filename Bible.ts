import { BibleSubset, BibleBookNameLength } from './enums';
import {
  BibleBookNameLengthValue,
  BibleSubsetValue,
  BookId,
  BookRange,
} from './types';
import { BookData, books } from './lib/books';
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
  bookStart: BookId;
  bookEnd: BookId;
  bookCount: number;
  bookArray: (trimStart?: BookId, trimEnd?: BookId) => BookId[];
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

  book(id: BookId): BibleBookReturn {
    const bookId = parseBookId(id);

    if (!Bible.isValidBook(id)) {
      throw new Error('Invalid bookId supplied to Bible.book().');
    }

    const book = books[bookId - 1] as BookData;

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

    const book = books[bookId - 1] as BookData;
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

  isValidBook(value: number): value is BookId {
    return (
      typeof value === 'number' &&
      value >= Bible.BOOK_START &&
      value <= Bible.BOOK_END
    );
  },
};
