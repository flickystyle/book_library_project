import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addBook } from '../../redux/books/actionCreators';
import getRandomIndex from '../../utils/getRandomIndex';
import booksData from '../../data/books.json';
import './BookForm.css';

const BookForm = () => {
  const [bookInfo, setBookInfo] = useState({ title: '', author: '' });
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (bookInfo.title && bookInfo.author) {
      const book = { ...bookInfo, id: uuidv4(), isFavorite: false };
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
    const randomBook = {
      ...booksData[getRandomIndex(0, booksData.length)],
      id: uuidv4(),
      isFavorite: false,
    };
    dispatch(addBook(randomBook));
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={bookInfo.title}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
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
      </form>
    </div>
  );
};

export default BookForm;
