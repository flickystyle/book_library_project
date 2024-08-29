import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectErrorMessage } from '../../redux/slices/errorSlice';
import { clearError } from '../../redux/slices/errorSlice';
import { useEffect } from 'react';

const Error = () => {
    const errorMessage = useSelector(selectErrorMessage);
    const dispatch = useDispatch();

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(clearError());
        }
    }, [errorMessage, dispatch]);

    return (
        <ToastContainer position="top-left" autoClose={3000} theme="colored" />
    );
};

export default Error;
