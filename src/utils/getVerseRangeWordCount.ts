import { BookId, EndChapterAndVerse, StartChapterAndVerse } from '../types';
import { Bible } from '../Bible';
import { verseWordCounts } from '../../data/books/verseWordCounts';

const getChapterVerseRangeWordCount = (
   book: BookId,
   chapter: number,
   verseStart: number,
   verseEnd: number,
): number => {
   const bookVerseWordCounts = verseWordCounts[book];
   const chapterVerseWordCounts = bookVerseWordCounts[chapter - 1];

   if (!chapterVerseWordCounts) {
      throw new Error(
         `Invalid verse word count lookup for ${book}, ${chapter}`,
      );
   }

   let wordCount = 0;

   for (let v = verseStart; v <= verseEnd; v++) {
      const value = chapterVerseWordCounts[v - 1];

      if (value === undefined) {
         throw new Error(
            `Invalid verse word count lookup for ${book}, ${chapter}, ${v}`,
         );
      }

      wordCount += value;
   }

   return wordCount;
};

/**
 * Returns the word count for the verse range between the provided
 * `start` and `end`, in the provided `book`.
 *
 * NOTE: Using this function will load all the verse word counts into
 * memory. Which is why it is not included as part of the Bible class.
 */
export function getVerseRangeWordCount(
   book: BookId,
   start: StartChapterAndVerse,
   end: EndChapterAndVerse,
): number {
   if (!Bible.isValidBook(book)) {
      throw new Error('Invalid `book` provided to getVerseRangeWordCount().');
   }

   const chapterStart = start[0];
   const chapterEnd = end[0];

   if (
      typeof chapterStart !== 'number' ||
      typeof chapterEnd !== 'number' ||
      chapterStart > chapterEnd
   ) {
      throw new Error('Invalid chapters provided to getVerseRangeWordCount().');
   }

   const verseStart = start[1] || 1;
   const verseEnd = end[1] || Bible.chapter(book, chapterEnd).verseCount;

   let output = 0;

   // Loop chapters
   for (let c = chapterStart; c <= chapterEnd; c++) {
      const isFirstChapter = c === chapterStart;
      const isLastChapter = c === chapterEnd;

      if (isFirstChapter && isLastChapter) {
         output += getChapterVerseRangeWordCount(book, c, verseStart, verseEnd);
      } else if (isFirstChapter) {
         const end = Bible.chapter(book, c).verseCount;
         output += getChapterVerseRangeWordCount(book, c, verseStart, end);
      } else if (isLastChapter) {
         output += getChapterVerseRangeWordCount(book, c, 1, verseEnd);
      } else {
         output += Bible.chapter(book, c).wordCount;
      }
   }

   return output;
}
