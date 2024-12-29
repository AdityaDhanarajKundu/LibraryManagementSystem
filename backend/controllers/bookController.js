// Handles CRUD operations for books.

import Book from "../models/bookModel.js";
import Transaction from "../models/transactionModel.js";
import sequelize from "../config/database.js";
import { Op } from "sequelize";

export async function getAllBooks(req, res) {
  const { search } = req.query;
  try {
    const whereClause = search
      ? {
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { author: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    const books = await Book.findAll({
      where: whereClause,
      order: [["title", "ASC"]],
      attributes: ["id", "title", "author", "genre", "status", "thumbnailPath"],
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
}

export async function getBookById(req, res) {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error });
  }
}

export async function getBooksByGenre(req, res) {
  
  try {
    const genres = await Book.findAll({
      attributes: [
        "genre",
        [sequelize.fn("COUNT", sequelize.col("id")), "count"],
      ],
      group: ["genre"],
      order: [["genre", "ASC"]],
    });

    // Fetch all books grouped by genre
    const detailedBooks = await Promise.all(
      genres.map(async (genre) => {
        const books = await Book.findAll({
          where: { genre: genre.genre },
          order: [["title", "ASC"]], // Sort books alphabetically by title
        });
        return {
          genre: genre.genre,
          count: genre.dataValues.count,
          books,
        };
      })
    );

    res.json(detailedBooks);
  } catch (error) {
    res.status(500).json({ message: "Error categorizing books", error });
  }
}

export async function getBorrowedBooksByUser(req, res) {
  console.log("getBorrowedBooksByUser function called");
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const borrowedBooks = await Transaction.findAll({
      where: {
        userId,
        action: "borrow",
        returnDate: null,
      },
      attributes: ["bookId"],
    });

    console.log("Borrowed Books Query Result:", borrowedBooks); // Debug log

    res
      .status(200)
      .json({ borrowedBookIds: borrowedBooks.map((b) => b.bookId) });
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
    res.status(500).json({ error: "Failed to fetch borrowed books" });
  }
}


export async function addBook(req, res) {
  console.log("Request body:", req.body);
  console.log("Uploaded files:", req.files);
  const { title, author, genre, description, quantity, status } = req.body;
  const filePath = req.files?.file?.[0]?.path || null;
  const thumbnailPath = req.files?.thumbnail?.[0]?.path || null;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and Author are required" });
  }
  try {
    const newBook = await Book.create({
      title,
      author,
      genre,
      description,
      quantity: parseInt(quantity, 10),
      status,
      filePath,
      thumbnailPath,
    });
    res.status(201).json({
      message: "Book created successfully",
      book: newBook,
    });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Error adding book", error });
  }
}
