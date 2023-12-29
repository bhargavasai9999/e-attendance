import dotenv from 'dotenv'
const pg =require('pg')
dotenv.config()

const connection = new pg.Client(process.env.DB_config)
  const checkdbConnection=async ()=>{
    try {
        await connection.connect()
        console.log("DB connect success")

    } catch (error) {
        console.error("error: ",error)
    }
    finally{
    }
  }

  checkdbConnection()

