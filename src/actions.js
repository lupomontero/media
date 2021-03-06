export const toggleSource = (type, source) => ({
  type: 'TOGGLE_SOURCE',
  payload: { type, source },
});

export const record = ({ canvas, recorder, recordedBlobs }) => ({
  type: 'RECORD',
  payload: { canvas, recorder, recordedBlobs },
});

export const togglePause = () => ({
  type: 'TOGGLE_PAUSE',
});

export const stop = () => ({
  type: 'STOP',
});
