import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import fotoHome from '../images/fotoHome.svg'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  let nama = sessionStorage.getItem('nama')
  let role = sessionStorage.getItem('role')
  console.log(nama)

  let navigate = useNavigate()

  useEffect(() => {
    if(sessionStorage.getItem('isLogin') != "Login"){
      navigate('/')
    }
  },[])

  return (
    <div>
        <Navbar />
        <div className='mx-20 mt-20 font-sourceSans flex items-center'>
          <div className='w-1/2'>
            <h1 className='text-5xl font-bold'>Selamat Datang, <span className='capitalize'>{role}</span><br /><span className='text-blue capitalize'>{nama}</span></h1>
            <p className='max-w-md mt-5'>Silahkan mengakses beberapa tab tersedia pada navigasi diatas. Jangan ragu untuk menghubungi kami bila diperlukan!</p>
          </div>
          <div className='w-1/2'>
            <img className='' src={fotoHome} alt="" />
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default Home