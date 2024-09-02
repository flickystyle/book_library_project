import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
    addBook,
    addRandomBook,
    fetchBook,
    selectIsLoadingViaAPI,
} from '../../redux/slices/booksSlice';
import { FaSpinner } from 'react-icons/fa';
import { setError } from '../../redux/slices/errorSlice';
import getRandomIndex from '../../utils/getRandomIndex';
import createBookWithParams from '../../utils/createBookWithParams';

import booksData from '../../data/books.json';
import './BookForm.css';

const url = 'http://localhost:4000/random-book-delayed';

const BookForm = () => {
    const [bookInfo, setBookInfo] = useState({ title: '', author: '' });
    const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI);
    const dispatch = useDispatch();
    const {t} = useTranslation();
    

    const submitHandler = (e) => {
        e.preventDefault();
        if (bookInfo.title && bookInfo.author) {
            const book = createBookWithParams(bookInfo, 'manual');
            dispatch(addBook(book));
            setBookInfo({ title: '', author: '' });
        } else {
            dispatch(setError('You must fill title and author'));
        }
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setBookInfo(
            name === 'title'
                ? { ...bookInfo, title: value }
                : { ...bookInfo, author: value }
        );
    };
    const randomBookAddHandler = () => {
        const randomBook = createBookWithParams(
            booksData[getRandomIndex(0, booksData.length)],
            'random'
        );
        dispatch(addRandomBook(randomBook));
    };

    const addRandomViaApiHandler = () => {
        dispatch(fetchBook(url));
    };

    return (
        <div className="app-block book-form">
            <h2>{t('components.form.addANewBook')}</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="title">{t('components.form.title')}:</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={bookInfo.title}
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <label htmlFor="author">{t('components.form.author')}:</label>
                    <input
                        id="author"
                        type="text"
                        name="author"
                        value={bookInfo.author}
                        onChange={onChangeHandler}
                    />
                </div>
                <button type="submit">{t('components.form.addBookButton')}</button>
                <button onClick={randomBookAddHandler} type="button">
                {t('components.form.addRandomBookButton')}
                </button>
                <button
                    onClick={addRandomViaApiHandler}
                    type="button"
                    disabled={isLoadingViaAPI}
                >
                    {isLoadingViaAPI ? (
                        <>
                            <span>{t('components.form.bookIsLoading')}</span>
                            <FaSpinner className="spinner" />
                        </>
                    ) : (
                        `${t('components.form.addRandomBookButtonViaAPI')}`
                    )}
                </button>
            </form>
        </div>
    );
};

export default BookForm;
