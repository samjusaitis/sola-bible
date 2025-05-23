# Changelog

## 1.3.21

-  Add `isWholeBook` getter to Passage.

## 1.3.20

-  Fix Ezra/Nehemiah bug in `getBookGroupName`;

## 1.3.19

-  Add `chapterCount` and `wordCount` to subset return

## 1.3.18

-  Fix Passage.args type.

## 1.3.17

-  Add `isStartVerseStartOfChapter` getter to Passage.
-  Add `isEndVerseEndOfChapter` getter to Passage.

## 1.3.16

-  Add `verseCount` getter to Passage.

## 1.3.15

-  Update Passage.getChapterArray() to include optional `excludePartialChapters` param.

## 1.3.14

-  Add `excludePartialChapters` param to Passage.getChapterArray() function.
-  Add `isStartChapterWhole` boolean to Passage.
-  Add `isEndChapterWhole` boolean to Passage.

## 1.3.13

-  Add getVerseRangeWordCount() util function.

## 1.3.12

-  Add `bookString` getter to Passage. Marked `bookName` as deprecated,
   to be removed in a future minor version.

## 1.3.11

-  Add `childSubsets` to Bible.subset return

## 1.3.10

-  Add `verseCount` to Bible.book return

## 1.3.9

-  Fix passage toString logic

## 1.3.8

-  Fix `BibleBook` typing

## 1.3.7

-  Added `BibleBook` enum export

## 1.3.6

-  Update getSubsetFromBookRange() to include new subset values.

## 1.3.5

-  Make `BookRange` a public type.

## 1.3.4

-  Update PassageArgs to be a simplified representative type.

## 1.3.3

-  Allow null values to be passed to Bible.subset().

## 1.3.2

-  Allowed passing a `chapterRange` to the Passage constructor.

## 1.3.1

-  Added "type": "module" to package.json.

## 1.3.0

-  Deprecated default Bible export for named export.

## 1.2.8

-  Switch to using private values in Passage.
-  Add `start`, `end` and `args` getters in Passage.

## 1.2.7

-  Added getChapterRange() to Passage.

## 1.2.6

-  Added ChapterAndVerse type.

## 1.2.5

-  Fix PassageArgs type.

## 1.2.4

-  Allow Passage to optionally accept PassageArgs type object.

## 1.2.3

-  Improved Passage.rangeString() logic.

## 1.2.2

-  Internals: rename `bookId` variables to `book`.

## 1.2.1

-  Patch release.

## 1.2.0

-  Added Passage class.
-  Deprecated `normaliseChapter` util, which is now accessed from `Passage.normaliseChapter`.
-  Deprecated `normaliseVerse` util, which is now accessed from `Passage.normaliseVerse`.
-  Started changelog.
