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
  const { months, mMonth, targetMonth } = state;
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
    case "HANDLE_NEXT_MONTH":
      if (mMonth < months.length - 2) 
        return ({
          ...state,
          mMonth: mMonth + 1,
          targetMonth: mMonth + 1
        })
      else if (targetMonth === months.length - 2) 
        return ({
          ...state,
          targetMonth : targetMonth + 1
        })
    case "HANDLE_TARGET_MONTH":
      const { index } = action;
      if (index >= 1 && index <= months.length - 2) 
        return ({ 
          ...state,
          mMonth: index, 
          targetMonth: index 
        });
      else 
        return ({ 
          ...state,
          targetMonth: index 
        });
    case "GET_SCHEDULES":
      return { ...state, ...action.data };
    default: 
      return state;
  }
}

