// file for database connection

import Sequelize from "sequelize";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// aiven ca certificate
const caCertificate = fs.readFileSync("./certs/ca.pem").toString();

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
  dialect: "mysql",
  logging: false, // optional: disables SQL logging
});

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