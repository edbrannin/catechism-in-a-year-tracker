import './App.css'
import untypedReadingPlan from './catechism-reading-plan.json';
import GithubCorner from './GithubCorner';
import NextUp from './NextUp';
import { ReadingPlan } from './ReadingPlan';
import ReadingPlanList from './ReadingPlanList';
import useProgressState from './use-progress-state';

const readingPlan: ReadingPlan = untypedReadingPlan;

function App() {
  const { dispatch, progress, setDayProgress, stateError } = useProgressState();

  return (
    <div className="App">
      <h1>Catehism in a Year Tracker</h1>
      <NextUp
        progress={progress}
        readingPlanDays={readingPlan}
        setDayProgress={setDayProgress}
      />
      <div>
        <a href="https://ascensionpress.com/ciy" className="link-button">Find the podcast and other resources here!</a>
      </div>
      <ReadingPlanList
        progress={progress}
        readingPlanDays={readingPlan}
        setDayProgress={setDayProgress}
      />
      <GithubCorner href="https://github.com/edbrannin/catechism-in-a-year-tracker"/>
    </div>
  );
}

export default App
