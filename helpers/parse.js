/**
 * The below function has been archived here as I couldn't find any
 * implementations of them within the Sola mobile app code base. I have
 * left it here for now in case they are used in other Sola packages,
 * or they may be useful in the future.
 */

/**
 * Return numerical ranges for Bible passages extracted from the provided
 * string. i.e. "33:4-15" or "33-34".
 *
 * TODO: currently doesn't work for strings of format "44:21-45:3"
 * TODO: rename to parseStringToReference
 *
 * @param {string}  referenceString
 * @returns {{ chapterRange: number[]; verseRange: number[] } | null}
 */
export function parseReference(string) {
  if (!string) return null;

  let chapterA, chapterB, verseA, verseB;

  const [chapter, verse] = string.split(/[:.]+/);
  [chapterA, chapterB] = chapter.split(/[-,]+/);

  if (verse) {
    [verseA, verseB] = verse.split(/[-,]+/);
  }

  const ensureInt = (value) => parseInt(value) || undefined;

  return {
    chapterRange: [ensureInt(chapterA), ensureInt(chapterB)],
    verseRange: [ensureInt(verseA), ensureInt(verseB)],
  };
}
