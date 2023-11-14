import { BookId } from '../../types';
import { chapterCounts } from './chapterCounts';
import { chapterWordCounts } from './chapterWordCounts';
import { chapterYears } from './chapterYears';
import { identifiers } from './identifiers';
import { names } from './names';
import { namesAbbreviated } from './namesAbbreviated';
import { namesShort } from './namesShort';
import { verseCounts } from './verseCounts';
import { wordCounts } from './wordCounts';

type BookData = {
  name: string;
  nameShort: string;
  nameAbbr: string;
  identifier: string;
  wordCount: number;
  chapterCount: number;
  chapterWordCounts: readonly number[];
  chapterYears: readonly number[];
  verseCounts: readonly number[];
};

/**
 * NOTES:
 * - `verseWordCounts` is currently commented out to save memory usage.
 */
export const books = Object.freeze<Record<BookId, BookData>>({
  1: {
    name: names[1],
    nameShort: namesShort[1],
    nameAbbr: namesAbbreviated[1],
    identifier: identifiers[1],
    wordCount: wordCounts[1],
    chapterCount: chapterCounts[1],
    chapterWordCounts: chapterWordCounts[1],
    chapterYears: chapterYears[1],
    verseCounts: verseCounts[1],
    // verseWordCounts: verseWordCounts[1],
  },
  2: {
    name: names[2],
    nameShort: namesShort[2],
    nameAbbr: namesAbbreviated[2],
    identifier: identifiers[2],
    wordCount: wordCounts[2],
    chapterCount: chapterCounts[2],
    chapterWordCounts: chapterWordCounts[2],
    chapterYears: chapterYears[2],
    verseCounts: verseCounts[2],
    // verseWordCounts: verseWordCounts[2],
  },
  3: {
    name: names[3],
    nameShort: namesShort[3],
    nameAbbr: namesAbbreviated[3],
    identifier: identifiers[3],
    wordCount: wordCounts[3],
    chapterCount: chapterCounts[3],
    chapterWordCounts: chapterWordCounts[3],
    chapterYears: chapterYears[3],
    verseCounts: verseCounts[3],
    // verseWordCounts: verseWordCounts[3],
  },
  4: {
    name: names[4],
    nameShort: namesShort[4],
    nameAbbr: namesAbbreviated[4],
    identifier: identifiers[4],
    wordCount: wordCounts[4],
    chapterCount: chapterCounts[4],
    chapterWordCounts: chapterWordCounts[4],
    chapterYears: chapterYears[4],
    verseCounts: verseCounts[4],
    // verseWordCounts: verseWordCounts[4],
  },
  5: {
    name: names[5],
    nameShort: namesShort[5],
    nameAbbr: namesAbbreviated[5],
    identifier: identifiers[5],
    wordCount: wordCounts[5],
    chapterCount: chapterCounts[5],
    chapterWordCounts: chapterWordCounts[5],
    chapterYears: chapterYears[5],
    verseCounts: verseCounts[5],
    // verseWordCounts: verseWordCounts[5],
  },
  6: {
    name: names[6],
    nameShort: namesShort[6],
    nameAbbr: namesAbbreviated[6],
    identifier: identifiers[6],
    wordCount: wordCounts[6],
    chapterCount: chapterCounts[6],
    chapterWordCounts: chapterWordCounts[6],
    chapterYears: chapterYears[6],
    verseCounts: verseCounts[6],
    // verseWordCounts: verseWordCounts[6],
  },
  7: {
    name: names[7],
    nameShort: namesShort[7],
    nameAbbr: namesAbbreviated[7],
    identifier: identifiers[7],
    wordCount: wordCounts[7],
    chapterCount: chapterCounts[7],
    chapterWordCounts: chapterWordCounts[7],
    chapterYears: chapterYears[7],
    verseCounts: verseCounts[7],
    // verseWordCounts: verseWordCounts[7],
  },
  8: {
    name: names[8],
    nameShort: namesShort[8],
    nameAbbr: namesAbbreviated[8],
    identifier: identifiers[8],
    wordCount: wordCounts[8],
    chapterCount: chapterCounts[8],
    chapterWordCounts: chapterWordCounts[8],
    chapterYears: chapterYears[8],
    verseCounts: verseCounts[8],
    // verseWordCounts: verseWordCounts[8],
  },
  9: {
    name: names[9],
    nameShort: namesShort[9],
    nameAbbr: namesAbbreviated[9],
    identifier: identifiers[9],
    wordCount: wordCounts[9],
    chapterCount: chapterCounts[9],
    chapterWordCounts: chapterWordCounts[9],
    chapterYears: chapterYears[9],
    verseCounts: verseCounts[9],
    // verseWordCounts: verseWordCounts[9],
  },
  10: {
    name: names[10],
    nameShort: namesShort[10],
    nameAbbr: namesAbbreviated[10],
    identifier: identifiers[10],
    wordCount: wordCounts[10],
    chapterCount: chapterCounts[10],
    chapterWordCounts: chapterWordCounts[10],
    chapterYears: chapterYears[10],
    verseCounts: verseCounts[10],
    // verseWordCounts: verseWordCounts[10],
  },
  11: {
    name: names[11],
    nameShort: namesShort[11],
    nameAbbr: namesAbbreviated[11],
    identifier: identifiers[11],
    wordCount: wordCounts[11],
    chapterCount: chapterCounts[11],
    chapterWordCounts: chapterWordCounts[11],
    chapterYears: chapterYears[11],
    verseCounts: verseCounts[11],
    // verseWordCounts: verseWordCounts[11],
  },
  12: {
    name: names[12],
    nameShort: namesShort[12],
    nameAbbr: namesAbbreviated[12],
    identifier: identifiers[12],
    wordCount: wordCounts[12],
    chapterCount: chapterCounts[12],
    chapterWordCounts: chapterWordCounts[12],
    chapterYears: chapterYears[12],
    verseCounts: verseCounts[12],
    // verseWordCounts: verseWordCounts[12],
  },
  13: {
    name: names[13],
    nameShort: namesShort[13],
    nameAbbr: namesAbbreviated[13],
    identifier: identifiers[13],
    wordCount: wordCounts[13],
    chapterCount: chapterCounts[13],
    chapterWordCounts: chapterWordCounts[13],
    chapterYears: chapterYears[13],
    verseCounts: verseCounts[13],
    // verseWordCounts: verseWordCounts[13],
  },
  14: {
    name: names[14],
    nameShort: namesShort[14],
    nameAbbr: namesAbbreviated[14],
    identifier: identifiers[14],
    wordCount: wordCounts[14],
    chapterCount: chapterCounts[14],
    chapterWordCounts: chapterWordCounts[14],
    chapterYears: chapterYears[14],
    verseCounts: verseCounts[14],
    // verseWordCounts: verseWordCounts[14],
  },
  15: {
    name: names[15],
    nameShort: namesShort[15],
    nameAbbr: namesAbbreviated[15],
    identifier: identifiers[15],
    wordCount: wordCounts[15],
    chapterCount: chapterCounts[15],
    chapterWordCounts: chapterWordCounts[15],
    chapterYears: chapterYears[15],
    verseCounts: verseCounts[15],
    // verseWordCounts: verseWordCounts[15],
  },
  16: {
    name: names[16],
    nameShort: namesShort[16],
    nameAbbr: namesAbbreviated[16],
    identifier: identifiers[16],
    wordCount: wordCounts[16],
    chapterCount: chapterCounts[16],
    chapterWordCounts: chapterWordCounts[16],
    chapterYears: chapterYears[16],
    verseCounts: verseCounts[16],
    // verseWordCounts: verseWordCounts[16],
  },
  17: {
    name: names[17],
    nameShort: namesShort[17],
    nameAbbr: namesAbbreviated[17],
    identifier: identifiers[17],
    wordCount: wordCounts[17],
    chapterCount: chapterCounts[17],
    chapterWordCounts: chapterWordCounts[17],
    chapterYears: chapterYears[17],
    verseCounts: verseCounts[17],
    // verseWordCounts: verseWordCounts[17],
  },
  18: {
    name: names[18],
    nameShort: namesShort[18],
    nameAbbr: namesAbbreviated[18],
    identifier: identifiers[18],
    wordCount: wordCounts[18],
    chapterCount: chapterCounts[18],
    chapterWordCounts: chapterWordCounts[18],
    chapterYears: chapterYears[18],
    verseCounts: verseCounts[18],
    // verseWordCounts: verseWordCounts[18],
  },
  19: {
    name: names[19],
    nameShort: namesShort[19],
    nameAbbr: namesAbbreviated[19],
    identifier: identifiers[19],
    wordCount: wordCounts[19],
    chapterCount: chapterCounts[19],
    chapterWordCounts: chapterWordCounts[19],
    chapterYears: chapterYears[19],
    verseCounts: verseCounts[19],
    // verseWordCounts: verseWordCounts[19],
  },
  20: {
    name: names[20],
    nameShort: namesShort[20],
    nameAbbr: namesAbbreviated[20],
    identifier: identifiers[20],
    wordCount: wordCounts[20],
    chapterCount: chapterCounts[20],
    chapterWordCounts: chapterWordCounts[20],
    chapterYears: chapterYears[20],
    verseCounts: verseCounts[20],
    // verseWordCounts: verseWordCounts[20],
  },
  21: {
    name: names[21],
    nameShort: namesShort[21],
    nameAbbr: namesAbbreviated[21],
    identifier: identifiers[21],
    wordCount: wordCounts[21],
    chapterCount: chapterCounts[21],
    chapterWordCounts: chapterWordCounts[21],
    chapterYears: chapterYears[21],
    verseCounts: verseCounts[21],
    // verseWordCounts: verseWordCounts[21],
  },
  22: {
    name: names[22],
    nameShort: namesShort[22],
    nameAbbr: namesAbbreviated[22],
    identifier: identifiers[22],
    wordCount: wordCounts[22],
    chapterCount: chapterCounts[22],
    chapterWordCounts: chapterWordCounts[22],
    chapterYears: chapterYears[22],
    verseCounts: verseCounts[22],
    // verseWordCounts: verseWordCounts[22],
  },
  23: {
    name: names[23],
    nameShort: namesShort[23],
    nameAbbr: namesAbbreviated[23],
    identifier: identifiers[23],
    wordCount: wordCounts[23],
    chapterCount: chapterCounts[23],
    chapterWordCounts: chapterWordCounts[23],
    chapterYears: chapterYears[23],
    verseCounts: verseCounts[23],
    // verseWordCounts: verseWordCounts[23],
  },
  24: {
    name: names[24],
    nameShort: namesShort[24],
    nameAbbr: namesAbbreviated[24],
    identifier: identifiers[24],
    wordCount: wordCounts[24],
    chapterCount: chapterCounts[24],
    chapterWordCounts: chapterWordCounts[24],
    chapterYears: chapterYears[24],
    verseCounts: verseCounts[24],
    // verseWordCounts: verseWordCounts[24],
  },
  25: {
    name: names[25],
    nameShort: namesShort[25],
    nameAbbr: namesAbbreviated[25],
    identifier: identifiers[25],
    wordCount: wordCounts[25],
    chapterCount: chapterCounts[25],
    chapterWordCounts: chapterWordCounts[25],
    chapterYears: chapterYears[25],
    verseCounts: verseCounts[25],
    // verseWordCounts: verseWordCounts[25],
  },
  26: {
    name: names[26],
    nameShort: namesShort[26],
    nameAbbr: namesAbbreviated[26],
    identifier: identifiers[26],
    wordCount: wordCounts[26],
    chapterCount: chapterCounts[26],
    chapterWordCounts: chapterWordCounts[26],
    chapterYears: chapterYears[26],
    verseCounts: verseCounts[26],
    // verseWordCounts: verseWordCounts[26],
  },
  27: {
    name: names[27],
    nameShort: namesShort[27],
    nameAbbr: namesAbbreviated[27],
    identifier: identifiers[27],
    wordCount: wordCounts[27],
    chapterCount: chapterCounts[27],
    chapterWordCounts: chapterWordCounts[27],
    chapterYears: chapterYears[27],
    verseCounts: verseCounts[27],
    // verseWordCounts: verseWordCounts[27],
  },
  28: {
    name: names[28],
    nameShort: namesShort[28],
    nameAbbr: namesAbbreviated[28],
    identifier: identifiers[28],
    wordCount: wordCounts[28],
    chapterCount: chapterCounts[28],
    chapterWordCounts: chapterWordCounts[28],
    chapterYears: chapterYears[28],
    verseCounts: verseCounts[28],
    // verseWordCounts: verseWordCounts[28],
  },
  29: {
    name: names[29],
    nameShort: namesShort[29],
    nameAbbr: namesAbbreviated[29],
    identifier: identifiers[29],
    wordCount: wordCounts[29],
    chapterCount: chapterCounts[29],
    chapterWordCounts: chapterWordCounts[29],
    chapterYears: chapterYears[29],
    verseCounts: verseCounts[29],
    // verseWordCounts: verseWordCounts[29],
  },
  30: {
    name: names[30],
    nameShort: namesShort[30],
    nameAbbr: namesAbbreviated[30],
    identifier: identifiers[30],
    wordCount: wordCounts[30],
    chapterCount: chapterCounts[30],
    chapterWordCounts: chapterWordCounts[30],
    chapterYears: chapterYears[30],
    verseCounts: verseCounts[30],
    // verseWordCounts: verseWordCounts[30],
  },
  31: {
    name: names[31],
    nameShort: namesShort[31],
    nameAbbr: namesAbbreviated[31],
    identifier: identifiers[31],
    wordCount: wordCounts[31],
    chapterCount: chapterCounts[31],
    chapterWordCounts: chapterWordCounts[31],
    chapterYears: chapterYears[31],
    verseCounts: verseCounts[31],
    // verseWordCounts: verseWordCounts[31],
  },
  32: {
    name: names[32],
    nameShort: namesShort[32],
    nameAbbr: namesAbbreviated[32],
    identifier: identifiers[32],
    wordCount: wordCounts[32],
    chapterCount: chapterCounts[32],
    chapterWordCounts: chapterWordCounts[32],
    chapterYears: chapterYears[32],
    verseCounts: verseCounts[32],
    // verseWordCounts: verseWordCounts[32],
  },
  33: {
    name: names[33],
    nameShort: namesShort[33],
    nameAbbr: namesAbbreviated[33],
    identifier: identifiers[33],
    wordCount: wordCounts[33],
    chapterCount: chapterCounts[33],
    chapterWordCounts: chapterWordCounts[33],
    chapterYears: chapterYears[33],
    verseCounts: verseCounts[33],
    // verseWordCounts: verseWordCounts[33],
  },
  34: {
    name: names[34],
    nameShort: namesShort[34],
    nameAbbr: namesAbbreviated[34],
    identifier: identifiers[34],
    wordCount: wordCounts[34],
    chapterCount: chapterCounts[34],
    chapterWordCounts: chapterWordCounts[34],
    chapterYears: chapterYears[34],
    verseCounts: verseCounts[34],
    // verseWordCounts: verseWordCounts[34],
  },
  35: {
    name: names[35],
    nameShort: namesShort[35],
    nameAbbr: namesAbbreviated[35],
    identifier: identifiers[35],
    wordCount: wordCounts[35],
    chapterCount: chapterCounts[35],
    chapterWordCounts: chapterWordCounts[35],
    chapterYears: chapterYears[35],
    verseCounts: verseCounts[35],
    // verseWordCounts: verseWordCounts[35],
  },
  36: {
    name: names[36],
    nameShort: namesShort[36],
    nameAbbr: namesAbbreviated[36],
    identifier: identifiers[36],
    wordCount: wordCounts[36],
    chapterCount: chapterCounts[36],
    chapterWordCounts: chapterWordCounts[36],
    chapterYears: chapterYears[36],
    verseCounts: verseCounts[36],
    // verseWordCounts: verseWordCounts[36],
  },
  37: {
    name: names[37],
    nameShort: namesShort[37],
    nameAbbr: namesAbbreviated[37],
    identifier: identifiers[37],
    wordCount: wordCounts[37],
    chapterCount: chapterCounts[37],
    chapterWordCounts: chapterWordCounts[37],
    chapterYears: chapterYears[37],
    verseCounts: verseCounts[37],
    // verseWordCounts: verseWordCounts[37],
  },
  38: {
    name: names[38],
    nameShort: namesShort[38],
    nameAbbr: namesAbbreviated[38],
    identifier: identifiers[38],
    wordCount: wordCounts[38],
    chapterCount: chapterCounts[38],
    chapterWordCounts: chapterWordCounts[38],
    chapterYears: chapterYears[38],
    verseCounts: verseCounts[38],
    // verseWordCounts: verseWordCounts[38],
  },
  39: {
    name: names[39],
    nameShort: namesShort[39],
    nameAbbr: namesAbbreviated[39],
    identifier: identifiers[39],
    wordCount: wordCounts[39],
    chapterCount: chapterCounts[39],
    chapterWordCounts: chapterWordCounts[39],
    chapterYears: chapterYears[39],
    verseCounts: verseCounts[39],
    // verseWordCounts: verseWordCounts[39],
  },
  40: {
    name: names[40],
    nameShort: namesShort[40],
    nameAbbr: namesAbbreviated[40],
    identifier: identifiers[40],
    wordCount: wordCounts[40],
    chapterCount: chapterCounts[40],
    chapterWordCounts: chapterWordCounts[40],
    chapterYears: chapterYears[40],
    verseCounts: verseCounts[40],
    // verseWordCounts: verseWordCounts[40],
  },
  41: {
    name: names[41],
    nameShort: namesShort[41],
    nameAbbr: namesAbbreviated[41],
    identifier: identifiers[41],
    wordCount: wordCounts[41],
    chapterCount: chapterCounts[41],
    chapterWordCounts: chapterWordCounts[41],
    chapterYears: chapterYears[41],
    verseCounts: verseCounts[41],
    // verseWordCounts: verseWordCounts[41],
  },
  42: {
    name: names[42],
    nameShort: namesShort[42],
    nameAbbr: namesAbbreviated[42],
    identifier: identifiers[42],
    wordCount: wordCounts[42],
    chapterCount: chapterCounts[42],
    chapterWordCounts: chapterWordCounts[42],
    chapterYears: chapterYears[42],
    verseCounts: verseCounts[42],
    // verseWordCounts: verseWordCounts[42],
  },
  43: {
    name: names[43],
    nameShort: namesShort[43],
    nameAbbr: namesAbbreviated[43],
    identifier: identifiers[43],
    wordCount: wordCounts[43],
    chapterCount: chapterCounts[43],
    chapterWordCounts: chapterWordCounts[43],
    chapterYears: chapterYears[43],
    verseCounts: verseCounts[43],
    // verseWordCounts: verseWordCounts[43],
  },
  44: {
    name: names[44],
    nameShort: namesShort[44],
    nameAbbr: namesAbbreviated[44],
    identifier: identifiers[44],
    wordCount: wordCounts[44],
    chapterCount: chapterCounts[44],
    chapterWordCounts: chapterWordCounts[44],
    chapterYears: chapterYears[44],
    verseCounts: verseCounts[44],
    // verseWordCounts: verseWordCounts[44],
  },
  45: {
    name: names[45],
    nameShort: namesShort[45],
    nameAbbr: namesAbbreviated[45],
    identifier: identifiers[45],
    wordCount: wordCounts[45],
    chapterCount: chapterCounts[45],
    chapterWordCounts: chapterWordCounts[45],
    chapterYears: chapterYears[45],
    verseCounts: verseCounts[45],
    // verseWordCounts: verseWordCounts[45],
  },
  46: {
    name: names[46],
    nameShort: namesShort[46],
    nameAbbr: namesAbbreviated[46],
    identifier: identifiers[46],
    wordCount: wordCounts[46],
    chapterCount: chapterCounts[46],
    chapterWordCounts: chapterWordCounts[46],
    chapterYears: chapterYears[46],
    verseCounts: verseCounts[46],
    // verseWordCounts: verseWordCounts[46],
  },
  47: {
    name: names[47],
    nameShort: namesShort[47],
    nameAbbr: namesAbbreviated[47],
    identifier: identifiers[47],
    wordCount: wordCounts[47],
    chapterCount: chapterCounts[47],
    chapterWordCounts: chapterWordCounts[47],
    chapterYears: chapterYears[47],
    verseCounts: verseCounts[47],
    // verseWordCounts: verseWordCounts[47],
  },
  48: {
    name: names[48],
    nameShort: namesShort[48],
    nameAbbr: namesAbbreviated[48],
    identifier: identifiers[48],
    wordCount: wordCounts[48],
    chapterCount: chapterCounts[48],
    chapterWordCounts: chapterWordCounts[48],
    chapterYears: chapterYears[48],
    verseCounts: verseCounts[48],
    // verseWordCounts: verseWordCounts[48],
  },
  49: {
    name: names[49],
    nameShort: namesShort[49],
    nameAbbr: namesAbbreviated[49],
    identifier: identifiers[49],
    wordCount: wordCounts[49],
    chapterCount: chapterCounts[49],
    chapterWordCounts: chapterWordCounts[49],
    chapterYears: chapterYears[49],
    verseCounts: verseCounts[49],
    // verseWordCounts: verseWordCounts[49],
  },
  50: {
    name: names[50],
    nameShort: namesShort[50],
    nameAbbr: namesAbbreviated[50],
    identifier: identifiers[50],
    wordCount: wordCounts[50],
    chapterCount: chapterCounts[50],
    chapterWordCounts: chapterWordCounts[50],
    chapterYears: chapterYears[50],
    verseCounts: verseCounts[50],
    // verseWordCounts: verseWordCounts[50],
  },
  51: {
    name: names[51],
    nameShort: namesShort[51],
    nameAbbr: namesAbbreviated[51],
    identifier: identifiers[51],
    wordCount: wordCounts[51],
    chapterCount: chapterCounts[51],
    chapterWordCounts: chapterWordCounts[51],
    chapterYears: chapterYears[51],
    verseCounts: verseCounts[51],
    // verseWordCounts: verseWordCounts[51],
  },
  52: {
    name: names[52],
    nameShort: namesShort[52],
    nameAbbr: namesAbbreviated[52],
    identifier: identifiers[52],
    wordCount: wordCounts[52],
    chapterCount: chapterCounts[52],
    chapterWordCounts: chapterWordCounts[52],
    chapterYears: chapterYears[52],
    verseCounts: verseCounts[52],
    // verseWordCounts: verseWordCounts[52],
  },
  53: {
    name: names[53],
    nameShort: namesShort[53],
    nameAbbr: namesAbbreviated[53],
    identifier: identifiers[53],
    wordCount: wordCounts[53],
    chapterCount: chapterCounts[53],
    chapterWordCounts: chapterWordCounts[53],
    chapterYears: chapterYears[53],
    verseCounts: verseCounts[53],
    // verseWordCounts: verseWordCounts[53],
  },
  54: {
    name: names[54],
    nameShort: namesShort[54],
    nameAbbr: namesAbbreviated[54],
    identifier: identifiers[54],
    wordCount: wordCounts[54],
    chapterCount: chapterCounts[54],
    chapterWordCounts: chapterWordCounts[54],
    chapterYears: chapterYears[54],
    verseCounts: verseCounts[54],
    // verseWordCounts: verseWordCounts[54],
  },
  55: {
    name: names[55],
    nameShort: namesShort[55],
    nameAbbr: namesAbbreviated[55],
    identifier: identifiers[55],
    wordCount: wordCounts[55],
    chapterCount: chapterCounts[55],
    chapterWordCounts: chapterWordCounts[55],
    chapterYears: chapterYears[55],
    verseCounts: verseCounts[55],
    // verseWordCounts: verseWordCounts[55],
  },
  56: {
    name: names[56],
    nameShort: namesShort[56],
    nameAbbr: namesAbbreviated[56],
    identifier: identifiers[56],
    wordCount: wordCounts[56],
    chapterCount: chapterCounts[56],
    chapterWordCounts: chapterWordCounts[56],
    chapterYears: chapterYears[56],
    verseCounts: verseCounts[56],
    // verseWordCounts: verseWordCounts[56],
  },
  57: {
    name: names[57],
    nameShort: namesShort[57],
    nameAbbr: namesAbbreviated[57],
    identifier: identifiers[57],
    wordCount: wordCounts[57],
    chapterCount: chapterCounts[57],
    chapterWordCounts: chapterWordCounts[57],
    chapterYears: chapterYears[57],
    verseCounts: verseCounts[57],
    // verseWordCounts: verseWordCounts[57],
  },
  58: {
    name: names[58],
    nameShort: namesShort[58],
    nameAbbr: namesAbbreviated[58],
    identifier: identifiers[58],
    wordCount: wordCounts[58],
    chapterCount: chapterCounts[58],
    chapterWordCounts: chapterWordCounts[58],
    chapterYears: chapterYears[58],
    verseCounts: verseCounts[58],
    // verseWordCounts: verseWordCounts[58],
  },
  59: {
    name: names[59],
    nameShort: namesShort[59],
    nameAbbr: namesAbbreviated[59],
    identifier: identifiers[59],
    wordCount: wordCounts[59],
    chapterCount: chapterCounts[59],
    chapterWordCounts: chapterWordCounts[59],
    chapterYears: chapterYears[59],
    verseCounts: verseCounts[59],
    // verseWordCounts: verseWordCounts[59],
  },
  60: {
    name: names[60],
    nameShort: namesShort[60],
    nameAbbr: namesAbbreviated[60],
    identifier: identifiers[60],
    wordCount: wordCounts[60],
    chapterCount: chapterCounts[60],
    chapterWordCounts: chapterWordCounts[60],
    chapterYears: chapterYears[60],
    verseCounts: verseCounts[60],
    // verseWordCounts: verseWordCounts[60],
  },
  61: {
    name: names[61],
    nameShort: namesShort[61],
    nameAbbr: namesAbbreviated[61],
    identifier: identifiers[61],
    wordCount: wordCounts[61],
    chapterCount: chapterCounts[61],
    chapterWordCounts: chapterWordCounts[61],
    chapterYears: chapterYears[61],
    verseCounts: verseCounts[61],
    // verseWordCounts: verseWordCounts[61],
  },
  62: {
    name: names[62],
    nameShort: namesShort[62],
    nameAbbr: namesAbbreviated[62],
    identifier: identifiers[62],
    wordCount: wordCounts[62],
    chapterCount: chapterCounts[62],
    chapterWordCounts: chapterWordCounts[62],
    chapterYears: chapterYears[62],
    verseCounts: verseCounts[62],
    // verseWordCounts: verseWordCounts[62],
  },
  63: {
    name: names[63],
    nameShort: namesShort[63],
    nameAbbr: namesAbbreviated[63],
    identifier: identifiers[63],
    wordCount: wordCounts[63],
    chapterCount: chapterCounts[63],
    chapterWordCounts: chapterWordCounts[63],
    chapterYears: chapterYears[63],
    verseCounts: verseCounts[63],
    // verseWordCounts: verseWordCounts[63],
  },
  64: {
    name: names[64],
    nameShort: namesShort[64],
    nameAbbr: namesAbbreviated[64],
    identifier: identifiers[64],
    wordCount: wordCounts[64],
    chapterCount: chapterCounts[64],
    chapterWordCounts: chapterWordCounts[64],
    chapterYears: chapterYears[64],
    verseCounts: verseCounts[64],
    // verseWordCounts: verseWordCounts[64],
  },
  65: {
    name: names[65],
    nameShort: namesShort[65],
    nameAbbr: namesAbbreviated[65],
    identifier: identifiers[65],
    wordCount: wordCounts[65],
    chapterCount: chapterCounts[65],
    chapterWordCounts: chapterWordCounts[65],
    chapterYears: chapterYears[65],
    verseCounts: verseCounts[65],
    // verseWordCounts: verseWordCounts[65],
  },
  66: {
    name: names[66],
    nameShort: namesShort[66],
    nameAbbr: namesAbbreviated[66],
    identifier: identifiers[66],
    wordCount: wordCounts[66],
    chapterCount: chapterCounts[66],
    chapterWordCounts: chapterWordCounts[66],
    chapterYears: chapterYears[66],
    verseCounts: verseCounts[66],
    // verseWordCounts: verseWordCounts[66],
  },
});