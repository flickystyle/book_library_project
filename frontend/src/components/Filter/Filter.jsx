import { useDispatch, useSelector } from 'react-redux';
import {
    setTitleFilter,
    selectTitleFilter,
} from '../../redux/slices/filterSlice';
import './Filter.css';

const Filter = () => {
    const dispatch = useDispatch();
    const title = useSelector(selectTitleFilter);

    const handleTitle = (e) => {
        const { value } = e.target;
        dispatch(setTitleFilter(value));
    };

    return (
        <div className="app-block filter">
            <div className="filter-group">
                <input
                    type="text"
                    placeholder="Filter by title..."
                    onChange={handleTitle}
                    value={title}
                    name="title"
                />
            </div>
        </div>
    );
};

export default Filter;
