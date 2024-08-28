import { useDispatch, useSelector } from 'react-redux';
import {
    setTitleFilter,
    setAuthorFilter,
    selectAuthorFilter,
    selectTitleFilter,
    resetFilters,
} from '../../redux/slices/filterSlice';
import './Filter.css';

const Filter = () => {
    const dispatch = useDispatch();
    const title = useSelector(selectTitleFilter);
    const author = useSelector(selectAuthorFilter);

    const handleInput = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'title':
                dispatch(setTitleFilter(value));
                break;
            case 'author':
                dispatch(setAuthorFilter(value));
                break;
            default:
                throw new Error('unknown filter');
        }
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
    };

    return (
        <div className="app-block filter">
            <div className="filter-row">
                <div className="filter-group">
                    <input
                        type="text"
                        placeholder="Filter by title..."
                        onChange={handleInput}
                        value={title}
                        name="title"
                    />
                </div>
                <div className="filter-group">
                    <input
                        type="text"
                        placeholder="Filter by author..."
                        onChange={handleInput}
                        value={author}
                        name="author"
                    />
                </div>
                <button type="button" onClick={handleResetFilters}>
                    Reset Filters
                </button>
            </div>
        </div>
    );
};

export default Filter;
