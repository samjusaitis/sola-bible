import { BibleSubset } from '../src/enums';
import { BibleSubsetValue, BookId } from '../src/types';

type SubsetData = {
   name: string;
   bookStart: BookId;
   bookEnd: BookId;
};

export const subsets = Object.freeze<Record<BibleSubsetValue, SubsetData>>({
   [BibleSubset.ALL]: {
      name: 'The Bible',
      bookStart: 1,
      bookEnd: 66,
   },
   [BibleSubset.OT]: {
      name: 'Old Testament',
      bookStart: 1,
      bookEnd: 39,
   },
   [BibleSubset.NT]: {
      name: 'New Testament',
      bookStart: 40,
      bookEnd: 66,
   },
   [BibleSubset.TORAH]: {
      name: 'Torah',
      bookStart: 1,
      bookEnd: 5,
   },
   [BibleSubset.WISDOM]: {
      name: 'Wisdom Books',
      bookStart: 18,
      bookEnd: 22,
   },
   [BibleSubset.PSALMS]: {
      name: 'Psalms',
      bookStart: 19,
      bookEnd: 19,
   },
   [BibleSubset.PROVERBS]: {
      name: 'Proverbs',
      bookStart: 20,
      bookEnd: 20,
   },
   [BibleSubset.PROPHETS]: {
      name: 'The Prophets',
      bookStart: 23,
      bookEnd: 39,
   },
   [BibleSubset.GOSPELS]: {
      name: 'The Gospels',
      bookStart: 40,
      bookEnd: 43,
   },
   [BibleSubset.GOSPELS_ACTS]: {
      name: 'The Gospels and Acts',
      bookStart: 40,
      bookEnd: 44,
   },
   [BibleSubset.LETTERS]: {
      name: 'New Testament Letters',
      bookStart: 45,
      bookEnd: 66,
   },
});
