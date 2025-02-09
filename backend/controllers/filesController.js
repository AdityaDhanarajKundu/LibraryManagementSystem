// controls the files related http requests

import express from "express";
import Book from "../models/bookModel.js";

export async function uploadBook(req, res) {
    console.log(req.body);
    const { bookId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    
    try{
        if(bookId){
            const book = await Book.findByPk(bookId);
            if(!book) return res.status(404).json({message:"Book not found"});

            // if book id exists then update the book record
            const filePath = req.file.path;
            await Book.update({ filePath }, { where: { id: bookId } });
            return res.status(200).json({ message: "Book uploaded successfully", book });
        }

        // if book id not provided upload a new book
        const { title, author, genre, status } = req.body;
        const filePath = req.file.path;

        const newBook  = await Book.create({
            title,
            author,
            genre,
            status: status || "available",
            filePath
        });
        
        return res.status(201).json({message: "New eBook uploaded successfully", book: newBook});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Error uploading book",error});
    }
}

export async function downloadBook(req, res) {
    const { bookId } = req.params;
    try{
        const book = await Book.findByPk(bookId);
        console.log(book);
        if(!book || !book.filePath) return res.status(404).json({message: "Book not found"});

        res.download(book.filePath);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Error downloading book",error});
    }
}