import * as a from './actionTypes';
const initialState = [];

const booksReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case a.ADD_BOOK:
      return [...state, payload];
    case a.DELETE_BOOK:
      const filteredArray = state.filter(({ id }) => id !== payload);
      return filteredArray;
    default:
      return state;
  }
};

export default booksReducer;
