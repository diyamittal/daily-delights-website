import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function AdminComponent(){
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.isAdmin ? <Outlet /> : <Navigate to="/" />
}
