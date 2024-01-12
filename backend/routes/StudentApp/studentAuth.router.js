import express from'express'
import {database} from '../../config/dbconnection.cjs'
import { generateResetURL, studentLogin, studentResetPassword } from '../../controllers/studentAppControllers/studentAuth.js'

const router=express.Router()

// login route
router.post("/login",studentLogin)
//password reset link genertion route
router.post("/resetpassword",generateResetURL)
// update new password route
router.put("/updatepassword",studentResetPassword)

export const StudentAuthRouters=router