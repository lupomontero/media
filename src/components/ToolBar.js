import createElement from '../lib/createElement.js';
import getUserMedia from '../lib/getUserMedia.js';
import { toggleStream, record, pause, stop } from '../actions.js';
import Button from './Button.js';


const styles = {
  root: {
    position: 'absolute',
    bottom: '10px',
    textAlign: 'center',
    width: '100%',
  },
};


const createRecorder = (canvas, sources) => {
  const outputStream = new MediaStream();
  const inputStreams = [
    ...(sources.audio && sources.audio.stream ? [sources.audio.stream] : []),
    ...(sources.camera || sources.screen ? [canvas.captureStream()] : []),
  ];

  inputStreams.forEach(
    stream => stream.getTracks().forEach(
      track => outputStream.addTrack(track),
    ),
  );

  const recordedBlobs = [];
  const recorder = new MediaRecorder(outputStream, {
    mimeType: 'video/webm',
  });

  Object.assign(recorder, { _recordedBlobs: [] });

  recorder.addEventListener('dataavailable', (e) => {
    if (e.data && e.data.size > 0) {
      recordedBlobs.push(e.data);
    }
  });

  recorder.start(1000);

  return { canvas, recorder, recordedBlobs };
};


const stopRecorder = (recorder, recordedBlobs) => {
  recorder.stop();

  const blob = new Blob(recordedBlobs, { type: 'video/webm' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'test.webm';
  document.body.appendChild(a);
  // a.click();

  return new Promise((resolve, reject) => {
    a.click();
    console.log('has clicked!!!!')
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      resolve();
    }, 100);
  });
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
        onClick: async () => dispatch(toggleStream(
          'audio',
          await getUserMedia('audio'),
        )),
      }),
      Button({
        text: '🎥',
        active: !!sources.camera,
        onClick: async () => dispatch(toggleStream(
          'camera',
          await getUserMedia('camera'),
        )),
      }),
      Button({
        text: '💻',
        active: !!sources.screen,
        onClick: async () => dispatch(toggleStream(
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
