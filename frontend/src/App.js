import BookForm from './components/BookForm/BookForm';
import BookList from './components/BookList/BookList';
import Filter from './components/Filter/Filter';
import Error from './components/Error/Error';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import './App.css';

function App() {
    const { t } = useTranslation();

    const handleLng = () => {
        i18n.language === 'en'
            ? i18n.changeLanguage('ru')
            : i18n.changeLanguage('en');
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>{t('bookLibraryApp')}</h1>
                <button type="button" onClick={() => handleLng()}>
                    {t('language')}
                </button>
            </header>
            <main className="app-main">
                <div className="app-left-column">
                    <BookForm />
                </div>
                <div className="app-right-column">
                    <Filter />
                    <BookList />
                </div>
            </main>
            <Error />
        </div>
    );
}

export default App;
