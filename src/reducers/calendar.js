const defaultState = {
  months: [],
  // Middle Show Month Index
  mMonth: 1,
  targetMonth: 1,
  schedules: [],
  isList: false,
  curPage: 1,
  targetItem: undefined
}

export default (state = defaultState, action) => {
  const { mMonth, targetMonth } = state;
  switch(action.type) {
    case "HANDLE_PREV_MONTH":
      if (mMonth > 1) 
      return {
        ...state,
        mMonth: mMonth - 1,
        targetMonth: mMonth - 1
      };
    else if (targetMonth === 1) 
      return { 
        ...state,
        targetMonth: targetMonth - 1 
      };
    default: 
      return state;
  }
}

