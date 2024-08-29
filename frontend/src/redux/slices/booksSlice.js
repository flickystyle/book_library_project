import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.push(action.payload);
        },
        deleteBook: (state, action) => {
            return state.filter(({ id }) => id !== action.payload);
        },
        toggleFavoriteBook: (state, action) => {
            state.forEach((book) => {
                if (book.id === action.payload) {
                    book.isFavorite = !book.isFavorite;
                }
            });
        },
    },
});

export const { addBook, deleteBook, toggleFavoriteBook } = booksSlice.actions;
export const selectBooks = (state) => state.books;
export default booksSlice.reducer;
