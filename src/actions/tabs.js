export const handlePrevMonth = () => {
  return {
    type: "HANDLE_PREV_MONTH"
  };
};

export const handleNextMonth = () => {
  return {
    type: "HANDLE_NEXT_MONTH"
  }
}

export const handleTargetMonth = index => {
  return {
    type: 'HANDLE_TARGET_MONTH',
    index
  }
}