import { books } from '../lib/books';

/**
 * Returns the book id for the provided Easton's abbreviation.
 *
 * @param   {string}  eastonsAbbr
 * @returns {number}  bookId
 */
export function eastonsAbbreviationToBookId(eastonsAbbr) {
  // NOTE: an Easton's abbreviation is the same as the `nameAbbr` value
  // in the books data, without any spaces.
  const book = books.find(
    (book) => book.nameAbbr.replace(/\s/g, '') === eastonsAbbr,
  );

  return book?.id;
}
