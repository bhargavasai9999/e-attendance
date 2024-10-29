const dotenv = require('dotenv');
dotenv.config();
const { Pool } = require('pg');

const database = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: true, 
  },
});

const checkdbConnection = async () => {
  try {
    await database.connect();
    console.log("DB Connection Established Successfully");
  } catch (error) {
    console.error("Unable to connect:", error);
  }
};

module.exports = { checkdbConnection, database };
