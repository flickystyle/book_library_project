import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import {
    deleteBook,
    toggleFavoriteBook,
    selectBooks,
} from '../../redux/slices/booksSlice';
import {
    selectAuthorFilter,
    selectTitleFilter,
    selectOnlyFavoriteFilter,
} from '../../redux/slices/filterSlice';
import './BookList.css';

const highlightMatch = (text, filter) => {
    if (!filter) {
        return text;
    }
    const regex = new RegExp(`(${filter})`, 'gi');
    return text.split(regex).map((substring, i) => {
        if (substring.toLowerCase() === filter.toLowerCase()) {
            return (
                <span className="highlight" key={i}>
                    {substring}
                </span>
            );
        }
        return <span key={i}>{substring}</span>;
    });
};

const renderBooks = (
    books,
    handleDeleteBook,
    handleToggleFavorite,
    titleFilter,
    authorFilter
) => {
    if (books.length === 0) {
        return <p>No books availible</p>;
    }
    return books.map(({ author, title, id, isFavorite }, index) => (
        <li key={id}>
            <div className="book-info">
                <span>
                    {index + 1}.{' '}
                    <cite>{highlightMatch(title, titleFilter, id)}</cite> by{' '}
                    <strong>{highlightMatch(author, authorFilter, id)}</strong>
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
    const books = useSelector(selectBooks);
    const titleFilter = useSelector(selectTitleFilter);
    const authorFilter = useSelector(selectAuthorFilter);
    const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);

    const filteredBooks = books.filter(({ title, author, isFavorite }) => {
        const matchByTitle = title
            .toLowerCase()
            .includes(titleFilter.toLowerCase());
        const matchByAuthor = author
            .toLowerCase()
            .includes(authorFilter.toLowerCase());
        const matchesFavorite = onlyFavoriteFilter ? isFavorite : true;
        return matchByTitle && matchByAuthor && matchesFavorite;
    });

    const dispatch = useDispatch();

    const handleDeleteBook = (id) => {
        dispatch(deleteBook(id));
    };

    const handleToggleFavorite = (id) => {
        dispatch(toggleFavoriteBook(id));
    };

    return (
        <div className="app-block book-list">
            <h2>Book List</h2>
            <ul>
                {renderBooks(
                    filteredBooks,
                    handleDeleteBook,
                    handleToggleFavorite,
                    titleFilter,
                    authorFilter
                )}
            </ul>
        </div>
    );
};

export default BookList;
