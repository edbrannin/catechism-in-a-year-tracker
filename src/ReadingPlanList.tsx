import React from "react";
import CatechismLink from "./CatechismLink";
import ProgressCheckbox from "./ProgressCheckbox";
import { ReadingPlan } from "./ReadingPlan";
import { ProgressState, SetDayProrgessFunc } from "./use-progress-state";

const ReadingPlanList = ({
  readingPlanDays,
  setDayProgress,
  progress,
} : {
  readingPlanDays: ReadingPlan,
  setDayProgress: SetDayProrgessFunc,
  progress: ProgressState,
}) => (
  <table className="reading-plan-list">
    <thead>
      <tr>
        <th>Day</th>
        <th>Read</th>
        <th>Read Catechism?</th>
        <th>Heard Podcast?</th>
      </tr>
    </thead>
    <tbody>
      {readingPlanDays.map(({
        day,
        partColor,

        partName,
        partNumber,
        sectionName,
        sectionNumber,
        chapterName,
        chapterNumber,

        isNewChapter,
        isNewPart,
        isNewSection,

        paragraphStart,
        paragraphEnd,
        alsoRead,
      }) => (
        <React.Fragment key={day}>
          {isNewPart && (
            <tr>
              <td colSpan={4}>
                {`Part ${partNumber}: ${partName}`}
              </td>
            </tr>
          )}
          {isNewSection && (
            <tr>
              <td colSpan={4}>
                {`Section ${sectionNumber}: ${sectionName}`}
              </td>
            </tr>
          )}
          {isNewChapter && (
            <tr>
              <td colSpan={4}>
                {`Chapter ${chapterNumber}: ${chapterName}`}
              </td>
            </tr>
          )}
          <tr key={day} className={`row-${partColor}`}>
            <td>{day}</td>
            <td>
              <CatechismLink startParagraph={paragraphStart} endParagraph={paragraphEnd} />
              {alsoRead && (<>
                <br />
                {`${alsoRead}`}
              </>)}
            </td>
            <td className="read-catechism">
              {paragraphStart ? (
                <ProgressCheckbox
                  day={day}
                  name="readCatechism"
                  setDayProgress={setDayProgress}
                  value={progress.days[day]?.readCatechism}
                />
              ) : ''}
              {alsoRead && (
                <ProgressCheckbox
                  day={day}
                  name="readOther"
                  setDayProgress={setDayProgress}
                  value={progress.days[day]?.readOther}
                />
              )}
            </td>
            <td className="heard-podcast">
              <ProgressCheckbox
                day={day}
                name="heardPodcast"
                setDayProgress={setDayProgress}
                value={progress.days[day]?.heardPodcast}
              />
            </td>
          </tr>
        </React.Fragment>
      ))}
    </tbody>
  </table>
);

export default ReadingPlanList;
