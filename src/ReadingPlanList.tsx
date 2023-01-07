import { ReadingPlan } from "./ReadingPlan";
import { DayProgress, ProgressState, SetDayProrgessFunc } from "./use-progress-state";

const ProgressCheckbox = ({
  day, value, name, setDayProgress
}: {
  day: number,
  value: boolean,
  name: string,
  setDayProgress: SetDayProrgessFunc,
}) => (
  <label
    className="progress-checkbox"
  >
    <input
      type="checkbox"
      checked={value}
      onChange={() => setDayProgress(day, { [name]: !value })}
    />
  </label>
)

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
        <th>Part</th>
        <th>Section</th>
        <th>Chapter</th>
        <th>Day</th>
        <th>Read</th>
        <th>Read Catehism?</th>
        <th>Read Other?</th>
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
        <tr key={day} className={`row-${partColor}`}>
          <td>{isNewPart ? `Part ${partNumber}: ${partName}` : ''}</td>
          <td>{isNewSection ? `Section ${sectionNumber}: ${sectionName}` : ''}</td>
          <td>{isNewChapter ? `Chapter ${chapterNumber}: ${chapterName}` : ''}</td>
          <td>{day}</td>
          <td>{paragraphStart ? `${paragraphStart} - ${paragraphEnd}${alsoRead ? `; ${alsoRead}` : ''}` : ''}</td>
          <td>
            <ProgressCheckbox
              day={day}
              name="readCatechism"
              setDayProgress={setDayProgress}
              value={progress.days[day]?.readCatechism}
            />
          </td>
          <td>
            {alsoRead && (
              <ProgressCheckbox
                day={day}
                name="readOther"
                setDayProgress={setDayProgress}
                value={progress.days[day]?.readOther}
              />)
            }
          </td>
          <td>
            <ProgressCheckbox
              day={day}
              name="heardPodcast"
              setDayProgress={setDayProgress}
              value={progress.days[day]?.heardPodcast}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ReadingPlanList;
