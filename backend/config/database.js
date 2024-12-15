// file for database connection

import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    host : process.env.DB_HOST,
    dialect : "mysql",
});

async function connect(){
    try{
        await sequelize.authenticate();
        console.log("Connected to MySQL database");
    }catch(err){
        console.log("Unable to connect to MySQL database",err);
    }
}

connect();

export default sequelize;