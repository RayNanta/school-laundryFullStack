import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import axios from 'axios'

function TransaksiPilih() {

  let [nama, setNama] = useState([])
  let outletNama = sessionStorage.getItem('nama_outlet')
  let outletId = sessionStorage.getItem('id_outlet')
  let invoice = `LDMU${Date.now()}`
  let [idPaket, setIdPaket] = useState([])
  let [jumlah, setJumlah] = useState([])
  let [diskon, setDiskon] = useState([])
  let [pajak, setPajak] = useState([])
  let [biayaTambahan, setBiayaTambahan] = useState([])
  let [paketExst, setPaketExst] = useState()
  const { id } = useParams();
  let navigate = useNavigate()

  //paketExst = semua paket
  //paket = show paket by selected id user

  useEffect(() => {
    if(sessionStorage.getItem('isLogin') != "Login"){
      navigate('/')
    }
  },[])

  useEffect(() => {
    axios.get(`http://localhost:8080/member/${id}`, {
      headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
    })
    .then(res => {
      // console.log(res.data.member.nama)
      setNama(res.data.member.nama)
    })
  }, [])
  
  useEffect(() => {
    axios.get(`http://localhost:8080/paket/`, {
      headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
    })
    .then(res => {
      console.log(res.data.paket)
      setPaketExst(res.data.paket)
    })
  }, [])

  function SaveTransaksi(event){
    event.preventDefault()
    let url = "http://localhost:8080/transaksi/post"

    let data = {
      id_outlet: outletId,
      id_member: id,
      biaya_tambahan: parseInt(biayaTambahan),
      diskon: parseInt(diskon),
      pajak: parseInt(pajak),
      status: "baru",
      id_user: sessionStorage.getItem('id_user'),
      invoice: invoice,
      detail_transaksi : [
        {
            id_paket : idPaket,
            qty : parseInt(jumlah),
            // total_harga: ""
        }
      ]
    }
    console.log(idPaket)

    if(window.confirm("Selesai Menambahkan Data Baru?")){
      axios.post(url, data, {
        headers: {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
      })
      .then((response) => {
        console.log(response.data)
        navigate('/transaksi/')
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }

  return (
    <div>
        <Navbar />
        <div className='mx-20 mt-20 font-sourceSans'>
          <h1 className='text-xl font-semibold'>Laman Tambah Member</h1>
          <form onSubmit={SaveTransaksi} className='mt-10'>
            <h3>Nama</h3>
            <input disabled name="nama" type="text" value={nama} placeholder='Masukkan Nama' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className=' mt-7'>Nama Outlet</h3>
            <input disabled value={outletNama} type="text" placeholder='Masukkan Nama Outlet' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className=' mt-7'>Invoice</h3>
            <input value={invoice} type="text" placeholder='Invoice' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className='mt-7'>Paket</h3>
            <select required onChange={(e) => setIdPaket(e.target.value)} name="paket" value={idPaket} type="text" placeholder='Masukkan Jenis Paket' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'>
              <option selected disabled value='' >Pilih Paket</option>
              {paketExst?.map(item => (
                <option key={item.id} value={item.id}>{item.nama_paket}</option>
              ))}
            </select>
            <h3 className='mt-7'>Jumlah</h3>
            <input onChange={(e) => setJumlah(e.target.value)} name="jumlah" type="text" value={jumlah} placeholder='Masukkan Jumlah' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className='mt-7'>Diskon(%)</h3>
            <input onChange={(e) => setDiskon(e.target.value)} name="diskon" type="text" value={diskon} placeholder='0' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className='mt-7'>Pajak(%)</h3>
            <input onChange={(e) => setPajak(e.target.value)} name="pajak" type="text" value={pajak} placeholder='0' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
            <h3 className='mt-7'>Biaya Tambahan</h3>
            <input onChange={(e) => setBiayaTambahan(e.target.value)} nama="biayaTambahan" type="text" value={biayaTambahan} placeholder='0' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400'></input>
          <div>
            <button className='bg-blue py-3 px-5 mt-10 text-white rounded-lg hover:bg-darkBlue duration-300 font-semibold'>Submit</button>
            <Link className='py-3 px-5 text-black rounded-lg hover:text-blue duration-300 font-semibold' to='/tambah_transaksi'>Back</Link>
          </div>
          </form>
        </div>
        <Footer />
    </div>
  )
}

export default TransaksiPilih
