import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function TransaksiKonfirmasi() {

    let [transaksi, setTransaksi] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        if(sessionStorage.getItem('isLogin') != "Login"){
            navigate('/')
          }
          axios.get(`http://localhost:8080/transaksi/filter/belum_bayar`, {
              headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
          })
          .then(res => {
              console.log(res.data)
              setTransaksi(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div>
            <Navbar />
            <div className='mx-20 mt-20 font-sourceSans'>
                <h1 className='text-xl font-semibold'>Laman Konfirmasi Transaksi</h1>
                <div className='mt-10'>
                    <table className='w-full'> 
                        <thead className=' border-b-2 border-gray-200 text-left'>
                            <th className='p-5'>Nama</th>
                            <th className='p-5'>Invoice</th>
                            <th className='p-5'>Status</th>
                            <th className='p-5'>Pembayaran</th>
                            <th className='p-5'>Total Harga</th>
                            <th className='p-5'>Aksi</th>
                        </thead>
                        <tbody>
                            {transaksi?.map((transaksi) => (
                            <tr className=' border-b-2 border-gray-200 text-left hover:bg-gray-100 duration-300'>
                                <td className='p-5'>{transaksi.member.nama}</td>
                                <td className='p-5'>{transaksi.kode_invoice}</td>
                                <td className='p-5'>{transaksi.status}</td>
                                <td className='p-5'>{transaksi.dibayar}</td>
                                <td className='p-5'>{transaksi.detail_transaksi[0].total_harga}</td>
                                <td className='p-5 flex'>
                                    <div>
                                        <Link className='border-2 border-gray-200 py-3 px-5 text-black rounded-lg hover:bg-blue hover:text-white  duration-300 font-semibold' to={`/konfirmasi_pilih_transaksi/${transaksi.id}`}>Pilih</Link>
                                    </div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='mt-10'>
                        <Link className='bg-blue py-3 px-5 text-white rounded-lg hover:bg-darkBlue duration-300 font-semibold' to='/transaksi'>Kembali</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
      )
}

export default TransaksiKonfirmasi
