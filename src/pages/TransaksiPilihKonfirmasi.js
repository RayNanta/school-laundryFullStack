import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function TransaksiPilihKonfirmasi() {
  let [nama, setNama] = useState([])
  let [outlet, setOutlet] = useState([])
  let [invoice, setInvoice] = useState([])
  let [paket, setPaket] = useState([])
  let [totalHarga, setTotalHarga] = useState([])
  let [totalBayar, setTotalBayar] = useState([])
  let [status, setStatus] = useState([])
  let navigate = useNavigate()
  const { id } = useParams();

  useEffect(() => {
    if(sessionStorage.getItem('isLogin') != "Login"){
      navigate('/')
    }
  },[])
  
  useEffect(() => {
    axios.get(`http://localhost:8080/transaksi/${id}`, {
      headers: {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
    })
    .then(res => {
      console.log(res.data[0].detail_transaksi[0].total_harga)
      setNama(res.data[0].member.nama)
      setInvoice(res.data[0].kode_invoice)
      setTotalHarga(res.data[0].detail_transaksi[0].total_harga)
    })
    .catch(error => {
      console.log(error)
    })
  },[])

  function SaveKonfirmasi(event){
    event.preventDefault()
    let url = `http://localhost:8080/transaksi/bayar/${id}`

    let data = {
      total_bayar: totalBayar
    }

    if(totalBayar < totalHarga){
      window.confirm("kurang lur")
    }
    else if(window.confirm("Selesai Menambahkan Data Baru?")){
      axios.put(url, data, {
        headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
      })
      .then(res => {
        console.log(res.data)
        navigate('/transaksi/')
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
          <h1 className='text-xl font-semibold'>Laman Pilih Konfirmasi</h1>
          <form onSubmit={SaveKonfirmasi} className='mt-10'>
            <h3>Nama Pelanggan</h3>
            <input disabled type="text" value={nama} placeholder='Masukkan Nama Pelannggan' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className=' mt-7'>Invoice</h3>
            <input disabled type="text" value={invoice} placeholder='Invoice' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className=' mt-7'>Jumlah Tagihan</h3>
            <input disabled type="text" value={totalHarga} placeholder='Masukkan Jumlah Tagihan' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className='mt-7'>Jumlah Bayar</h3>
            <input onChange={(e) => setTotalBayar(e.target.value)} type="text" name='totalBayar' value={totalBayar} placeholder='Masukkan Jumlah Bayar' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
          <div>
            <button className='bg-blue py-3 px-5 mt-10 text-white rounded-lg hover:bg-darkBlue duration-300 font-semibold'>Submit</button>
            <Link className='py-3 px-5 text-black rounded-lg hover:text-blue duration-300 font-semibold' to='/konfirmasi_transaksi'>Back</Link>
          </div>
          </form>
        </div>
        <Footer />
    </div>
  )
}

export default  TransaksiPilihKonfirmasi
