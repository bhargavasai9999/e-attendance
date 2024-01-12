import express from 'express'
import {CreateAdmin, editAdmin} from '../../controllers/AdminPageControllers/manageAdmin.js'
const router=express.Router()
// Create Admin Route 
router.post("/createadmin",CreateAdmin)

//edit Admin details route
router.put("/editadmin",editAdmin)

export const AdminRouters=router