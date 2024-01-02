import { database } from "../config/dbconnection.cjs";
export const CreateUserTable = async () => {
    try {
        await database.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        const query = `CREATE TABLE IF NOT EXISTS e_attendance.User
        (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            mobile_number NUMERIC NOT NULL,
            password TEXT NOT NULL,
            reset_token TEXT,
            expiry_time TIMESTAMPTZ
        )`;
        await database.query(query);
        console.log("User table created");
    } catch (error) {
        console.log(error);
    }
};


