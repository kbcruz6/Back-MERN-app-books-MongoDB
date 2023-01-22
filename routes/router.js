const express = require("express");
const {
  createBook,
  getBooks,
  getBook,
  deleteBook,
  updateBook,
} = require("../controllers/bookController.js");

const router = express.Router();

//! GET all Books
router.get("/", getBooks);

//! GET a single Book
router.get("/:id", getBook);

//! POST a new Book
router.post("/", createBook);

//! DELETE a Book
router.delete("/:id", deleteBook);

//! UPDATE a Book
router.patch("/:id", updateBook);

module.exports = router;
