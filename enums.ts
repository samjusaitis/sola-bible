/**
 * NOTE: BibleSubset values are based on how I am storing subsets in the
 * database.
 */
export const BibleSubset = Object.freeze({
  ALL: 'ALL',
  OT: 'OT',
  NT: 'NT',
  TORAH: 'TORAH',
  WISDOM: 'WISDOM',
  PSALMS: 'PSALMS',
  PROVERBS: 'PROVERBS',
  PROPHETS: 'PROPHETS',
  GOSPELS: 'GOSPELS',
  GOSPELS_ACTS: 'GOSPELS_ACTS',
  LETTERS: 'LETTERS',
});

export const BibleBookNameLength = Object.freeze({
  FULL: 'full',
  SHORT: 'short',
  ABBREVIATED: 'abbr',
});
