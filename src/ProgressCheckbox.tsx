import { SetDayProrgessFunc } from "./use-progress-state";

const ProgressCheckbox = ({
  day, value, name, setDayProgress,
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

export default ProgressCheckbox;
