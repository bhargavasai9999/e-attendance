import express from 'express'
import { authorizeUser } from '../../middleware/authorizeUser.js'
import { markAttendance } from '../../controllers/studentAppControllers/studentAttendance.js'

const router=express.Router()

router.post('/markattendance',authorizeUser,markAttendance)

export const studentAttendanceRouters=router
