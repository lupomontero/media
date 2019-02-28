//
// Create DOM Element
//
export default (tagName, opts = {}) => {
  const { children, ...rest } = opts;
  const element = Object.assign(document.createElement(tagName), rest);
  if (children && typeof children.forEach === 'function') {
    children.filter(item => item).forEach(element.appendChild.bind(element));
  }
  return element;
};
