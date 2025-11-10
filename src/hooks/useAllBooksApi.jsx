import React, { useEffect, useState } from 'react'
import useAxios from './useAxios'

const useAllBooksApi = () => {

    const [books, setBooks] = useState([])
    const axiosInstance = useAxios()

    useEffect(()=>{
        axiosInstance.get('/all-books')
        .then(data => {
            setBooks(data.data)
        })
        .catch(err=>{
            console.log(err);
        })
    },[axiosInstance])

  return {books}
}

export default useAllBooksApi