import express from 'express'
import {CreateAdmin, ProfileDetails, editAdmin, getStudentDetails} from '../../controllers/AdminPageControllers/manageAdmin.js'
import { authorizeUser } from '../../middleware/authorizeUser.js'
const router=express.Router()
// Create Admin Route 
router.post("/createadmin",CreateAdmin)

//edit Admin details route
router.put("/editadmin",editAdmin)

router.get("/profile",authorizeUser,ProfileDetails)

router.get("/dashboard",authorizeUser,getStudentDetails)
export const AdminRouters=router