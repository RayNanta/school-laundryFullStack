import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import axios from 'axios'
import { useParams } from 'react-router-dom';

function UserEdit() {
  let [nama, setNama] = useState()
  let [username, setUsername] = useState()
  let [password, setPassword] = useState()
  let [outlet, setOutlet] = useState([])
  let [outletExst, setOutletExst] = useState()
  let [role, setRole] = useState()
  const { id } = useParams();
  let navigate = useNavigate()

  useEffect(() => {
    if(sessionStorage.getItem('isLogin') != "Login"){
      navigate('/')
    }
  },[])

  // outlet = show outlet by id user
  // outletExst = all outlet

  useEffect(() => {
    axios.get(`http://localhost:8080/user/${id}`, {
      headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
    })
    .then(res => {
      setNama(res.data.user.nama)
      setUsername(res.data.user.username)
      setPassword(res.data.user.password)
      setOutlet(res.data.user.id_outlet)
      // setOutletExst(res.data.user.nama)
      setRole(res.data.user.role)
    })
  }, [])
  
  useEffect(() => {
    axios.get(`http://localhost:8080/outlet/`, {
      headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
    })
    .then(res => {
      // console.log(res.data.outlet.nama)
      setOutletExst(res.data.outlet)
    })
  }, [])

  function submit(e){
    e.preventDefault()
    let data = {
      nama: nama,
      username: username,
      password: password,
      // outlet: outlet,
      id_outlet: outlet,
      role: role,
    }
    if(window.confirm("Selesai Merubah Data?"))
    axios.put(`http://localhost:8080/user/update/${id}`, data, {
      headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
    })
    .then(res => {
      console.log(res.data)
      navigate('/user/')
    })
    .catch(error => {
      console.log(error)
    })
  }
  console.log(outletExst)

  return (
    <div>
        <Navbar />
        <div className='mx-20 mt-20 font-sourceSans'>
          <h1 className='text-xl font-semibold'>Laman Edit User</h1>
          <form onSubmit={submit} className='mt-10'>
            <h3>Nama</h3>
            <input onChange={(e) => setNama(e.target.value)} name="nama" type="text" value={nama} placeholder='Masukkan Nama User' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className=' mt-7'>Username</h3>
            <input onChange={(e) => setUsername(e.target.value)} name="username" type="text" value={username} placeholder='Masukkan Username' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className=' mt-7'>Password</h3>
            <input onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder='Masukkan Password' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400' required></input>
            <h3 className='mt-7'>Outlet</h3>
            <select onChange={(e) => setOutlet(e.target.value)} name="outlet" type="text" value={outlet} placeholder='Masukkan Nama Outlet' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'>
              {outletExst?.map((outlet) => (
                <option key={outlet.id} value={outlet.id}>{outlet.nama}</option>
              ))}
            </select>
            <h3 className='mt-7'>Role</h3>
             <select onChange={(e) => setRole(e.target.value)} name="role" value={role} type="text" placeholder='Masukkan Role' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'>
              <option selected disabled>Pilih Role</option>
              <option value="admin">Admin</option>
              <option value="kasir">Kasir</option>
              <option value="owner">Owner</option>
            </select>
          <div>
            <button className='bg-blue py-3 px-5 mt-10 text-white rounded-lg hover:bg-darkBlue duration-300 font-semibold'>Submit</button>
            <Link className='py-3 px-5 text-black rounded-lg hover:text-blue duration-300 font-semibold' to='/user'>Back</Link>
          </div>
          </form>
        </div>
        <Footer />
    </div>
  )
}

export default UserEdit
