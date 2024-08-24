import { useState } from 'react';
import './BookForm.css';

const BookForm = () => {
  const [bookInfo, setBookInfo] = useState({ title: '', author: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookInfo.title && bookInfo.author) {
      //dispatch
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

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
};

export default BookForm;
