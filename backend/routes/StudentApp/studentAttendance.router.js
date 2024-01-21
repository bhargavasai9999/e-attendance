import express from 'express'
import { authorizeUser } from '../../middleware/authorizeUser.js'
import { getAllAttendance, markAttendance } from '../../controllers/studentAppControllers/studentAttendance.js'

const router=express.Router()

router.post('/markattendance',authorizeUser,markAttendance)
router.get('/getattendance',authorizeUser,getAllAttendance)


export const studentAttendanceRouters=router
