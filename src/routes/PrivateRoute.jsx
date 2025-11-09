import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router'

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth()
    const location = useLocation()

    if(loading) {
        return <p>Loading......</p>
    }

    if(user && user?.email){
        return children
    }


  return <Navigate to={'/login'} state={location.pathname}></Navigate>

}

export default PrivateRoute