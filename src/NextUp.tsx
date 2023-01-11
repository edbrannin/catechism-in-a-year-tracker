import { useMemo } from "react";
import CatechismLink from "./CatechismLink";
import ProgressCheckbox from "./ProgressCheckbox";
import { ReadingPlan, ReadingPlanDay } from "./ReadingPlan";
import { ProgressState, SetDayProrgessFunc } from "./use-progress-state";

const firstIncompleteDay = (readingPlanDays: ReadingPlan, { days }: ProgressState) => {
  // Here be dragons: readingPlanDays is 0-indexed, but days is 1-indexed
  for (let x = 0; x < readingPlanDays.length; x += 1) {
    const day = readingPlanDays[x].day;
    if (
      (!days[day]?.heardPodcast)
      || (readingPlanDays[x].paragraphStart && !days[day]?.readCatechism)
      || (readingPlanDays[x].alsoRead && !days[day]?.readOther)
    ) {
      return x;
    }
  }
  return null;
}

const getPartSectionChapter = ({
  partName,
  partNumber,
  sectionName,
  sectionNumber,
  chapterName,
  chapterNumber,
} : ReadingPlanDay) => {
  const result = [];
  if (partName) {
    result.push(`Part ${partNumber}: ${partName}`);
  }
  if (sectionName) {
    result.push(`Section ${sectionNumber}: ${sectionName}`);
  }
  if (chapterName) {
    result.push(`Chapter ${chapterNumber}: ${chapterName}`);
  }
  return result;
}

const NextUpDetail = ({
  nextPlanDay,
  setDayProgress,
  progress,
} : {
  nextPlanDay: ReadingPlanDay,
  setDayProgress: SetDayProrgessFunc,
  progress: ProgressState,
}) => {
  const {
    paragraphStart,
    paragraphEnd,
    alsoRead,
    day,
  } = nextPlanDay;

  const partSectionChapter = useMemo(() => getPartSectionChapter(nextPlanDay), [nextPlanDay]);

  return (
    <div className="next-up">
      <h2>Next up: Day {day}</h2>
      {partSectionChapter.map(line => (
        <div key={line}>
          {line}
        </div>
      ))}
      <table>
        <thead>
          <tr>
            <th>Done?</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paragraphStart ? (
            <tr>
              <td>
                <ProgressCheckbox
                  day={day}
                  name="readCatechism"
                  setDayProgress={setDayProgress}
                  value={progress.days[day]?.readCatechism}
                />
              </td>
              <td>
                Read Catechism paragraphs <CatechismLink startParagraph={paragraphStart} endParagraph={paragraphEnd} />
              </td>
            </tr>
          ) : ''}
          {alsoRead && (
            <tr>
              <td>
                <ProgressCheckbox
                  day={day}
                  name="readOther"
                  setDayProgress={setDayProgress}
                  value={progress.days[day]?.readOther}
                />
              </td>
              <td>
                Also read {alsoRead}
              </td>
            </tr>
          )}
          <tr>
            <td>
              <ProgressCheckbox
                day={day}
                name="heardPodcast"
                setDayProgress={setDayProgress}
                value={progress.days[day]?.heardPodcast}
              />
            </td>
            <td>
              Listen to the Podcast
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const NextUp = ({
  readingPlanDays,
  setDayProgress,
  progress,
} : {
  readingPlanDays: ReadingPlan,
  setDayProgress: SetDayProrgessFunc,
  progress: ProgressState,
}) => {
  const nextDay = useMemo(() => firstIncompleteDay(readingPlanDays, progress), [readingPlanDays, progress]);
  const day = nextDay;
  if (nextDay === null) {
    return (
      <div>
        <h1>All done!</h1>
      </div>
    );
  }

  const nextPlanDay = readingPlanDays[nextDay];
  return (
    <NextUpDetail
      progress={progress}
      setDayProgress={setDayProgress}
      nextPlanDay={nextPlanDay}
    />
  );
}

export default NextUp;
