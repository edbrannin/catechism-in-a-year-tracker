export type ReadingPlanDay = {
  day: number,
  partName: string,
  partColor: string,
  partNumber: number,
  sectionName: string,
  sectionNumber: number,
  chapterName: string,
  chapterNumber: number,
  isNewPart: boolean,
  isNewSection: boolean,
  isNewChapter: boolean,
  paragraphStart: number,
  paragraphEnd: number,
  alsoRead?: string,
}

export type ReadingPlan = ReadingPlanDay[];
