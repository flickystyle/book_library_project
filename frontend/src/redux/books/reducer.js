import * as a from './actionTypes';
const initialState = [];

const booksReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case a.ADD_BOOK:
      return [...state, payload];
    case a.DELETE_BOOK:
      return state.filter(({ id }) => id !== payload);
    case a.TOGGLE_FAVORITE:
      const newState = state.map((book) =>
        book.id === payload ? { ...book, isFavorite: !book.isFavorite } : book
      );
      return newState;
    default:
      return state;
  }
};

export default booksReducer;
