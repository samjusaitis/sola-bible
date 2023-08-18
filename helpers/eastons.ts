import { books } from '../lib/books';
import { BookId } from '../types';

/**
 * Returns the book id for the provided Easton's abbreviation.
 */
export function eastonsAbbreviationToBookId(
  eastonsAbbr: string,
): BookId | undefined {
  /**
   * NOTE: an Easton's abbreviation is the same as the `nameAbbr` value
   * in the books data, without any spaces.
   */
  const book = books.find(
    (book) => book.nameAbbr.replace(/\s/g, '') === eastonsAbbr,
  );

  return book?.id;
}
