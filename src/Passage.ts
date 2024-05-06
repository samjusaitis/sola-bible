import { getChapterRangeWordCount } from './utils/getChapterRangeWordCount';
import { Bible } from './Bible';
import {
   BookId,
   EndChapterAndVerse,
   PassageConstructorArgs,
   StartChapterAndVerse,
   Range,
} from './types';

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

   /**
    * VALUES
    */

   /**
    * Returns args to create a new Passage duplicate this one.
    */
   get args(): PassageConstructorArgs {
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

   /**
    * STRINGS
    */

   /**
    * Returns the full name of the book the passage is within.
    */
   get bookName() {
      return Bible.book(this.book).name;
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
      return `${this.bookName} ${this.rangeString}`;
   }

   /**
    * STATISTICS
    */

   /**
    * Returns the count of chapters within the passage. A chapter is
    * included within the count if any verse from it is within the
    * passage.
    */
   get chapterCount() {
      return this.endChapter - this.startChapter + 1;
   }

   /**
    * Returns the word count of the passage. Note, that only whole
    * chapter words counts are currently supported as I'm hesitant to
    * load all the data of Bible verse word counts into memory.
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

   /**
    * BOOLEANS
    */

   /**
    * Boolean representing if the passage only includes whole chapters.
    */
   get isWholeChapters() {
      return (
         this.startVerse === 1 &&
         this.endVerse === Bible.chapter(this.book, this.endChapter).verseCount
      );
   }

   /**
    * Boolean representing whether the passage is entirely within the
    * one chapter.
    */
   get isWithinSingleChapter() {
      return this.startChapter === this.endChapter;
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

   /**
    * Returns a new array of all the chapter range of the passage.
    */
   getChapterRange(): Range {
      return [this.startChapter, this.endChapter];
   }

   /**
    * STATIC UTILS
    */

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
