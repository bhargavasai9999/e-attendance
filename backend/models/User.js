import { database } from "../config/dbconnection.cjs";
export const CreateUserTable = async () => {
    try {
        await database.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        const query = `CREATE TABLE IF NOT EXISTS e_attendance.User
        (
            ADMINID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            NAME VARCHAR(200) NOT NULL,
            EMAIL VARCHAR(200) UNIQUE NOT NULL,
            MOBILE_NUMBER NUMERIC(10,0) NOT NULL,
            PASSWORD VARCHAR(200) NOT NULL,
            reset_token TEXT,
            attendance_token TEXT,
            attendancetoken_expirytime TIMESTAMPTZ,
            expiry_time TIMESTAMPTZ
        )`;
        await database.query(query);
        console.log("User table created");
    } catch (error) {
        console.log("attendance table: ",error);
    }
};


