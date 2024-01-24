import axios from "axios";
import {hostname} from '../constant/constant.js'
export const  api=axios.create({
    baseURL:`http://${hostname}:5000`,
})
