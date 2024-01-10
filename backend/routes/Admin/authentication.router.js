import express from 'express'
import { Login } from '../../controllers/authControllers/Login.js'
import { generateResetURL } from '../../controllers/authControllers/generateResetURL.js'
import { verifyResetToken } from '../../controllers/authControllers/resetPassword.js'

const router=express.Router()
// login Route 
router.post("/login",Login)
// Reset Password request Route
 router.post("/resetpassword",generateResetURL)
// verify token and  Update password 
 router.put("/updatepassword",verifyResetToken)


export const AuthRouters=router;