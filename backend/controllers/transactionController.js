// handles the logic for borrowing and returning books, as well as managing transaction records.

import Transaction from "../models/transactionModel.js";
import Book from "../models/bookModel.js";
import User from "../models/userModel.js";
import { where, Op } from "sequelize";

export async function borrowBook(req, res) {
    const {bookId} = req.body;
    const userId = req.user.id;

    try{
        const book = await Book.findOne({where:{id:bookId, quantity:{[Op.gt]:0}}});
        if(!book) return res.status(404).json({message:"Book not available"});

        const transaction = await Transaction.create({
          userId,
          bookId,
          action: "borrow",
          borrowDate: new Date(),
          returnDate: null,
        });

        const newQuantity = book.quantity - 1;
        await Book.update(
          {
            quantity: newQuantity,
            status: newQuantity === 0 ? "borrowed" : "available",
          },
          { where: { id: bookId } }
        );

        res.status(201).json({ message: "Book borrowed successfully", transaction });
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error borrowing book",error});
    }
}

export async function returnBook(req, res) {
    const {bookId} = req.body;
    const userId = req.user.id;

    try{
        // check if the user borrowed the book
        const transaction = await Transaction.findOne({
            where: { userId, bookId, action: "borrow", returnDate: null },
        });

        if(!transaction){
            return res.status(404).json({message:"Book not borrowed by the user."});
        }

        // calculate the fine
        const today = new Date();
        const borrowDate = new Date(transaction.borrowDate);
        const allowedBorrowDays = 14;
        const finePerDay = 2;

        let fine = 0;
        const daysBorrowed = Math.ceil((today - borrowDate) / (1000 * 60 * 60 * 24));
        if(daysBorrowed > allowedBorrowDays){
            fine = (daysBorrowed - allowedBorrowDays) * finePerDay;
        }

        // update the transaction record
        await Transaction.update(
            {returnDate: today, action: "return" , fine},
            {where: {id: transaction.id}}
        );

        // update the book status
        const book = await Book.findByPk(bookId);
        const newQuantity = book.quantity + 1;
        await Book.update(
          { quantity: newQuantity, status: "available" },
          { where: { id: bookId } }
        );

        res.status(200).json({
            message: "Book returned successfully",
            fine,
            transaction
        });
        
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error returning book",error});
    }
}


//get user transactions records
export async function getUserTransactions(req,res){
    const{userId} = req.params;
    try{
        const transactions = await Transaction.findAll({where:{userId},
            include:[
                {model: Book, attributes: ["title","author"]},
                {model: User, attributes: ["name","email"]}
            ],
            attributes: ["id","action","borrowDate","returnDate","fine"]
        });

        res.status(200).json({transactions});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error fetching user transactions",error});
    }
}