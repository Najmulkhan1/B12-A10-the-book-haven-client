import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import useAxios from '../hooks/useAxios'
import { ListStart, Star } from 'lucide-react'



const BookDetails = () => {

    const {id} = useParams()
    const axiosInstance = useAxios()
    const [book, setBook] = useState({})

   useEffect(()=>{
    axiosInstance(`/books/${id}`)
    .then(data =>{
        setBook(data.data)
        console.log(data);
        
    })
   },[axiosInstance, setBook, id])

  return (
    <div className='w-11/12 mx-auto mt-4'>
        <div className='grid gird-cols-1 md:grid-cols-2 gap-5'>
            <div className='rounded-lg'>
                <img className='rounded-lg' src={book.bookImage} alt="" />
            </div>
            <div className='relative'>
                <h1 className='text-4xl font-semibold'>{book.title}</h1>
                <p>by | {book.author}</p>
                <hr className='border-gray-200 shadow my-2'/>
                <div className='flex items-center gap-2'>
                    <p className='text-xl'>{book.rating} </p>
                    <Star fill='yellow' className='text-yellow-400'></Star>
                </div>
                
                <button className='absolute top-3 right-2 bg-amber-200 py-1 px-3 rounded-full border font-semibold text-black border-amber-300'>{book.category}</button>

                <div>
                    <p className='line-clamp-4'>{book.summary}</p>
                    <a href='#boo' to={'boo'} className='text-blue-500'>See more....</a>
                </div>
                <div className='mt-3'>
                   <button className='btn w-full'>Add to Read</button> 
                </div>
                
            </div>
        </div>


        <div id='boo' className='mt-4 border p-4 border-gray-300 rounded-lg'>
            <h1 className='text-2xl font-semibold label'>Summary</h1>
            <hr className='text-gray-400 my-3' />
            <p>
                <span className='text-2xl font-semibold text-gray-600'>{book.title} : </span> {book.summary}
            </p>
        </div>
    </div>
  )
}

export default BookDetails