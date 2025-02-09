// user schema/table

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM("admin", "user"), defaultValue: "user" },
  resetToken: { type: DataTypes.STRING }, // Add resetToken field
  resetTokenExpiry: { type: DataTypes.DATE }, // Add resetTokenExpiry field
});

export default User;