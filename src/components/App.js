import createElement from '../lib/createElement.js';
import ToolBar from './ToolBar.js';
import Preview from './Preview.js';
import { toggleStream } from '../actions.js';


export default ({ store }) => createElement('div', {
  id: 'App',
  children: [
    ToolBar({
      toggleStream: (type, source) => store.dispatch(toggleStream(type, source)),
      record: () => {},
      pause: () => {},
      stop: () => {},
    }),
    Preview({
      ...store.getState(),
    }),
  ],
});
