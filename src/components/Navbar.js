import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {

  let navigate = useNavigate()

  function logout() {
    sessionStorage.clear()
    navigate('/')
  }


  return (
    <nav className='flex justify-between items-center font-sourceSans mx-20 my-8'>
        <div>
            <h1 className='font-bold text-3xl'>Laundry<span className='text-blue'>Mu.</span></h1>
        </div>
        <div className="text-lg">
            <NavLink className='mr-8 hover:text-blue duration-300 font-semibold' to='/home'>Home</NavLink>
            <NavLink className={`mr-8 hover:text-blue duration-300 font-semibold ${sessionStorage.getItem('role') === 'admin' || sessionStorage.getItem('role') === 'kasir'  ? "" : "hidden"}`} to='/member'>Member</NavLink>
            <NavLink className={`mr-8 hover:text-blue duration-300 font-semibold ${sessionStorage.getItem('role') === 'admin' ? "" : "hidden"}`} to='/outlet'>Outlet</NavLink>
            <NavLink className={`mr-8 hover:text-blue duration-300 font-semibold ${sessionStorage.getItem('role') === 'admin' ? "" : "hidden"}`} to='/user'>User</NavLink>
            <NavLink className={`mr-8 hover:text-blue duration-300 font-semibold ${sessionStorage.getItem('role') === 'admin' ? "" : "hidden"}`} to='/paket'>Paket</NavLink>
            <NavLink className={`mr-8 hover:text-blue duration-300 font-semibold ${sessionStorage.getItem('role') === 'admin' || sessionStorage.getItem('role') === 'kasir'  ? "" : "hidden"}`} to='/transaksi'>Transaksi</NavLink>
            <NavLink className={`mr-8 hover:text-blue duration-300 font-semibold`} to='/laporan'>Laporan</NavLink>
            <NavLink onClick={logout} className='bg-blue p-3 text-white rounded-lg hover:bg-darkBlue duration-300 font-semibold' to='/'>Logout</NavLink>
        </div>
    </nav>
  )
}
