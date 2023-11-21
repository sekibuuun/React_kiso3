const initialState = {
  pageNumber: 0,
};

const pageCounter = (state = initialState, action) => {
  switch (action.type) {
    case "NEXT_PAGE":
      return { ...state, pageNumber: state.pageNumber + 1 };
    case "PREV_PAGE":
      return { ...state, pageNumber: Math.max(state.pageNumber - 1, 0) };
    default:
      return state;
  }
};

export { pageCounter };
