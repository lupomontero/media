export const createStore = (reducer, initialState, enhancer) => {
  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer, initialState);
  }

  let state = reducer(initialState, { type: 'INIT' });
  const listeners = [];

  const store = {
    getState: () => state,
    dispatch: (action) => {
      state = reducer(state, action);
      listeners.forEach(listener => listener());
      return action;
    },
    subscribe: (listener) => {
      listeners.push(listener);
      return () => { // unsubscribe
        const index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      };
    },
  };

  return store;
};


export const Provider =
  store =>
    Component =>
      props => Component({ ...props, store });

// alias
export const withStore = Provider;
