const dotenv=require('dotenv')
dotenv.config()
const pg=require('pg')
// database connection setup 
const DB_config={
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password:process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database:process.env.DB_NAME,
  ssl: {
    ssl:false,               // for production it should be "true"
    rejectUnauthorized: false, // for production it should be "true"
  }
}
const database = new pg.Pool(DB_config);

// check Database connection
const checkdbConnection=async ()=>{
    try {
      if(!database._connected){
        await database.connect()
        console.log("DB Connection Established **Successfully");
      }
      else{
        console.log("DB Connection already **Established");
      }
      }
     catch (error) {
        console.error("Unable to connect : ",error)
  }
 

}

module.exports={checkdbConnection,database}