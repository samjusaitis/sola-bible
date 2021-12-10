import { BibleSubset } from '../enums.js';

export const subsets = Object.freeze({
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
  [BibleSubset.WISDOM]: {
    name: 'Wisdom Books',
    bookStart: 18,
    bookEnd: 22,
  },
  [BibleSubset.GOSPELS]: {
    name: 'The Gospels',
    bookStart: 40,
    bookEnd: 43,
  },
});
