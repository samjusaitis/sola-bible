import { Bible } from '../Bible';
import { BibleSubset } from '../enums';
import { BibleSubsetValue, Range } from '../types';

function isValidRange(range: Range) {
  return (
    Array.isArray(range) &&
    typeof range[0] === 'number' &&
    typeof range[1] === 'number'
  );
}

/**
 * Returns the relevant smallest BibleSubset that includes the provided
 * `bookRange`.
 *
 * TODO: if still using, update for new subsets
 */
export function subsetFromBookRange(bookRange: Range): BibleSubsetValue {
  if (!isValidRange(bookRange)) return BibleSubset.ALL;

  const [bookStart, bookEnd] = bookRange;

  let subset: BibleSubsetValue = BibleSubset.ALL;

  const isWithinOT = bookEnd <= Bible.subset(BibleSubset.OT).bookEnd;
  const isWithinNT = bookStart >= Bible.subset(BibleSubset.NT).bookStart;

  if (isWithinOT) {
    subset = BibleSubset.OT;

    const wisdomRange = Bible.subset(BibleSubset.WISDOM).range;
    const isWithinWisdom =
      bookStart >= wisdomRange[0] && bookEnd <= wisdomRange[1];
    if (isWithinWisdom) {
      subset = BibleSubset.WISDOM;
    }
  } else if (isWithinNT) {
    subset = BibleSubset.NT;

    const gospelsRange = Bible.subset(BibleSubset.GOSPELS).range;
    const isWithinGospels =
      bookStart >= gospelsRange[0] && bookEnd <= gospelsRange[1];
    if (isWithinGospels) {
      subset = BibleSubset.GOSPELS;
    }
  }

  return subset;
}
