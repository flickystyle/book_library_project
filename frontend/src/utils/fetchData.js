import axios from 'axios';

const url = 'http://localhost:5000/random-book';

const fetchData = async () => {
    const res = await axios.get(url);
    return res.data;
};

export default fetchData;
