export default (state, action) => {
  switch (action.type) {
    case 'TOGGLE_SOURCE':
      return {
        ...state,
        sources: {
          ...state.sources,
          [action.payload.type]: (
            state.sources[action.payload.type]
              ? false
              : action.payload.source
            ),
        },
      };
    case 'RECORD':
      return {
        ...state,
        isRecording: true,
        canvas: action.payload.canvas,
        recorder: action.payload.recorder,
        recordedBlobs: action.payload.recordedBlobs,
      };
    case 'TOGGLE_PAUSE':
      return {
        ...state,
        isPaused: !state.isPaused,
      };
    case 'STOP':
      return {
        ...state,
        isRecording: false,
        isPaused: false,
      };
    default:
      return state;
  }
};
