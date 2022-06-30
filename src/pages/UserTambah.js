import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import axios from 'axios'

function UserTambah() {
  let [nama, setNama] = useState()
  let [username, setUsername] = useState()
  let [password, setPassword] = useState()
  let [outlet, setOutlet] = useState([])
  let [outletExst, setOutletExst] = useState()
  let [role, setRole] = useState()
  let navigate = useNavigate()

  //outlet = all outlet
  //outletExst = idOutlet

  useEffect(() => {
    if(sessionStorage.getItem('isLogin') != "Login"){
      navigate('/')
    }
  },[])

  useEffect(() => {
    axios.get(`http://localhost:8080/outlet/`, {
      headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
    })
    .then(res => {
      console.log(res.data)
      setOutlet(res.data)
  })
  .catch(error => { 
    console.log(error)
  })
}, [])

  function SaveUser(event){
    event.preventDefault()
    let url = "http://localhost:8080/user/post"
    // console.log(outletExst)

    let data = {
      nama: nama,
      username: username,
      password: password,
      outlet: outlet,
      id_outlet: outletExst,
      role: role,
    }

    if(window.confirm("Selesai Menambahkan Data Baru?")){
      axios.post(url, data, {
        headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
      })
      .then((response) => {
        console.log(response.data)
        clear()
        navigate('/user/')
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }

  function clear(){
    setNama('')
    setUsername('')
    setPassword('')
    setOutlet('')
    setRole('')
  }

  return (
    <div>
        <Navbar />
        <div className='mx-20 mt-20 font-sourceSans'>
          <h1 className='text-xl font-semibold'>Laman Tambah User</h1>
          <form onSubmit={SaveUser} className='mt-10'>
            <h3>Nama</h3>
            <input onChange={(e) => setNama(e.target.value)} name="nama" type="text" value={nama} placeholder='Masukkan Nama User' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className=' mt-7'>Username</h3>
            <input onChange={(e) => setUsername(e.target.value)} name="username" type="text" value={username} placeholder='Masukkan Username' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className=' mt-7'>Password</h3>
            <input onChange={(e) => setPassword(e.target.value)} name="password" value={password} type="password" placeholder='Masukkan Password' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className='mt-7'>Outlet</h3>
            <select onChange={(e) => setOutletExst(e.target.value)} name="outlet" type="text" value={outletExst} placeholder='Masukkan Jenis Kelamin' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'>
              <option disabled selected>Pilih Outlet</option>
              {outlet.outlet?.map(item => (
                <option key={item.id} value={item.id}>{item.nama}</option>
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

export default  UserTambah
