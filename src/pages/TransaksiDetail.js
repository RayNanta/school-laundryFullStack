import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


function TransaksiDetail() {

  let [nama, setNama] = useState([])
  // const namaOutlet = sessionStorage.getItem('nama_outlet')
  let [outlet, setOutlet] = useState([])
  let [invoice, setInvoice] = useState([])
  let [paket, setPaket] = useState([])
  let [totalHarga, setTotalHarga] = useState([])
  let [totalBayar, setTotalBayar] = useState([])
  let [tanggalBayar, setTanggalBayar] = useState([])
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
      console.log(res.data[0].tgl_bayar)
      setNama(res.data[0].member.nama)
      setOutlet(res.data[0].detail_transaksi[0].paket.outlet.nama)
      setInvoice(res.data[0].kode_invoice)
      setPaket(res.data[0].detail_transaksi[0].paket.nama_paket)
      setTotalHarga(res.data[0].detail_transaksi[0].total_harga)
      setTotalBayar(res.data[0].detail_transaksi[0].total_bayar)
      setTanggalBayar(res.data[0].tgl_bayar)
      setStatus(res.data[0].status)
    })
    .catch(error => {
      console.log(error)
    })
  },[])

  return (
    <div>
        <Navbar />
        <div className='mx-20 mt-20 font-sourceSans'>
          <h1 className='text-xl font-semibold'>Laman Detail Transaksi</h1>
          <div className='mt-10'>
            <h3>Nama</h3>
            <input disabled type="text" value={nama} placeholder='Masukkan Nama' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className=' mt-7'>Outlet</h3>
            <input disabled type="text" value={outlet} placeholder='Masukkan Nama Outlet' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className=' mt-7'>Invoice</h3>
            <input disabled type="text" value={invoice} placeholder='Invoice' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className='mt-7'>Paket</h3>
            <input disabled type="text" value={paket} placeholder='Masukkan Jenis Paket' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className='mt-7'>Total Harga</h3>
            <input disabled type="text" value={totalHarga} placeholder='Masukkan Total Harga' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className='mt-7'>Total Bayar</h3>
            <input disabled type="text" value={totalBayar} placeholder='0' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className='mt-7'>Tanggal Bayar</h3>
            <input disabled type="text" value={tanggalBayar} placeholder='Member Belum Melakukan Pembayaran' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className='mt-7'>Status</h3>
            <input disabled type="text" value={status} placeholder='Masukkan Status' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <div className='mt-10'>
              <Link className='bg-blue py-3 px-5 mt-10 text-white rounded-lg hover:bg-darkBlue duration-300 font-semibold' to='/transaksi'>Back</Link>
            </div>
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default TransaksiDetail
