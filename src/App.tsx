import './App.css'
import untypedReadingPlan from './catechism-reading-plan.json';
import { ReadingPlan } from './ReadingPlan';
import ReadingPlanList from './ReadingPlanList';
import useProgressState from './use-progress-state';

const readingPlan: ReadingPlan = untypedReadingPlan;

function App() {
  const { dispatch, progress, setDayProgress } = useProgressState();

  return (
    <div className="App">
      <h1>Catehism in a Year Tracker</h1>
      <ReadingPlanList
        progress={progress}
        readingPlanDays={readingPlan}
        setDayProgress={setDayProgress}
      />
    </div>
  );
}

export default App
