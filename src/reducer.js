export default (state, action) => {
  switch (action.type) {
    case 'TOGGLE_STREAM':
      return {
        ...state,
        sources: {
          ...state.sources,
          [action.payload.type]: (state.sources[action.payload.type] ? false : action.payload.source),
        },
      };
    default:
      return state;
  }
};
