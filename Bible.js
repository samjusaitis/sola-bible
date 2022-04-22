import { BibleSubset, BibleBookNameLength } from './enums';
import { books } from './lib/books';
import { subsets } from './lib/subsets';

/**
 * @param   {number | string}  bookId
 * @returns {number}
 */
function parseBookId(bookId) {
  const bookIdNumber = Number(bookId);
  return Math.min(Math.max(bookIdNumber, Bible.BOOK_START), Bible.BOOK_END);
}

/**
 * @typedef  {Object}    BibleBookReturn
 * @property {string}    name             The book's name
 * @property {string}    nameShort        The book's shortened name
 * @property {string}    nameAbbr         The book's abbreviated name
 * @property {string}    identifier       A three letter, all caps identifer for
 *                                        the book, i.e. 'GEN'
 * @property {number}    chapterCount     How many chapters the book has
 * @property {number}    wordCount        How many words are in the book
 * @property {string}    testament        The Testament key, i.e. 'OT' or 'NT'
 * @property {function}  nameByLength     Callback to retrieve the book's name
 *                                        by a provided length enum.
 */

/**
 * @typedef  {Object}  BibleChapterReturn
 * @property {number}  wordCount           How many words are in the chapter
 * @property {number}  verseCount          How many verses are in the chapter
 * @property {number}  year                The year of the chapter
 */

/**
 * @typedef  {Object}    BibleSubsetReturn
 * @property {string}    name               The subset's name
 * @property {number[]}  range              The bookId range of the subset
 * @property {number}    bookStart          The beginning bookId of the subset
 * @property {number}    bookEnd            The final bookId of the subset
 * @property {number}    bookCount          Count of books in the subset
 * @property {function}  bookArray          Callback to create an array of
 *                                          bookIds
 */

export const Bible = {
  BOOK_START: 1,
  BOOK_END: 66,
  BOOK_OT_END: 39,
  BOOK_NT_START: 40,
  BOOK_COUNT: 66,
  WORD_COUNT: 789634,

  /**
   * @param   {number}           id
   * @returns {BibleBookReturn}
   */
  book(id) {
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

  /**
   * @param   {number}              bookId
   * @param   {number}              chapter
   * @returns {BibleChapterReturn}
   */
  chapter(bookId, chapter) {
    const book = books[bookId - 1];
    const chapterIndex = chapter - 1;

    return {
      wordCount: book.chapterWordCounts[chapterIndex],
      verseCount: book.verseCounts[chapterIndex],
      year: book.chapterYears[chapterIndex],
    };
  },

  /**
   * @param   {BibleSubset}        key
   * @returns {BibleSubsetReturn}
   */
  subset(key) {
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
        );
        bookEnd = Math.max(Math.min(trimEnd || bookEnd, bookEnd), bookStart);

        const bookIdArray = [];
        for (let bookId = bookStart; bookId <= bookEnd; bookId++) {
          bookIdArray.push(bookId);
        }
        return bookIdArray;
      },
    };
  },
};
