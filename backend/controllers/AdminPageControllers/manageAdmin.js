import { database } from '../../config/dbconnection.cjs';

export const CreateAdmin = async (req, res) => {
    const { name, email, mobile_number, password } = req.body
    try {
        const checkQuery = 'SELECT * FROM e_attendance.User WHERE email = $1';
        const checkResult = await database.query(checkQuery, [email]);
        if (checkResult.rows.length > 0) {
            return res.status(400).json({ error: 'Admin with the same email already exists' });
        }
        const insertQuery = `
            INSERT INTO e_attendance.User (name, email, mobile_number, password)
            VALUES ($1, $2, $3, $4)`;
        const insertValues = [name, email, mobile_number, password];
        const insertResult = await database.query(insertQuery, insertValues);
        console.log('Admin created successfully:', insertResult.rows);
        res.status(200).json({ message: 'Admin created successfully' });
    } catch (error) {
        console.error('Error creating admin:', error);
        return res.status(400).json({message:"Unable to connect server"})
    }
};


export const editAdmin=async(req,res)=>{
    const { name, email, mobile_number, password } = req.body
    try {
        const checkQuery = 'SELECT * FROM e_attendance.User WHERE email = $1';
        const checkResult = await database.query(checkQuery, [email]);
        if (checkResult.rows.length < 0) {
            return res.status(400).json({ error: 'Admin Email Not Found' });

        }
        const updateQuery = `
            UPDATE e_attendance.User SET name=$1,mobile_number=$2,password=$3 WHERE email=$4`;
        const updateValues = [name, mobile_number, password,email];
        const updateResult = await database.query(updateQuery, updateValues);
        console.log('Admin Updated successfully:', updateResult.rows);
        res.status(200).json({ message: 'Admin Updated successfully' });
        

    } catch (error) {
        console.log(error)
        return res.json({message:error})
        
    }
}

export const ProfileDetails=async (req,res)=>{

    try {
        const Result= await database.query(`
        SELECT name,email,password,mobile_number from e_attendance.User WHERE adminid=$1
        `,[req.userId])
        console.log(Result)
        return res.status(200).json(Result.rows[0])
    } catch (error) {
        console.log(err)
        return res.status(400).json({message:"Internal error"})
    }
}


export const getStudentDetails = async (req, res) => {
    const userId = req.userId;
    try {
        const studentQuery = `
        SELECT
        s.studentid,
        s.roll_number,
        s.name,
        s.email,
        s.mobile_number,
        a.attendance_status
    FROM
        e_attendance.Student AS s
        LEFT JOIN e_attendance.Attendance AS a ON s.studentid = a.student_id
        LEFT JOIN e_attendance.User AS u ON s.associated_adminid = u.ADMINID
    WHERE
        u.ADMINID = $1
        AND a.created_at = CURRENT_DATE
    ORDER BY
        s.roll_number ASC,
        a.created_at DESC;
    
        `;

        const studentResult = await database.query(studentQuery, [userId]);

        if (studentResult.rows.length > 0) {
            return res.status(200).json(studentResult.rows);
        } else {
            return res.status(200).json({ message: "No students found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


