const express = require('express');
const router = express.Router();
const Book = require('../models/Book.model');
const { isLoggedIn } = require('../middleware/route-guard');

// ------ CRUD - Create -------
router.get('/books/create', isLoggedIn, (req, res, next) => {
  try {
    res.render('books/book-create');
  } catch (error) {
    next(error);
  }
});

router.post('/books/create', isLoggedIn, async (req, res, next) => {
  try {
    // console.log(req.body);
    const { title, author, description, rating } = req.body;
    const createdBook = await Book.create({
      title,
      author,
      description,
      rating
    });
    console.log('A new book was created:', createdBook.title);
    // after creating the book, we redirect the user to the list
    res.redirect('/books');
  } catch (error) {
    next(error);
  }
});

// ----- CRUD - Read ------

// list of all books
router.get('/books', async (req, res, next) => {
  try {
    const allBooks = await Book.find();
    res.render('books/books-list', { books: allBooks });
  } catch (error) {
    console.log('error', error);
    // calling the error middleware
    next(error);
  }
});

router.get('/books/:bookId', async (req, res, next) => {
  try {
    // console.log(req.params);
    const { bookId } = req.params;

    const book = await Book.findById(bookId);
    res.render('books/book-details', book);
  } catch (error) {
    next(error);
  }
});

// ------- CRUD - Update ------

router.get('/books/:bookId/edit', isLoggedIn, async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
    res.render('books/book-edit', book);
  } catch (error) {
    next(error);
  }
});

router.post('/books/:bookId/edit', isLoggedIn, async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { title, author, description, rating } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(bookId, {
      title,
      author,
      description,
      rating
    });
    res.redirect(`/books/${updatedBook._id}`);
  } catch (error) {
    next(error);
  }
});

// CRUD - Delete

router.post('/books/:bookId/delete', isLoggedIn, async (req, res, next) => {
  try {
    const { bookId } = req.params;
    await Book.findByIdAndDelete(bookId);
    res.redirect('/books');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
