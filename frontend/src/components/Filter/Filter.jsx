import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
    setTitleFilter,
    setAuthorFilter,
    setOnlyFavoriteFilter,
    selectOnlyFavoriteFilter,
    selectAuthorFilter,
    selectTitleFilter,
    resetFilters,
} from '../../redux/slices/filterSlice';
import './Filter.css';

const Filter = () => {
    const dispatch = useDispatch();
    const title = useSelector(selectTitleFilter);
    const author = useSelector(selectAuthorFilter);
    const onlyFavorite = useSelector(selectOnlyFavoriteFilter);
    const { t } = useTranslation();

    const handleInput = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'title':
                dispatch(setTitleFilter(value));
                break;
            case 'author':
                dispatch(setAuthorFilter(value));
                break;
            case 'onlyFavorite':
                dispatch(setOnlyFavoriteFilter());
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
                        placeholder={t('components.filter.filterByTitle')}
                        onChange={handleInput}
                        value={title}
                        name="title"
                    />
                </div>
                <div className="filter-group">
                    <input
                        type="text"
                        placeholder={t('components.filter.filterByAuthor')}
                        onChange={handleInput}
                        value={author}
                        name="author"
                    />
                </div>
                <div className="filter-group">
                    <label>
                        <input
                            type="checkbox"
                            onChange={handleInput}
                            checked={onlyFavorite}
                            name="onlyFavorite"
                        />
                        {t('components.filter.checkFavorite')}
                    </label>
                </div>
                <button type="button" onClick={handleResetFilters}>
                    {t('components.filter.resetFiltersButton')}
                </button>
            </div>
        </div>
    );
};

export default Filter;
