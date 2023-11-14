import { Range } from '../types';

export function sortRange(range: Range): Range {
  return range[0] > range[1] ? [range[1], range[0]] : [range[0], range[1]];
}

export function isValidRange(range: Range) {
  return (
    Array.isArray(range) &&
    typeof range[0] === 'number' &&
    typeof range[1] === 'number'
  );
}
