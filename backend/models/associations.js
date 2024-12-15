// file to define the associations and cardinality of the models/ relationships tables

import Book from "./bookModel.js";
import Transaction from "./transactionModel.js";
import User from "./userModel.js";

// define associations
export function defineAssociations() {
    Book.hasMany(Transaction, { foreignKey: "bookId" });
    Transaction.belongsTo(Book, { foreignKey: "bookId" });

    User.hasMany(Transaction, { foreignKey: "userId" });
    Transaction.belongsTo(User, { foreignKey: "userId" });
}