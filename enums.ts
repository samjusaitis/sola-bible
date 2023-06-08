// NOTE: values below are based on how I am storing subsets in the
// database
export const BibleSubset = {
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
} as const;

export const BibleBookNameLength = {
  FULL: 'full',
  SHORT: 'short',
  ABBREVIATED: 'abbr',
} as const;
