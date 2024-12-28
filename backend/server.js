import app from "./app.js";
import sequelize from "./config/database.js";
import Book from "./models/bookModel.js";
import Transaction from "./models/transactionModel.js";
import User from "./models/userModel.js";
import { defineAssociations } from "./models/associations.js";

const port = process.env.PORT || 5000;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced successfully");
    defineAssociations();
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.error("Error syncing database:", error));