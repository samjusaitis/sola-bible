import { Range } from '../types';

export function sortRange(range: Range): Range {
   return range[0] > range[1] ? [range[1], range[0]] : [range[0], range[1]];
}

export function isValidRange(value: unknown): value is Range {
   return (
      Array.isArray(value) &&
      typeof value[0] === 'number' &&
      typeof value[1] === 'number' &&
      value[0] <= value[1]
   );
}
