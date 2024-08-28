import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
            return [...state, action.payload];
        },
        deleteBook: (state, action) => {
            return state.filter(({ id }) => id !== action.payload);
        },
        toggleFavoriteBook: (state, action) => {
            return state.map((book) =>
                book.id === action.payload
                    ? { ...book, isFavorite: !book.isFavorite }
                    : book
            );
        },
    },
});

export const { addBook, deleteBook, toggleFavoriteBook } = booksSlice.actions;
export const selectBooks = (state) => state.books;
export default booksSlice.reducer;
