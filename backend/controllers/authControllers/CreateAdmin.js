import { database } from '../../config/dbconnection.cjs';

export const CreateAdmin = async (req, res) => {
    const { name, email, mobile, password } = req.body
    try {
        //checking if admin exist or  not
        const checkQuery = 'SELECT * FROM e_attendance.User WHERE email = $1';
        const checkResult = await database.query(checkQuery, [email]);
        if (checkResult.rows.length > 0) {
            return res.status(400).json({ error: 'Admin with the same email already exists' });
        }
        const insertQuery = `
            INSERT INTO e_attendance.User (name, email, mobile_number, password)
            VALUES ($1, $2, $3, $4)`;
        const insertValues = [name, email, mobile, password];
        const insertResult = await database.query(insertQuery, insertValues);
        console.log('Admin created successfully:', insertResult.rows);
        res.status(200).json({ message: 'Admin created successfully' });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
