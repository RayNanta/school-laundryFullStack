import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import axios from 'axios'

function OutletTambah() {
  let [nama, setNama] = useState()
  let [alamat, setAlamat] = useState()
  let [telepon, setTelepon] = useState()
  let navigate = useNavigate()

  useEffect(() => {
    if(sessionStorage.getItem('isLogin') != "Login"){
      navigate('/')
    }
  },[])

  function SaveOutlet(event){
    event.preventDefault()
    let url = "http://localhost:8080/outlet/post"

    let data = {
      nama: nama,
      alamat: alamat,
      tlp: telepon,
    }

    if(window.confirm("Selesai Menambahkan Data Baru?")){
      axios.post(url, data, {
        headers: {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
      })
      .then((response) => {
        console.log(response.data)
        clear()
        navigate('/outlet/')
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }

  function clear(){
    setNama('')
    setAlamat('')
    setTelepon('')
  }

  return (
    <div>
        <Navbar />
        <div className='mx-20 mt-20 font-sourceSans'>
          <h1 className='text-xl font-semibold'>Laman Tambah Outlet</h1>
          <form onSubmit={SaveOutlet} className='mt-10'>
            <h3>Nama Outlet</h3>
            <input onChange={(e) => setNama(e.target.value)} name="nama" type="text" value={nama} placeholder='Masukkan Nama Outlet' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className=' mt-7'>Alamat</h3>
            <input onChange={(e) => setAlamat(e.target.value)} name="alamat" type="text" value={alamat} placeholder='Masukkan Alamat' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className=' mt-7'>No. Telepon</h3>
            <input onChange={(e) => setTelepon(e.target.value)} name="tlp" type="text" value={telepon} placeholder='Masukkan No. Telepon' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
          <div>
            <button className='bg-blue py-3 px-5 mt-10 text-white rounded-lg hover:bg-darkBlue duration-300 font-semibold'>Submit</button>
            <Link className='py-3 px-5 text-black rounded-lg hover:text-blue duration-300 font-semibold' to='/outlet'>Back</Link>
          </div>
          </form>
        </div>
        <Footer />
    </div>
  )
}

export default OutletTambah
