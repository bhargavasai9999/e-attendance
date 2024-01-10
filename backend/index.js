import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import { checkdbConnection } from './config/dbconnection.cjs';
import { CreateSchema } from './models/CreateSchema.js';
import { CreateUserTable } from './models/User.js';
import { AuthRouters } from './routes/Admin/authentication.router.js';
import { CreateStudentTable } from './models/Student.js';
import { CreateAttendanceTable } from './models/Attendance.js';
import { StudentRouters } from './routes/Admin/student.router.js';
const app = express();
dotenv.config()
//Checking Database connection
await checkdbConnection()
// Creating Schemas and tables in PostgreSQL Database if not exists
await CreateSchema();
await CreateUserTable();
await CreateStudentTable();
await CreateAttendanceTable();



app.use(express.json());
app.use(cors());
app.use(AuthRouters)
app.use(StudentRouters)


app.get('/', (req, res) => {
    try {
        res.send('hello.... Server Started');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT= process.env.EXPRESS_PORT || 5000
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
