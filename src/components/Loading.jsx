import React from 'react'
import Spiner from './Spiner'

const Loading = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
        <Spiner></Spiner>
    </div>
  )
}

export default Loading