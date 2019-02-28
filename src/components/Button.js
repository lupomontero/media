import createElement from '../lib/createElement.js';


export default ({ text, onClick }) => createElement('button', {
  innerHTML: text,
  onclick: onClick,
});
