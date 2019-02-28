export const toggleStream = (type, source) => ({
  type: 'TOGGLE_STREAM',
  payload: { type, source },
});
