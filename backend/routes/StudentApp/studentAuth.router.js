import express from'express'
import {database} from '../../config/dbconnection.cjs'
import { generateResetURL, studentLogin, studentResetPassword,getProfile } from '../../controllers/studentAppControllers/studentAuth.js'
import { authorizeUser } from '../../middleware/authorizeUser.js'

const router=express.Router()

// login route
router.post("/login",studentLogin)
//password reset link genertion route
router.post("/resetpassword",generateResetURL)
// update new password route
router.put("/updatepassword",studentResetPassword)
router.get('/profile',authorizeUser,getProfile)

export const StudentAuthRouters=router