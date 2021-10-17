"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nanoid_1 = require("nanoid");
const router = express_1.default.Router();
const idLength = 8;
router.get('/', (req, res) => {
    const books = req.app.get('books');
    res.send(books);
});
router.get('/:id', (req, res) => {
    const book = req.app.get('books').find({ id: req.params.id }).value();
    if (!book) {
        res.sendStatus(404);
    }
    res.send(book);
});
router.post('/', (req, res) => {
    try {
        const book = Object.assign({ id: (0, nanoid_1.nanoid)(idLength) }, req.body);
        req.app.get('books').push(book).write();
        res.send(book);
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
router.put('/:id', (req, res) => {
    try {
        req.app.get('books').find({ id: req.params.id }).assign(req.body).write();
        res.send(req.app.get('books').find({ id: req.params.id }));
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
router.delete('/:id', (req, res) => {
    req.app.get('books').remove({ id: req.params.id }).write();
    res.sendStatus(200);
});
exports.default = router;
