
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
// const token = localStorage.getItem("token");
const token = useSelector(state => state.user.user);
  return token ? <Outlet /> : <Navigate to="/login"/>
}

export default PrivateRoute