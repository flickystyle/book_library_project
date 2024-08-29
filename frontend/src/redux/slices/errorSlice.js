import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    errorMessage: '',
};

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.errorMessage = action.payload;
            return state;
        },
        clearError: (state) => {
            state.errorMessage = '';
            return state;
        },
    },
});
export const { setError, clearError } = errorSlice.actions;
export const selectErrorMessage = (state) => state.error.errorMessage;
export default errorSlice.reducer;
