import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithParams from '../../utils/createBookWithParams';
import { setError } from './errorSlice';

export const fetchBook = createAsyncThunk(
    'books/fetchBook',
    async (url, { dispatch }) => {
        try {
            const res = await axios.get(url);
            return res.data;
        } catch (error) {
            dispatch(setError(error.message));
            throw error;
        }
    }
);

const initialState = [];

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.push(action.payload);
        },
        addRandomBook: (state, action) => {
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
    extraReducers: (builder) => {
        builder.addCase(fetchBook.fulfilled, (state, action) => {
            if (action.payload.title && action.payload.author) {
                const newBook = createBookWithParams(action.payload, 'API');
                state.push(newBook);
            }
        });
    },
});

export const { addBook, deleteBook, toggleFavoriteBook, addRandomBook } =
    booksSlice.actions;
export const selectBooks = (state) => state.books;
export default booksSlice.reducer;
