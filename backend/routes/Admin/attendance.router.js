import express from 'express'
import { authorizeUser } from '../../middleware/authorizeUser.js'
import {modifyAttendanceStatus} from '../../controllers/AdminPageControllers/manageAttendance.js'
import { AttendanceToken } from '../../controllers/AdminPageControllers/AttendanceToken.js'
const router=express.Router()

// generate attendance token
router.post("/generateattendancetoken",authorizeUser,AttendanceToken)

// modify attendance status
router.put("/modifyattendance",authorizeUser,modifyAttendanceStatus)

export const AttendanceRouters=router

