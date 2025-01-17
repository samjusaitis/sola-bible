import { getChapterRangeWordCount } from './utils/getChapterRangeWordCount';
import { Bible } from './Bible';
import {
   BookId,
   EndChapterAndVerse,
   PassageConstructorArgs,
   StartChapterAndVerse,
   Range,
   PassageArgs,
} from './types';
import { BibleBook } from '..';

/**
 * A passage of the Bible. Only references passages that are wholly
 * within a single Biblical book.
 */
export class Passage {
   book: BookId;

   #startChapter?: number;
   #startVerse?: number;
   #endChapter?: number;
   #endVerse?: number;

   static RANGE_SEPARATOR = '–';
   static RANGE_CHAPTER_VERSE_SEPARATOR = ':';

   constructor(
      argsOrBook: PassageConstructorArgs | BookId,
      start?: StartChapterAndVerse,
      end?: EndChapterAndVerse,
   ) {
      const hasArgsObject = argsOrBook && typeof argsOrBook === 'object';

      const book = hasArgsObject ? argsOrBook.book : argsOrBook;

      if (!Bible.isValidBook(book)) {
         throw new Error('Invalid `book` arg provided to Passage constructor.');
      }

      this.book = book;
      let _start = start;
      let _end = end;

      if (hasArgsObject) {
         if (Array.isArray(argsOrBook.chapterRange)) {
            _start = [argsOrBook.chapterRange[0]];
            _end = [argsOrBook.chapterRange[1]];
         } else {
            _start = argsOrBook.start;
            _end = argsOrBook.end;
         }
      }

      if (Array.isArray(_start) && typeof _start[0] === 'number') {
         const [startChapter, startVerse] = _start;

         this.#startChapter = Passage.normaliseChapter(this.book, startChapter);

         if (typeof startVerse === 'number') {
            this.#startVerse = Passage.normaliseVerse(
               this.book,
               startChapter,
               startVerse,
            );
         }

         /**
          * Only assign end chapter if it is a number greater than or
          * equal to the start chapter.
          */
         if (
            Array.isArray(_end) &&
            typeof _end[0] === 'number' &&
            _end[0] >= startChapter
         ) {
            const endChapter = _end[0];
            let endVerse = _end[1];

            this.#endChapter = Passage.normaliseChapter(this.book, endChapter);

            if (typeof endVerse === 'number') {
               endVerse = Passage.normaliseVerse(
                  this.book,
                  endChapter,
                  endVerse,
               );

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

   /* --------------------------------------------------------
    * VALUES
    * -------------------------------------------------------- */

   /**
    * Returns args to create a new Passage duplicate this one.
    */
   get args(): PassageArgs {
      return {
         book: this.book,
         start: this.start,
         end: this.end,
      };
   }

   get start() {
      return [this.startChapter, this.startVerse] as StartChapterAndVerse;
   }

   get startChapter() {
      return typeof this.#startChapter === 'number' ? this.#startChapter : 1;
   }

   get startVerse() {
      return typeof this.#startVerse === 'number' ? this.#startVerse : 1;
   }

   get end() {
      return [this.endChapter, this.endVerse] as EndChapterAndVerse;
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

   /* --------------------------------------------------------
    * STRINGS
    * -------------------------------------------------------- */

   /**
    * Returns the full name of the book the passage is within.
    *
    * @deprecated: Prefer `Passage.bookString()`, or if logic requires
    * the full book name, generate outside this instance (deprecated
    * since 1.3.12, to be removed from the next minor version).
    */
   get bookName() {
      console.warn(
         'Accessing Passage.bookName is deprecated and will be removed in a future minor version.',
      );

      return Bible.book(this.book).name;
   }

   /**
    * Returns the name portion of a passage string. For all books this
    * is simply the name of the book, except Psalms, where the returned
    * string will be 'Psalm' if the passage is only within a single
    * chapter.
    */
   get bookString() {
      const bookName = Bible.book(this.book).name;

      // For singlular Psalm chapters return 'Psalm'
      if (this.book === BibleBook.PSALMS && this.chapterCount === 1) {
         return bookName.slice(0, -1);
      }

      return bookName;
   }

   /**
    * Returns a formatted reading range string inclusive of chapters and
    * verses i.e. '10-24' or '12:1-19' or '1-3:10' or '2:10-3:1'
    */
   get rangeString() {
      const isWithinSingleChapter = this.isWithinSingleChapter;

      if (this.isWholeChapters) {
         if (isWithinSingleChapter) {
            return `${this.startChapter}`;
         }

         return `${this.startChapter}${Passage.RANGE_SEPARATOR}${this.endChapter}`;
      }

      if (isWithinSingleChapter) {
         const areVersesTheSame = this.startVerse === this.endVerse;

         if (areVersesTheSame) {
            return `${this.startChapter}:${this.startVerse}`;
         }

         return `${this.startChapter}:${this.startVerse}${Passage.RANGE_SEPARATOR}${this.endVerse}`;
      }

      // Can assume is within separate chapters

      const showStartVerse = this.startVerse !== 1;

      /**
       * Show the end verse if the start verse is shown, as it needs to
       * be visible to indicate the number directly after the separator
       * is a chapter. i.e. 1:5-6 does't indicate that the 6 is a
       * chapter, whereas 1:5-6:22 does.
       */
      const showEndVerse =
         showStartVerse ||
         this.endVerse !== Bible.chapter(this.book, this.endChapter).verseCount;

      return `${this.startChapter}${
         showStartVerse
            ? `${Passage.RANGE_CHAPTER_VERSE_SEPARATOR}${this.startVerse}`
            : ``
      }${Passage.RANGE_SEPARATOR}${this.endChapter}${
         showEndVerse
            ? `${Passage.RANGE_CHAPTER_VERSE_SEPARATOR}${this.endVerse}`
            : ``
      }`;
   }

   /**
    * Returns a string representation of the passage with a formatted
    * reading range. i.e. Matthew 4:1-12
    */
   get toString() {
      return `${this.bookString} ${this.rangeString}`;
   }

   /* --------------------------------------------------------
    * STATISTICS
    * -------------------------------------------------------- */

   /**
    * Returns the count of chapters within the passage. A chapter is
    * included within the count if any verse from it is within the
    * passage.
    */
   get chapterCount() {
      return this.endChapter - this.startChapter + 1;
   }

   /**
    * Returns the count of verses within the passage.
    */
   get verseCount() {
      let verseCount = 0;

      if (this.isWithinSingleChapter) {
         return this.endVerse - this.startVerse + 1;
      }

      let start = this.startChapter;
      let end = this.endChapter;

      // Handle partial start chapter
      if (!this.isStartChapterWhole) {
         verseCount +=
            Bible.chapter(this.book, this.startChapter).verseCount -
            this.startVerse +
            1;
         start += 1;
      }
      if (!this.isEndChapterWhole) {
         verseCount += this.endVerse;
         end -= 1;
      }

      for (let ch = start; ch <= end; ch++) {
         verseCount += Bible.chapter(this.book, ch).verseCount;
      }

      return verseCount;
   }

   /**
    * Returns the word count of the passage.
    *
    * NOTE: only whole chapter words counts are currently supported as
    * I'm hesitant to load all the data of Bible verse word counts into
    * memory.
    */
   get wordCount() {
      if (!this.isWholeChapters) {
         console.warn(
            'Attempting a word count calculation on a Passage that is not whole chapters. This is not currently supported. The result given will be for the whole chapters of the passage.',
         );
      }

      return getChapterRangeWordCount(
         this.book,
         this.startChapter,
         this.endChapter,
      );
   }

   /* --------------------------------------------------------
    * BOOLEANS
    * -------------------------------------------------------- */

   /**
    * Boolean representing if the passage includes the whole of its
    * ending chapter.
    */
   get isEndChapterWhole() {
      if (this.isWithinSingleChapter) {
         return this.isWholeChapters;
      }
      return this.isEndVerseEndOfChapter;
   }

   /**
    * Boolean representing if the passage ends at the final verse of its
    * ending chapter.
    */
   get isEndVerseEndOfChapter() {
      return (
         this.endVerse === Bible.chapter(this.book, this.endChapter).verseCount
      );
   }

   /**
    * Boolean representing if the passage includes the whole of its
    * starting chapter.
    */
   get isStartChapterWhole() {
      if (this.isWithinSingleChapter) {
         return this.isWholeChapters;
      }
      return this.isStartVerseStartOfChapter;
   }

   /**
    * Boolean representing if the passage begins from the first verse of
    * its starting chapter.
    */
   get isStartVerseStartOfChapter() {
      return this.startVerse === 1;
   }

   /**
    * Boolean representing if the passage only includes whole chapters.
    */
   get isWholeChapters() {
      return this.isStartVerseStartOfChapter && this.isEndVerseEndOfChapter;
   }

   /**
    * Boolean representing whether the passage is entirely within the
    * one chapter.
    */
   get isWithinSingleChapter() {
      return this.startChapter === this.endChapter;
   }

   /* --------------------------------------------------------
    * UTILITIES
    * -------------------------------------------------------- */

   private getFirstWholeChapter() {
      if (this.isStartChapterWhole) return this.startChapter;
      if (this.isWithinSingleChapter) return undefined;
      return this.startChapter + 1;
   }

   private getLastWholeChapter() {
      if (this.isEndChapterWhole) return this.endChapter;
      if (this.isWithinSingleChapter) return undefined;
      return this.endChapter - 1;
   }

   /**
    * Returns a new array of all the chapters within the passage. Optionally
    * exclude chapters that are only partial.
    *
    * @param excludePartialChapters Whether to exclude any chapters that
    * are only partially within the passage. Defaults to false.
    * @returns A new array of chapter numbers
    */
   getChapterArray(excludePartialChapters = false): number[] {
      const output: number[] = [];

      const range = this.getChapterRange(excludePartialChapters);

      /**
       * `range` will be undefined if `excludePartialChapters` is true and
       * the passage is in a single chapter that is partial
       */
      if (range === undefined) return output;

      // Fill array and return
      for (let i = range[0]; i <= range[1]; i++) {
         output.push(i);
      }
      return output;
   }

   /**
    * Returns a new array of all the chapter range of the passage.
    */
   getChapterRange(excludePartialChapters: true): Range | undefined;
   getChapterRange(excludePartialChapters?: false): Range;
   getChapterRange(excludePartialChapters?: boolean): Range | undefined;
   getChapterRange(excludePartialChapters = false): Range | undefined {
      const start = excludePartialChapters
         ? this.getFirstWholeChapter()
         : this.startChapter;
      const end = excludePartialChapters
         ? this.getLastWholeChapter()
         : this.endChapter;
      if (start === undefined || end === undefined) return undefined;
      return [start, end];
   }

   /* --------------------------------------------------------
    * STATIC UTILITIES
    * -------------------------------------------------------- */

   /**
    * Ensure the provided `chapter` is within the scope of the provided
    * `book`.
    */
   static normaliseChapter(book: BookId, chapter: number) {
      const bookChapterCount = Bible.book(book).chapterCount;
      return Math.min(Math.max(chapter, 1), bookChapterCount);
   }

   /**
    * Ensure the provided `verse` is within the scope of the provided
    * `book` and `chapter`.
    */
   static normaliseVerse(book: BookId, chapter: number, verse: number) {
      const maxVerses = Bible.chapter(book, chapter).verseCount;
      return verse > maxVerses ? maxVerses : verse;
   }
}
