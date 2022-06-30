import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import axios from 'axios'

export default function PaketEdit() {
  let [nama, setNama] = useState()
  let [outlet, setOutlet] = useState([])
  let [outletExst, setOutletExst] = useState()
  let [jenis, setJenis] = useState()
  let [harga, setHarga] = useState()
  const { id } = useParams();
  let navigate = useNavigate()

  useEffect(() => {
    if(sessionStorage.getItem('isLogin') != "Login"){
      navigate('/')
    }
  },[])

  useEffect(() => {
    axios.get(`http://localhost:8080/paket/${id}`, {
      headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
    })
    .then(res => {
      // console.log(res.data.paket)
      setNama(res.data.paket.nama_paket)
      setOutlet(res.data.paket.id_outlet)
      // setOutletExst(res.data.paket.outletExst)
      setJenis(res.data.paket.jenis)
      setHarga(res.data.paket.harga)
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
      nama_paket: nama,
      // outlet: outlet,
      id_outlet: outlet,
      jenis: jenis,
      harga: harga,
    }
    if(window.confirm("Selesai Merubah Data?")){
      axios.put(`http://localhost:8080/paket/update/${id}`, data, {
        headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
      })
      .then(res => {
        console.log(res.data)
        navigate('/paket/')
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
          <h1 className='text-xl font-semibold'>Laman Edit Paket</h1>
          <form onSubmit={submit} className='mt-10'>
            <h3>Nama Paket</h3>
            <input onChange={(e) => setNama(e.target.value)} type="text" name='nama' value={nama} placeholder='Masukkan Nama Paket' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className=' mt-7'>Outlet</h3>
            <select onChange={(e) => setOutlet(e.target.value)} type="text" name='outlet' value={outlet} placeholder='Masukkan Nama Outlet' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'>
              {outletExst?.map((outlet) => (
                <option key={outlet.id} value={outlet.id}>{outlet.nama}</option>
              ))}
            </select>
            <h3 className=' mt-7'>Jenis</h3>
            <select onChange={(e) => setJenis(e.target.value)} type="text" name='jenis' value={jenis} placeholder='Masukkan Jenis Paket' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'>
              <option selected disabled>Pilih Jenis Paket</option>
              <option value="kiloan">Kiloan</option>
              <option value="selimut">Selimut</option>
              <option value="bed_cover">Bed Cover</option>
              <option value="kaos">Kaos</option>
              <option value="lain">Paket Jenis Lain</option>
            </select>
            <h3 className='mt-7'>Harga</h3>
            <input onChange={(e) => setHarga(e.target.value)} type="text" name='harga' value={harga} placeholder='Masukkan Harga' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <div>
              <button className='bg-blue py-3 px-5 mt-10 text-white rounded-lg hover:bg-darkBlue duration-300 font-semibold'>Submit</button>
              <Link className='py-3 px-5 text-black rounded-lg hover:text-blue duration-300 font-semibold' to='/paket'>Back</Link>
            </div>
          </form>
        </div>
        <Footer />
    </div>
  )
}
