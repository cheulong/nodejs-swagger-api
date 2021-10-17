import express, { Application, Request, Response } from 'express';
import * as swaggerJsDoc from './api.json';
import cors from 'cors';
import morgan from 'morgan';
import { Low, JSONFile } from 'lowdb';
const swaggerUI = require('swagger-ui-express');
const booksRouter = require('./routes/books');

const PORT = process.env.PORT || 8080;

type Data = {
  books: {
    id: string;
    title: string;
    author: string;
  }[];
};
const adapter = new JSONFile<Data>('db.json');
const db = new Low<Data>(adapter);
db.data ||= { books: [] };

const app: Application = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc));

app.set('books', db);
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/books', booksRouter);

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
