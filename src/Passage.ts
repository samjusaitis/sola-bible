import { normaliseChapter } from './utils/normaliseChapter';
import { normaliseVerse } from './utils/normaliseVerse';
import { Bible } from './Bible';
import { BookId } from './types';

type StartChapterAndVerse = [startChapter: number, startVerse?: number];
type EndChapterAndVerse = [endChapter: number, endVerse?: number];

/**
 * PLAN: create this new `Passage` class (initially called
 * `PassageClass` to not conflict with the `Passage` type). This Passage
 * class will accept `book` and `chapterRange` (required) and optionally
 * a `verseRange`.
 *
 * It will include all the helper classes from Reading / VerseReading
 * (i.e. output range strings, etc.).
 *
 * It won't include any Reading specific logic (i.e. progressKeys or
 * anything related to Tracks or Plans).
 *
 * Reading and VerseReading should be able to be deprecated, and should
 * just be able to have ChapterPlanReading, WeeklySetPlanReading, etc.
 * These will extend the base Passage class.
 *
 * But a Passage will be able to be used in its own regard anytime the
 * UI has a book and a chapter range that it can just pass to the
 * constructor, and statically output a range string, etc.
 *
 * Rename the existing `Passage` type to `PassageArgs_OLD` (as it
 * accepts `bookId`). Create a new type that will be `PassageArgs`, that
 * will accept `book` instead of `bookId`. For safety, the Passage class
 * will still accept `bookId` as a fallback from `book`.
 */
export class Passage {
   book: BookId;

   #startChapter?: number;
   #startVerse?: number;
   #endChapter?: number;
   #endVerse?: number;

   static RANGE_CHAPTER_SEPARATOR = '–';
   static RANGE_CHAPTER_VERSE_SEPARATOR = ':';

   constructor(
      book: BookId,
      start?: StartChapterAndVerse,
      end?: EndChapterAndVerse,
   ) {
      if (
         typeof book !== 'number' ||
         book < Bible.BOOK_START ||
         book > Bible.BOOK_END
      ) {
         throw new Error('Invalid `book` arg provided to Passage constructor.');
      }

      this.book = book;

      if (Array.isArray(start) && typeof start[0] === 'number') {
         const [startChapter, startVerse] = start;

         this.#startChapter = normaliseChapter(book, startChapter);

         if (typeof startVerse === 'number') {
            this.#startVerse = normaliseVerse(book, startChapter, startVerse);
         }

         /**
          * Only assign end chapter if it is a number greater than or
          * equal to the start chapter.
          */
         if (
            Array.isArray(end) &&
            typeof end[0] === 'number' &&
            end[0] >= startChapter
         ) {
            const endChapter = end[0];
            let endVerse = end[1];

            this.#endChapter = normaliseChapter(book, endChapter);

            if (typeof endVerse === 'number') {
               endVerse = normaliseVerse(book, endChapter, endVerse);

               const isWithinSingleChapter = this.isWithinSingleChapter;

               /**
                * Only assign end verse if it is in a different chapter
                * or if in the same chapter, if it is greater than or
                * equal to the start verse.
                */
               if (
                  !isWithinSingleChapter ||
                  (isWithinSingleChapter && endVerse >= this.startVerse)
               ) {
                  this.#endVerse = endVerse;
               }
            }
         }
      }
   }

   /**
    * VALUES
    */

   get startChapter() {
      return typeof this.#startChapter === 'number' ? this.#startChapter : 1;
   }

   get startVerse() {
      return typeof this.#startVerse === 'number' ? this.#startVerse : 1;
   }

   get endChapter() {
      if (typeof this.#endChapter === 'number') {
         return this.#endChapter;
      }

      /**
       * Fall back to the start chapter if it has been defined
       */
      if (typeof this.#startChapter === 'number') {
         return this.#startChapter;
      }

      /**
       * Otherwise return the last chapter of the book
       */
      return Bible.book(this.book).chapterCount;
   }

   get endVerse() {
      if (typeof this.#endVerse === 'number') {
         return this.#endVerse;
      }

      /**
       * If no end chapter has been defined, but a start verse has,
       * fall back to the start verse
       */
      if (
         typeof this.#endChapter === 'undefined' &&
         typeof this.#startVerse === 'number'
      ) {
         return this.#startVerse;
      }

      /**
       * Otherwise return the the last verse of the chapter
       */
      return Bible.chapter(this.book, this.endChapter).verseCount;
   }

   /**
    * STRINGS
    */

   get bookName() {
      return Bible.book(this.book).name;
   }

   /**
    * Returns a formatted reading range string inclusive of chapters and
    * verses i.e. '10-24' or '12:1-19' or '1-3:10' or '2:10-3:1'
    */
   get rangeString() {
      let showRangeSeparator = true;

      const startChapterString = String(this.startChapter);
      let startVerseString = String(this.startVerse);
      let endChapterString = String(this.endChapter);
      let endVerseString = String(this.endVerse);

      const isWithinSingleChapter = this.isWithinSingleChapter;
      const isWithinSingleChapterAndVersesTheSame =
         isWithinSingleChapter && this.startVerse === this.endVerse;
      const isStartVerseFirstOfChapter = this.startVerse === 1;
      const isEndVerseLastOfChapter =
         this.endVerse === Bible.chapter(this.book, this.endChapter).verseCount;

      /**
       * Clear `startVerseString` if not needed, otherwise prepend the
       * verse separator.
       */
      if (
         isStartVerseFirstOfChapter &&
         (!isWithinSingleChapter ||
            (isWithinSingleChapter && isEndVerseLastOfChapter))
      ) {
         startVerseString = '';
      } else {
         startVerseString = `${Passage.RANGE_CHAPTER_VERSE_SEPARATOR}${startVerseString}`;
      }

      /**
       * Clear `endVerseString` if not needed, otherwise prepend the
       * verse separator.
       */
      if (
         isWithinSingleChapterAndVersesTheSame ||
         (isStartVerseFirstOfChapter && isEndVerseLastOfChapter)
      ) {
         endVerseString = '';
      } else if (!isWithinSingleChapter) {
         endVerseString = `${Passage.RANGE_CHAPTER_VERSE_SEPARATOR}${endVerseString}`;
      }

      /**
       * Clear `endChapterString` if not needed
       */
      if (isWithinSingleChapter) {
         endChapterString = '';
      }

      /**
       * Disable range separator if not needed
       */
      if (
         isWithinSingleChapter &&
         ((!endChapterString && !endVerseString) ||
            (isStartVerseFirstOfChapter && isEndVerseLastOfChapter))
      ) {
         showRangeSeparator = false;
      }

      return `${startChapterString}${startVerseString}${
         showRangeSeparator ? Passage.RANGE_CHAPTER_SEPARATOR : ``
      }${endChapterString}${endVerseString}`;
   }

   get toString() {
      return `${this.bookName} ${this.rangeString}`;
   }

   /**
    * STATISTICS
    */

   get chapterCount() {
      return this.endChapter - this.startChapter + 1;
   }

   get wordCount() {
      // TODO: create function to calculate this
      return undefined;
   }

   /**
    * BOOLEANS
    */

   get isWholeBook() {
      return 'TODO';
   }

   get isWholeChapter() {
      return 'TODO';
   }

   get isWithinSingleChapter() {
      return this.#startChapter === this.#endChapter;
   }

   /**
    * UTILS
    */

   /**
    * Returns a new array of all the chapters in the passage.
    */
   getChapterArray(): number[] {
      const chapterArray = [];
      for (let i = this.startChapter; i <= this.endChapter; i++) {
         chapterArray.push(i);
      }
      return chapterArray;
   }
}
