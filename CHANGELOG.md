# Changelog

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
