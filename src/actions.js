export const toggleStream = (type, source) => ({
  type: 'TOGGLE_STREAM',
  payload: { type, source },
});

export const record = ({ canvas, recorder, recordedBlobs }) => ({
  type: 'RECORD',
  payload: { canvas, recorder, recordedBlobs },
});

export const pause = () => ({
  type: 'PAUSE',
});

export const stop = () => ({
  type: 'STOP',
});
