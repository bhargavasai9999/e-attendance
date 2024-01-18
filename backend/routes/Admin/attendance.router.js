import express from 'express'
import { authorizeUser } from '../../middleware/authorizeUser.js'
import {getAttendance, getAttendanceStatus, modifyAttendanceStatus} from '../../controllers/AdminPageControllers/manageAttendance.js'
import { AttendanceToken } from '../../controllers/AdminPageControllers/AttendanceToken.js'
const router=express.Router()

router.get("/generateattendancetoken",authorizeUser,AttendanceToken)


router.put("/updateattendance",authorizeUser,modifyAttendanceStatus)
router.get("/attendance",authorizeUser,getAttendanceStatus)
router.post("/getattendance",authorizeUser,getAttendance);

export const AttendanceRouters=router

