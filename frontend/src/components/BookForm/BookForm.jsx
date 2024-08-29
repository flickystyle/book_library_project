import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addBook } from '../../redux/slices/booksSlice';
import getRandomIndex from '../../utils/getRandomIndex';
import createBookWithParams from '../../utils/createBookWithParams';
import booksData from '../../data/books.json';
import './BookForm.css';

const BookForm = () => {
    const [bookInfo, setBookInfo] = useState({ title: '', author: '' });
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if (bookInfo.title && bookInfo.author) {
            const book = createBookWithParams(bookInfo);
            dispatch(addBook(book));
            setBookInfo({ title: '', author: '' });
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
            booksData[getRandomIndex(0, booksData.length)]
        );
        dispatch(addBook(randomBook));
    };

    const addRandomViaApiHandler = async () => {
        try {
            const res = await axios.get('http://localhost:4000/random-book');
            if (res?.data.title && res?.data.author) {
                const newBook = createBookWithParams(res.data);
                dispatch(addBook(newBook));
            }
        } catch (error) {
            console.log(error);
        }
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
                <button onClick={addRandomViaApiHandler} type="button">
                    Add random via API
                </button>
            </form>
        </div>
    );
};

export default BookForm;
