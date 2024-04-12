import { EndChapterAndVerse, StartChapterAndVerse, ValueOf } from './internal';
import { BibleBookNameLength, BibleSubset } from '../enums';

/**
 * The canonical number of each Bible book.
 */
// prettier-ignore
export type BookId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66;

export type BookRange = [bookStart: BookId, bookEnd: BookId];
export type BookGroup = BookId[];

export type BibleSubsetValue = ValueOf<typeof BibleSubset>;
export type BibleBookNameLengthValue = ValueOf<typeof BibleBookNameLength>;

export type ChapterAndVerse = [chapter: number, verse?: number];

/**
 * A type representing arguments that can be passed as an object to the
 * first parameter of the Passage class constructor.
 */
export type PassageArgs = {
   book: BookId;
   start: StartChapterAndVerse;
   end: EndChapterAndVerse;
};
