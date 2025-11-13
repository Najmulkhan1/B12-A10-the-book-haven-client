import axios from "axios"


 const axiosInstance = axios.create({
    baseURL: 'https://the-book-haven-server.vercel.app/'
 })

 const useAxios = () => {
    return axiosInstance
 }

 export default useAxios