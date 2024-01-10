import express from 'express'
import { authorizeUser } from '../../middleware/authorizeUser.js'
import {addStudent, deleteStudent, editStudent} from '../../controllers/AdminPageControllers/manageStudent.js'
import { getAllStudents, getStudentById } from '../../controllers/AdminPageControllers/getStudentDetails.js'
const router=express.Router()
//add student route
router.post("/addstudent",authorizeUser,addStudent)
// edit route
router.put("/editstudent",authorizeUser,editStudent)
// get all students route
router.get("/students",authorizeUser,getAllStudents)
// get students by roll number route
router.get("student/:id",authorizeUser,getStudentById)
//delete student route
router.delete("/deletestudent",authorizeUser,deleteStudent)

export const StudentRouters = router
