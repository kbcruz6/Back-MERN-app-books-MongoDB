const Book = require("../models/bookModel.js");
const { mongoose, isValidObjectId } = require("mongoose");

mongoose.set("strictQuery", false);

//! GET all books
const getBooks = async (req, res) => {
  const books = await Book.find({}, { __v: 0, updateAt: 0 }).sort({
    createdAt: 1,
  });
  res.status(200).json(books);
};

//! GET a single book
const getBook = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Wrong id!" });
  }

  const book = await Book.findOne({ _id: id }, { __v: 0, updatedAt: 0 });

  if (!book) {
    return res.status(400).json({ error: "Not found" });
  }
  res.status(200).json;
};

//! POST a new book
const createBook = async (req, res) => {
  const { title, author, description, price } = req.body;

  //! Add doc to DB
  try {
    const book = await Book.create({ title, author, description, price });
    res.status(200).json({ book });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//! DELETE a book
const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).json({ error: "Wrong id !" });
  }

  const book = await Book.deleteOne({ _id: id });

  if (!book) {
    return res.status(404).json({ error: "Not found" });
  }
  res.status(200).json({ deleted: book });
};

//! UPDATE a book
const updateBook = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(404).json({ error: "Wrong id !" });
  }

  const book = await Book.updateOne(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!book) {
    return res.status(404).json({ error: "Not found" });
  }
  res.status(200).json({ updated: book });
};

module.exports = { getBooks, getBook, createBook, deleteBook, updateBook };
