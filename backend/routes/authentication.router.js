import express from 'express'
import {CreateAdmin} from '../controllers/authControllers/CreateAdmin.js'
import { Login } from '../controllers/authControllers/authentication.js'
import { generateResetURL } from '../controllers/authControllers/generateResetURL.js'
const router=express.Router()
// Create Admin Route 
router.post("/createadmin",CreateAdmin)
// login Route 
router.post("/login",Login)
// Reset Password request Route
 router.post("/resetpassword",generateResetURL)


//reset password update route
// router.put("/resetpassword",{email,newpassword})


export const AuthRouters=router;