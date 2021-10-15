const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const low = require('lowdb');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const booksRouter = require('./routes/books');
const swaggerJsDoc = YAML.load('./api.yaml');

const PORT = process.env.PORT || 8080;

const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ books: [] }).write();

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc));

app.db = db;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/books', booksRouter);

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
