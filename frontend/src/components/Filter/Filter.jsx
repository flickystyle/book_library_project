import { useDispatch, useSelector } from 'react-redux';
import {
    setTitleFilter,
    selectTitleFilter,
    resetFilters,
} from '../../redux/slices/filterSlice';
import './Filter.css';

const Filter = () => {
    const dispatch = useDispatch();
    const title = useSelector(selectTitleFilter);

    const handleTitle = (e) => {
        const { value } = e.target;
        dispatch(setTitleFilter(value));
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
                        onChange={handleTitle}
                        value={title}
                        name="title"
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
