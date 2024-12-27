//book model/table/schema

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Book = sequelize.define("Book", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  genre: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  status: {
    type: DataTypes.ENUM("available", "borrowed"),
    defaultValue: "available",
  },
  borrowedBy: { type: DataTypes.INTEGER, allowNull: true },
  dueDate: { type: DataTypes.DATE, allowNull: true },
  filePath: { type: DataTypes.STRING, allowNull: true },
  thumbnailPath: { type: DataTypes.STRING, allowNull: true },
});

export default Book;