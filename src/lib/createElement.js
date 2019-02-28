//
// Create DOM Element
//
export default (tagName, opts = {}) => {
  const { children, style, ...rest } = opts;
  const element = Object.assign(document.createElement(tagName), rest);
  if (children && typeof children.forEach === 'function') {
    children.filter(item => item).forEach(element.appendChild.bind(element));
  }
  if (typeof style === 'object') {
    Object.keys(style).forEach(key => Object.assign(element.style, { [key]: style[key] }));
  }
  return element;
};
