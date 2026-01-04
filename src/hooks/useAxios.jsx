import axios from "axios"


 const axiosInstance = axios.create({
    baseURL: 'https://the-book-haven-server.vercel.app/'
   //  baseURL: 'http://localhost:4000'
 })

 const useAxios = () => {
    return axiosInstance
 }

 export default useAxios