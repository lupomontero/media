import createElement from '../lib/createElement.js';
import getUserMedia from '../lib/getUserMedia.js';
import Button from './Button.js';


export default ({ toggleStream }) => createElement('div', {
  id: 'ToolBar',
  children: [
    Button({
      text: '🎥',
      onClick: async () => toggleStream('camera', await getUserMedia('camera')),
    }),
    Button({
      text: '💻',
      onClick: async () => toggleStream('screen', await getUserMedia('screen')),
    }),
    Button({
      text: '⏺',
      onClick: () => console.log('record?'),
    }),
  ],
});
