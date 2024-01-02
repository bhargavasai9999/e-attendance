const dotenv=require('dotenv')
dotenv.config()
const pg=require('pg')
const database = new pg.Pool({
  user: 'sai9999',
  host: 'flipr-task-db.c2beljlrxbik.ap-south-1.rds.amazonaws.com',
  password: 'sting9999',
  port: 5432,
  database: 'attendance',
  ssl: {
    ssl:false,
    rejectUnauthorized: false,
  }
});

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