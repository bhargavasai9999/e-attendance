import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import { checkdbConnection } from './config/dbconnection.cjs';
import { CreateSchema } from './models/CreateSchema.js';
import { CreateUserTable } from './models/User.js';
import { AuthRouters } from './routes/authentication.router.js';

const app = express();
//Checking Database connection
await checkdbConnection()
// Create Schemas and tables in PostgreSQL Database
await CreateSchema();
await CreateUserTable();


app.use(express.json());
app.use(cors());
app.use(AuthRouters)

app.get('/', (req, res) => {
    try {
        res.send('hello Server Started');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


const PORT=5000
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
