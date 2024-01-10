import { database } from "../config/dbconnection.cjs";

export const CreateAttendanceTable=async ()=>{

    try {
        const query=`CREATE TABLE IF NOT EXISTS e_attendance.Attendance (
            attendance_id SERIAL PRIMARY KEY,
            student_id uuid NOT NULL,
            admin_id uuid NOT NULL,
            checkin_time TIMESTAMPTZ,
            checkout_time TIMESTAMPTZ,
            attendance_status VARCHAR(10),
            FOREIGN KEY (admin_id) REFERENCES e_attendance.User(ADMINID),
            FOREIGN KEY (student_id) REFERENCES e_attendance.Student(STUDENTID) ON DELETE CASCADE
        )`
        await database.query(query);
        console.log("Attendance table Created")
    } catch (error) {
        console.log(error)
    }
}