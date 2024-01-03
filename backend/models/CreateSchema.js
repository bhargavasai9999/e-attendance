import { database } from "../config/dbconnection.cjs";

export const CreateSchema=async ()=>{
    try {
        await database.query("CREATE SCHEMA IF NOT EXISTS e_attendance");
        console.log("Schema Created Successfully");
    } catch (error) {
        console.log(error);
    }
}

