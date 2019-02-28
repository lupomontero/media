export default (state, action) => {
  switch (action.type) {
    case 'TOGGLE_STREAM':
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
    case 'PAUSE':
      return {
        ...state,
        isPaused: true,
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
