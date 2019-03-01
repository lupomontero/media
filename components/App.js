import createElement from '../lib/createElement.js';
import ToolBar from './ToolBar.js';
import Preview from './Preview.js';


export default props => {
  const preview = Preview(props);
  return createElement('div', {
    id: 'App',
    children: [
      ToolBar({ ...props, preview }),
      preview,
    ],
  });
};
