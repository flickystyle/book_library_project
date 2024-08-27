import * as a from './actionTypes';

const addBook = (newBook) => ({ type: a.ADD_BOOK, payload: newBook });
const deleteBook = (id) => ({ type: a.DELETE_BOOK, payload: id });
const toggleFavorite = (id) => ({ type: a.TOGGLE_FAVORITE, payload: id });
export { addBook, deleteBook, toggleFavorite };
