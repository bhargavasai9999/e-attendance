import { database } from "../config/dbconnection.cjs"

export const CreateStudentTable=async()=>{
    try {
        const query=`CREATE TABLE IF NOT EXISTS e_attendance.Student (
            STUDENTID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            ASSOCIATED_ADMINID UUID NOT NULL,
            ROLL_NUMBER SERIAL UNIQUE NOT NULL,
            NAME VARCHAR(200) NOT NULL,
            EMAIL VARCHAR(200) NOT NULL,
            MOBILE_NUMBER NUMERIC(10,0) NOT NULL,
            PASSWORD VARCHAR(200) NOT NULL,
            RESET_TOKEN TEXT,
            RESETTOKEN_EXPIRYTIME TIMESTAMPTZ,
            FOREIGN KEY (ASSOCIATED_ADMINID) REFERENCES e_attendance.User(ADMINID) ON DELETE CASCADE
        )
        `
        await database.query(query)
        console.log("Student Table Created")

 
    } catch (error) {
        console.log("DB Student Table:",error);
        
    }
}