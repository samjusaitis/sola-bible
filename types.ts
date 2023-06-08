import { BibleBookNameLength, BibleSubset } from './enums';
import { books } from './lib/books';

type ValueOf<T> = T[keyof T];

export type BookId = typeof books[number]['id'];

export type BibleSubsetValue = ValueOf<typeof BibleSubset>;
export type BibleBookNameLengthValue = ValueOf<typeof BibleBookNameLength>;

export type Range = [start: number, end: number];
