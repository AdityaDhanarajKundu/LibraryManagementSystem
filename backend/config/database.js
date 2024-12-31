// file for database connection

import Sequelize from "sequelize";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// the aiven ca certificate
const caCertificate = fs.readFileSync("./certs/ca.pem").toString();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: caCertificate, // Ensure only valid certificates are used
      },
    },
  }
);

async function connect() {
  try {
    await sequelize.authenticate();
    console.log("Connected to Aiven MySQL database");
  } catch (err) {
    console.error("Unable to connect to MySQL database", err);
  }
}

connect();

export default sequelize;