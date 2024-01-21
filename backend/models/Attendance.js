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
            created_At DATE,
            FOREIGN KEY (admin_id) REFERENCES e_attendance.User(ADMINID),
            FOREIGN KEY (student_id) REFERENCES e_attendance.Student(STUDENTID) ON DELETE CASCADE
        )`
        await database.query(query);
        console.log("Attendance table Created")
    } catch (error) {
        console.log(error)
    }
}


export const CreateProcedure=async()=>{
    try {
        await database.query(`CREATE OR REPLACE PROCEDURE  updateAttendanceStatus()
        LANGUAGE plpgsql
        AS $$
        BEGIN
          -- Update attendance_status based on checkin_time and checkout_time
          UPDATE e_attendance.Attendance
          SET
            attendance_status = CASE 
                                WHEN checkin_time IS NOT NULL AND checkout_time IS NOT NULL THEN 'Present'
                                ELSE attendance_status
                              END
          WHERE checkin_time IS NOT NULL AND checkout_time IS NOT NULL;
        END;
        $$
        `)
        console.log("Created Attendance Procedure")
    } catch (error) {
        console.log(error)
        
    }

}