import axios from "axios";
import { hostname } from "../constant/constant"; 
export const  api=axios.create({
    baseURL:`http://${hostname}:5000`,
})