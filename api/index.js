import express from 'express';
import cors from 'cors';
import booksData from './data/books.json' with { type: 'json' };

const app = express();

app.use(cors());

app.get('/random-book', (req, res) => {
    const randomIndex = Math.floor(Math.random() * (booksData.length - 1));
    const randomBook = booksData[randomIndex];
    res.json(randomBook);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
