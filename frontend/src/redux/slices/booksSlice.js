import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithParams from '../../utils/createBookWithParams';
import { setError } from './errorSlice';

export const fetchBook = createAsyncThunk(
    'books/fetchBook',
    async (url, thunkAPI) => {
        try {
            const res = await axios.get(url);
            return res.data;
        } catch (error) {
            thunkAPI.dispatch(setError(error.message));
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState = { books: [], isLoadingViaAPI: false };

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.books.push(action.payload);
        },
        addRandomBook: (state, action) => {
            state.books.push(action.payload);
        },
        deleteBook: (state, action) => {
            return {
                ...state,
                books: state.books.filter(({ id }) => id !== action.payload),
            };
        },
        toggleFavoriteBook: (state, action) => {
            state.books.forEach((book) => {
                if (book.id === action.payload) {
                    book.isFavorite = !book.isFavorite;
                }
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBook.pending, (state) => {
                state.isLoadingViaAPI = true;
                return state;
            })
            .addCase(fetchBook.fulfilled, (state, action) => {
                state.isLoadingViaAPI = false;
                if (action.payload.title && action.payload.author) {
                    const newBook = createBookWithParams(action.payload, 'API');
                    state.books.push(newBook);
                }
            })
            .addCase(fetchBook.rejected, (state) => {
                state.isLoadingViaAPI = false;
                return state;
            });
    },
});

export const { addBook, deleteBook, toggleFavoriteBook, addRandomBook } =
    booksSlice.actions;
export const selectBooks = (state) => state.books.books;
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI;
export default booksSlice.reducer;
