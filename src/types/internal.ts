import { BookId, BibleBookNameLengthValue } from './public';

export type ValueOf<T> = T[keyof T];

export type Range = [start: number, end: number];

export type BookRange = [bookStart: BookId, bookEnd: BookId];

export type StartChapterAndVerse = [startChapter: number, startVerse?: number];
export type EndChapterAndVerse = [endChapter: number, endVerse?: number];

export type BibleBookReturn = {
   name: string;
   nameShort: string;
   nameAbbr: string;
   identifier: string;
   chapterCount: number;
   wordCount: number;
   testament: string;
   nameByLength: (length: BibleBookNameLengthValue) => string;
};

export type BibleChapterReturn = {
   wordCount: number;
   verseCount: number;
   year: number;
};

export type BibleSubsetReturn = {
   name: string;
   range: BookRange;
   bookStart: BookId;
   bookEnd: BookId;
   bookCount: number;
   bookArray: (trimStart?: BookId, trimEnd?: BookId) => BookId[];
};

/**
 * Alternative object style args that can be supplied as the Passage
 * constructor first parameter.
 *
 * The only required value is `book`. Then either a `start` with an optional `end`
 * can be provided, or alternatively a `chapterRange` can be provided.
 */
export type PassageConstructorArgs = {
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
