import { EndChapterAndVerse, StartChapterAndVerse, ValueOf } from './internal';
import { BibleBookNameLength, BibleSubset } from '../enums';

/**
 * The canonical number of each Bible book.
 */
// prettier-ignore
export type BookId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66;

export type BookGroup = BookId[];

export type BibleSubsetValue = ValueOf<typeof BibleSubset>;
export type BibleBookNameLengthValue = ValueOf<typeof BibleBookNameLength>;

export type ChapterAndVerse = [chapter: number, verse?: number];

/**
 * Alternative object style args that can be supplied as the Passage
 * constructor first parameter.
 *
 * The only required value is `book`. Then either a `start` with an optional `end`
 * can be provided, or alternatively a `chapterRange` can be provided.
 */
export type PassageArgs = {
   book: BookId;
} & (
   | {
        start?: StartChapterAndVerse;
        end?: EndChapterAndVerse;
        chapterRange?: never;
     }
   | {
        start?: never;
        end?: never;
        chapterRange?: [startChapter: number, endChapter: number];
     }
);
