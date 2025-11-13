import React from 'react'
import { FaAlignLeft, FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router'

const Error = () => {
  return (
    <div className='flex flex-col min-h-screen justify-center items-center'>
        <div>
            <img className='h-100' src="/gif.gif"  alt="" />
        </div>
        
        <h2 className='text-3xl font-bold'>Page Not Found!</h2>
        <p className='text-gray-500 p-3 text-center'>Oops! The page you're looking for doesn't exist or has been moved.</p>

        <Link to="/" className='bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2'> <FaArrowLeft />
  Back to Home</Link>
    </div>
  )
}

export default Error