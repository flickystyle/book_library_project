import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBook, toggleFavorite } from '../../redux/books/actionCreators';
import { selectTitleFilter } from '../../redux/slices/filterSlice';
import './BookList.css';

const renderBooks = (books, handleDeleteBook, handleToggleFavorite) => {
    if (books.length === 0) {
        return <p>No books availible</p>;
    }
    return books.map(({ author, title, id, isFavorite }, index) => (
        <li key={id}>
            <div className="book-info">
                <span>
                    {index + 1}. <cite>{title}</cite> by{' '}
                    <strong>{author}</strong>
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
    const titleFilter = useSelector(selectTitleFilter);

    const filteredBooks = books.filter(({ title }) => {
        const match = title.toLowerCase().includes(titleFilter.toLowerCase());
        return match;
    });
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
            <ul>
                {renderBooks(
                    filteredBooks,
                    handleDeleteBook,
                    handleToggleFavorite
                )}
            </ul>
        </div>
    );
};

export default BookList;
