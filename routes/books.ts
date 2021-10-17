import express, { Request, Response } from 'express';
import { nanoid } from 'nanoid';
const router = express.Router();

const idLength = 8;

router.get('/', (req: Request, res: Response) => {
  const books = req.app.get('books');
  res.send(books);
});

router.get('/:id', (req: Request, res: Response) => {
  const book = req.app.get('books').find({ id: req.params.id }).value();
  if (!book) {
    res.sendStatus(404);
  }
  res.send(book);
});

router.post('/', (req: Request, res: Response) => {
  try {
    const book = {
      id: nanoid(idLength),
      ...req.body,
    };

    req.app.get('books').push(book).write();

    res.send(book);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put('/:id', (req: Request, res: Response) => {
  try {
    req.app.get('books').find({ id: req.params.id }).assign(req.body).write();

    res.send(req.app.get('books').find({ id: req.params.id }));
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete('/:id', (req: Request, res: Response) => {
  req.app.get('books').remove({ id: req.params.id }).write();

  res.sendStatus(200);
});

export default router;
