import { books } from '../lib/books';

/**
 * Returns the book id for the provided Easton's abbreviation.
 */
export function eastonsAbbreviationToBookId(
  eastonsAbbr: string,
): number | undefined {
  // NOTE: an Easton's abbreviation is the same as the `nameAbbr` value
  // in the books data, without any spaces.
  const book = books.find(
    (book) => book.nameAbbr.replace(/\s/g, '') === eastonsAbbr,
  );

  return book?.id;
}
