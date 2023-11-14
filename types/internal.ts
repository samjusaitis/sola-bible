import { BookId, BibleBookNameLengthValue } from './public';

export type ValueOf<T> = T[keyof T];

export type Range = [start: number, end: number];

export type BookRange = [bookStart: BookId, bookEnd: BookId];

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
