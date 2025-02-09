// transaction model/table/schema

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Transaction = sequelize.define("Transaction", {
  bookId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  action: { type: DataTypes.ENUM("borrow", "return"), allowNull: false},
  borrowDate: { type: DataTypes.DATE, allowNull: false },
  returnDate: { type: DataTypes.DATE, allowNull: true },
  fine: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 }
});

export default Transaction;