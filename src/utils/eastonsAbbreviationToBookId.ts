import { namesAbbreviated } from '../../data/books/namesAbbreviated';
import { BookId } from '../types';

/**
 * Returns the book ID for the provided Easton's abbreviation or
 * undefined if it cannot be found.
 */
export function eastonsAbbreviationToBookId(eastonsAbbr: string) {
   const array = Object.entries(namesAbbreviated);

   /**
    * An Easton's abbreviation is the same as the `nameAbbr` value in the
    * books data, without any spaces.
    */
   const result = array.find(
      ([, value]) => value.replace(/\s/g, '') === eastonsAbbr,
   );

   if (result) {
      return +result[0] as BookId;
   }

   return undefined;
}
