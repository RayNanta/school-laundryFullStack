import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom';

import axios from 'axios'

function OutletEdit() {
  let [nama, setNama] = useState()
  let [alamat, setAlamat] = useState()
  let [telepon, setTelepon] = useState()
  const { id } = useParams();
  let navigate = useNavigate()

  useEffect(() => {
    if(sessionStorage.getItem('isLogin') != "Login"){
      navigate('/')
    }
  },[])

  useEffect(() => {
    axios.get(`http://localhost:8080/outlet/${id}`, {
      headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
    })
    .then(res => {
      setNama(res.data.outlet.nama)
      setAlamat(res.data.outlet.alamat)
      setTelepon(res.data.outlet.tlp)
    })
  },[])

  function submit(e){
    e.preventDefault()
    let data = {
      nama: nama,
      alamat: alamat,
      tlp: telepon,
    }
    if(window.confirm("Selesai Merubah Data?")){
      axios.put(`http://localhost:8080/outlet/update/${id}`, data, {
        headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
      })
      .then(res => {
        console.log(res.data)
        navigate('/outlet/')
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  return (
    <div>
        <Navbar />
        <div className='mx-20 mt-20 font-sourceSans'>
          <h1 className='text-xl font-semibold'>Laman Edit Outlet</h1>
          <form onSubmit={submit} className='mt-10'>
            <h3>Nama Outlet</h3>
            <input onChange={(e) => setNama(e.target.value)} name="nama" type="text" value={nama} placeholder='Masukkan Nama Outlet' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className=' mt-7'>Alamat</h3>
            <input onChange={(e) => setAlamat(e.target.value)} name="alamat" type="text" value={alamat} placeholder='Masukkan Alamat' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className=' mt-7'>No. Telepon</h3>
            <input onChange={(e) => setTelepon(e.target.value)} name="telepon" type="text" value={telepon} placeholder='Masukkan No. Telepon' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
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

export default  OutletEdit
