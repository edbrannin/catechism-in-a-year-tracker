import { useReducer } from 'react'

export type DayProgress = {
  readCatechism: boolean,
  readOther: boolean,
  heardPodcast: boolean,
}

export type ProgressState = {
  days: Record<number, DayProgress>;
}

export const initState = (): ProgressState => ({
  days: {},
});

export const progressReducer = (
  state: ProgressState,
  {
    day,
    progress,
  } : {
    day: number,
    progress: DayProgress,
  },
) : ProgressState=> {
  return {
    ...state,
    days: {
      ...state.days,
      [day]: progress,
    },
  };
}

export type PartialDayProgress = {
  [Property in keyof DayProgress]?: DayProgress[Property];
}


export const makeProgress = ({ readCatechism, readOther, heardPodcast } : PartialDayProgress): DayProgress => ({
  readCatechism: readCatechism || false,
  readOther: readOther || false,
  heardPodcast: heardPodcast || false,
})

export type SetDayProrgessFunc = (day: number, progress: PartialDayProgress) => void;

const useProgressState = () => {
  const [state, dispatch] = useReducer(progressReducer, undefined, initState);
  
  const setDayProgress : SetDayProrgessFunc = (day: number, progress: PartialDayProgress) => dispatch({
    day,
    progress: makeProgress({
      ...state.days[day],
      ...progress
    }),
  });

  return {
    progress: state,
    dispatch,
    setDayProgress,
  };
};

export default useProgressState;
