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
import { AdminRouters } from './routes/Admin/admin.router.js';
import { AttendanceRouters } from './routes/Admin/attendance.router.js';
import { StudentAuthRouters } from './routes/StudentApp/studentAuth.router.js';
import { studentAttendanceRouters } from './routes/StudentApp/studentAttendance.router.js';

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

app.use('/admin',AdminRouters)
app.use('/admin',AuthRouters)
app.use('/admin',StudentRouters)
app.use('/admin',AttendanceRouters)
app.use('/student',StudentAuthRouters)
app.use('/student',studentAttendanceRouters)

app.get('/', (req, res) => {
    try {
        return res.status(200).send('hello.... Server Started');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});

const PORT= process.env.EXPRESS_PORT || 5000
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
    
});
