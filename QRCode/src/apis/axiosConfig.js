import axios from 'axios'
const hostname=window.location.hostname || 'localhost'
export const api =axios.create({
    baseURL:`http://${hostname}:5000`
})