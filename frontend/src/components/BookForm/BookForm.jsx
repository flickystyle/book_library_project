import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    addBook,
    addRandomBook,
    fetchBook,
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
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

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

    const addRandomViaApiHandler = async () => {
        setIsLoading(true);
        await dispatch(fetchBook(url));
        setIsLoading(false);
    };

    return (
        <div className="app-block book-form">
            <h2>Add a New Book</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={bookInfo.title}
                        onChange={onChangeHandler}
                    />
                </div>
                <div>
                    <label htmlFor="author">Author:</label>
                    <input
                        id="author"
                        type="text"
                        name="author"
                        value={bookInfo.author}
                        onChange={onChangeHandler}
                    />
                </div>
                <button type="submit">Add book</button>
                <button onClick={randomBookAddHandler} type="button">
                    Add random
                </button>
                <button
                    onClick={addRandomViaApiHandler}
                    type="button"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <span>Loading Book...</span>
                            <FaSpinner className="spinner" />
                        </>
                    ) : (
                        'Add random  via API'
                    )}
                </button>
            </form>
        </div>
    );
};

export default BookForm;
