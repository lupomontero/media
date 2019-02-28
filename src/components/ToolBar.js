import createElement from '../lib/createElement.js';
import getUserMedia from '../lib/getUserMedia.js';
import { createRecorder, stopRecorder } from '../lib/recorder.js';
import { toggleSource, record, pause, stop } from '../actions.js';
import Button from './Button.js';


const styles = {
  root: {
    position: 'absolute',
    bottom: '10px',
    textAlign: 'center',
    width: '100%',
  },
};


export default ({ store, preview }) => {
  const { getState, dispatch } = store;
  const { sources, isRecording, recorder, recordedBlobs } = getState();
  return createElement('div', {
    id: 'ToolBar',
    style: styles.root,
    children: [
      Button({
        text: '🎙',
        active: !!sources.audio,
        onClick: async () => dispatch(toggleSource(
          'audio',
          await getUserMedia('audio'),
        )),
      }),
      Button({
        text: '🎥',
        active: !!sources.camera,
        onClick: async () => dispatch(toggleSource(
          'camera',
          await getUserMedia('camera'),
        )),
      }),
      Button({
        text: '💻',
        active: !!sources.screen,
        onClick: async () => dispatch(toggleSource(
          'screen',
          await getUserMedia('screen'),
        )),
      }),
      (isRecording)
        ? Button({
          text: '⏹',
          onClick: async () => dispatch(stop(
            await stopRecorder(recorder, recordedBlobs),
          )),
        })
        : Button({
          text: '⏺',
          onClick: () => dispatch(record(createRecorder(preview, sources))),
        }),
    ],
  });
};
