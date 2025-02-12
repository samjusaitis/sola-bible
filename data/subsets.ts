import { BibleSubset } from '../src/enums';
import { BibleSubsetValue, BookId } from '../src/types';

type SubsetData = {
   name: string;
   bookStart: BookId;
   bookEnd: BookId;
   chapterCount: number;
   wordCount: number;
};

export const subsets = Object.freeze<Record<BibleSubsetValue, SubsetData>>({
   [BibleSubset.ALL]: {
      name: 'The Bible',
      bookStart: 1,
      bookEnd: 66,
      chapterCount: 1189,
      wordCount: 789634,
   },
   [BibleSubset.OT]: {
      name: 'Old Testament',
      bookStart: 1,
      bookEnd: 39,
      chapterCount: 929,
      wordCount: 609253,
   },
   [BibleSubset.NT]: {
      name: 'New Testament',
      bookStart: 40,
      bookEnd: 66,
      chapterCount: 260,
      wordCount: 180381,
   },
   [BibleSubset.TORAH]: {
      name: 'Torah',
      bookStart: 1,
      bookEnd: 5,
      chapterCount: 187,
      wordCount: 156739,
   },
   [BibleSubset.WISDOM]: {
      name: 'Wisdom Books',
      bookStart: 18,
      bookEnd: 22,
      chapterCount: 243,
      wordCount: 84058,
   },
   [BibleSubset.PSALMS]: {
      name: 'Psalms',
      bookStart: 19,
      bookEnd: 19,
      chapterCount: 150,
      wordCount: 42684,
   },
   [BibleSubset.PROVERBS]: {
      name: 'Proverbs',
      bookStart: 20,
      bookEnd: 20,
      chapterCount: 31,
      wordCount: 15038,
   },
   [BibleSubset.PROPHETS]: {
      name: 'The Prophets',
      bookStart: 23,
      bookEnd: 39,
      chapterCount: 250,
      wordCount: 164401,
   },
   [BibleSubset.GOSPELS]: {
      name: 'The Gospels',
      bookStart: 40,
      bookEnd: 43,
      chapterCount: 89,
      wordCount: 83883,
   },
   [BibleSubset.GOSPELS_ACTS]: {
      name: 'The Gospels and Acts',
      bookStart: 40,
      bookEnd: 44,
      chapterCount: 117,
      wordCount: 108129,
   },
   [BibleSubset.LETTERS]: {
      name: 'New Testament Letters',
      bookStart: 45,
      bookEnd: 66,
      chapterCount: 143,
      wordCount: 72252,
   },
});
