import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBook, toggleFavorite } from '../../redux/books/actionCreators';
import './BookList.css';

const renderBooks = (books, handleDeleteBook, handleToggleFavorite) => {
  if (books.length === 0) {
    return <p>No books availible</p>;
  }
  return books.map(({ author, title, id, isFavorite }, index) => (
    <li key={id}>
      <div className="book-info">
        <span>
          {index + 1}. {title} by <strong>{author}</strong>
        </span>
      </div>
      <div className="book-actions">
        <span onClick={() => handleToggleFavorite(id)}>
          {isFavorite ? (
            <BsBookmarkStarFill className="star-icon" />
          ) : (
            <BsBookmarkStar className="star-icon" />
          )}
        </span>
        <button type="button" onClick={() => handleDeleteBook(id)}>
          Delete
        </button>
      </div>
    </li>
  ));
};

const BookList = () => {
  const books = useSelector((state) => state.books);

  const dispatch = useDispatch();

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      <ul>{renderBooks(books, handleDeleteBook, handleToggleFavorite)}</ul>
    </div>
  );
};

export default BookList;
