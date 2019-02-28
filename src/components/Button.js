import createElement from '../lib/createElement.js';


const styles = {
  root: {
    backgroundColor: '#333',
    border: '1px solid #222',
    padding: 10,
    fontSize: '2em',
  },
  active: {
    backgroundColor: '#99ff99',
  },
};


export default ({ text, active, onClick }) => createElement('button', {
  style: (active ?  { ...styles.root, ...styles.active } : styles.root),
  innerHTML: text,
  onclick: onClick,
});
