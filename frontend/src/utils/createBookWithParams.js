import { v4 as uuidv4 } from 'uuid';

const createBookWithParams = (book, source) => {
    return {
        ...book,
        id: uuidv4(),
        isFavorite: false,
        source,
    };
};

export default createBookWithParams;
