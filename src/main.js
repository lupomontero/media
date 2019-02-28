import render from './lib/render.js';
import { createStore, withStore } from './lib/store.js';
import App from './components/App.js';
import reducer from './reducer.js';


const store = createStore(reducer, {
  sources: {
    audio: false,
    camera: false,
    screen: false,
  },
  resolution: '720p',
  isRecording: false,
  isPaused: false,
  canvas: null,
  recorder: null,
  recordedBlobs: [],
});


const ConnectedApp = withStore(store)(App);
const root = document.getElementById('root');
const doRender = () => render(ConnectedApp, root);


store.subscribe(doRender);
doRender();
