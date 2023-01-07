import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';

/**
 * @type InputPlanDay
 * @property {string} "Day"
 * @property {string} "Part"
 * @property {string} "Part Color"
 * @property {string} "Part Number"
 * @property {string} "Section"
 * @property {string} "Section Number"
 * @property {string} "Chapter"
 * @property {string} "Chapter Number"
 * @property {string} "Also Read"
 * @property {string} "Paragraph Start"
 * @property {string} "Paragraph End"
 */

/**
 * @type ResultPlanDay
 * @property {string} partName
 * @property {string} partColor
 * @property {number} partNumber
 * @property {string} sectionName
 * @property {number} sectionNumber
 * @property {string} chapterName
 * @property {number} chapterNumber
 * @property {boolean} isNewPart
 * @property {boolean} isNewSection
 * @property {boolean} isNewChapter
 * @property {string} day
 * @property {number} paragraphStart
 * @property {number} paragraphEnd
 * @property {string?} alsoRead
 */

/**
 * @param {InputPlanDay[]} planDays
 * @returns {ResultPlanDay[]}
 */
export const convertPlanDays = (planDays) => {
  let lastPartNumber = 0;
  let lastSectionNumber = 0;
  let lastChapterNumber = 0;

  let lastPartName = '';
  let lastSectionName = '';
  let lastChapterName = '';
  let lastPartColor = '';

  let isNewPart;
  let isNewSection;
  let isNewChapter;

  const result = [];

  planDays.forEach((inputDay) => {
    isNewPart = false;
    isNewSection = false;
    isNewChapter = false;
    if (inputDay['Part Number']) {
      lastPartNumber = Number(inputDay['Part Number']);
    }
    if (inputDay['Section Number']) {
      lastSectionNumber = Number(inputDay['Section Number']);
    }
    if (inputDay['Chapter Number']) {
      lastChapterNumber = Number(inputDay['Chapter Number']);
    }

    if (inputDay['Part']) {
      lastPartName = inputDay['Part'];
      isNewPart = true;
    }
    if (inputDay['Part Color']) {
      lastPartColor = inputDay['Part Color'];
    }
    if (inputDay['Section']) {
      lastSectionName = inputDay['Section'];
      isNewSection = true;
    }
    if (inputDay['Chapter']) {
      lastChapterName = inputDay['Chapter'];
      isNewChapter = true;
    }

    result.push({
      day: inputDay['Day'],
      partName: lastPartName,
      partColor: lastPartColor,
      partNumber: lastPartNumber,
      sectionName: lastSectionName,
      sectionNumber: lastSectionNumber,
      chapterName: lastChapterName,
      chapterNumber: lastChapterNumber,
      isNewPart,
      isNewSection,
      isNewChapter,
      paragraphStart: Number(inputDay['Paragraph Start']),
      paragraphEnd: Number(inputDay['Paragraph End']),
      alsoRead: inputDay['Also Read'],
    })
  });

  return result;
}

const main = async () => {
  /**
   * @type {InputPlanDay[]}
   */
  const inputPlan = JSON.parse(await fs.readFile('src/catechism-reading-plan.json'));
  const result = convertPlanDays(inputPlan);
  await fs.writeFile('src/catechism-reading-plan.json', JSON.stringify(result, null, 2));
}

const isMain = fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  main();
}
