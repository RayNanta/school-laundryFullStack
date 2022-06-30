import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom';

import axios from 'axios'

function MemberEdit() {
  let [nama, setNama] = useState()
  let [alamat, setAlamat] = useState()
  let [jenisKelamin, setJenisKelamin] = useState()
  let [telepon, setTelepon] = useState()
  const { id } = useParams();
  console.log({id})
  let navigate = useNavigate()

  useEffect(() => {
    if(sessionStorage.getItem('isLogin') != "Login"){
      navigate('/')
    }
  },[])

  // const fetchDetails = async () => {
  //   await fetch(`http://localhost:8080/member/${id}`)
  //   .then(res => res.json())
  //   .then(data => { 
  //     setNama(data)
  //     setAlamat(data)
  //   })
  // }

  useEffect(() => {
    axios.get(`http://localhost:8080/member/${id}`, {
      headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
    })
    .then(res => {
      console.log(res.data)
      setNama(res.data.member.nama)
      setAlamat(res.data.member.alamat)
      setJenisKelamin(res.data.member.jenis_kelamin)
      setTelepon(res.data.member.tlp)
    }) 
  }, [])

  // useEffect(() => {
  //     axios.get(`http://localhost:8080/member/${id}`)
  //     .then(result => {
  //         setNama(result.data.nama)
  //         setAlamat(result.data.alamat)
  //         setJenisKelamin(result.data.jenis_kelamin)
  //         setTelepon(result.data.tlp)
  //     })
  // },[])

  function submit(e) {
    e.preventDefault()
    let data = {
        nama: nama,
        alamat: alamat,
        jenis_kelamin: jenisKelamin,
        tlp: telepon,
    }
    if(window.confirm("Selesai Merubah Data?")){
      axios.put(`http://localhost:8080/member/update/${id}`, data, {
        headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
      })
      .then(res => {
        console.log(res.data)
        navigate('/member/')
      })
      .catch(error => {
        console.log(error)
      })

    }
}


// const clear = () => {
//   setNama('')
//   setAlamat('')
//   setJenisKelamin('')
//   setTelepon('')
// }

  return (
    <div>
      <Navbar />
      <div className='mx-20 mt-20 font-sourceSans'>
        <h1 className='text-xl font-semibold'>Laman Edit Member</h1>
        <form onSubmit={submit} className='mt-10'>
          <h3>Nama</h3>
          <input onChange={(e) => setNama(e.target.value)} name="nama" type="text" value={nama} placeholder='Masukkan Nama' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400' required></input>
          <h3 className=' mt-7'>Alamat</h3>
          <input onChange={(e) => setAlamat(e.target.value)} name="alamat" type="text" value={alamat} placeholder='Masukkan Alamat' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
          <h3 className=' mt-7'>No. Telepon</h3>
          <input onChange={(e) => setTelepon(e.target.value)} name="telepon" type="text" value={telepon} placeholder='Masukkan No. Telepon' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
          <h3 className='mt-7'>Jenis Kelamin</h3>
          <select onChange={(e) => setJenisKelamin(e.target.value)} name="jenis_kelamin" type="text" value={jenisKelamin} placeholder='Masukkan Jenis Kelamin' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'>
              <option selected disabled>Pilih Jenis Kelamin</option>
              <option value="L">Laki Laki</option>
              <option value="P">Perempuan</option>
          </select>
          <div>
            <button  className='bg-blue py-3 px-5 mt-10 text-white rounded-lg hover:bg-darkBlue duration-300 font-semibold' type='submit'>Submit</button>
            <Link className='py-3 px-5 text-black rounded-lg hover:text-blue duration-300 font-semibold' to='/member'>Back</Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
    )
}

export default MemberEdit
