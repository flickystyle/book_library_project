import { useSelector, useDispatch } from 'react-redux';
import { deleteBook } from '../../redux/books/actionCreators';
import './BookList.css';

const renderBooks = (books, handleOnClick) => {
  if (books.length === 0) {
    return <p>No books availible</p>;
  }
  return books.map(({ author, title, id }, index) => (
    <li key={id}>
      <div className="book-info">
        <span>
          {index + 1}. {title} by <strong>{author}</strong>
        </span>
      </div>
      <button onClick={() => handleOnClick(id)}>Delete</button>
    </li>
  ));
};

const BookList = () => {
  const books = useSelector((state) => state.books);

  const dispatch = useDispatch();

  const handleOnClick = (id) => {
    dispatch(deleteBook(id));
  };

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      <ul>{renderBooks(books, handleOnClick)}</ul>
    </div>
  );
};

export default BookList;
