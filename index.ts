import express, { Application, Request, Response } from 'express';
import * as swaggerJsDoc from './api.json';
import cors from 'cors';
import morgan from 'morgan';
import low from 'lowdb';
import swaggerUI from 'swagger-ui-express';
import booksRouter from './routes/books';
import FileSync from 'lowdb/adapters/FileSync';

const PORT = process.env.PORT || 8080;

type Data = {
  books: {
    id: string;
    title: string;
    author: string;
  }[];
};
const adapter = new FileSync<Data>('db.json');
const db = low(adapter);
db.defaults({ books: [] }).write();

const app: Application = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc));

app.set('books', db);
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/books', booksRouter);

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
