import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Laporan() {

    let [transaksi, setTransaksi] = useState([]);
    let navigate = useNavigate()

    useEffect(() => {
        if(sessionStorage.getItem('isLogin') != "Login"){
            navigate('/')
          }
          axios.get(`http://localhost:8080/transaksi/`, {
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

    function print(){
        // event.preventDefault()
        window.print()
    }

    return (
        <div>
            <Navbar />
            <div className='mx-20 mt-20 font-sourceSans'>
                <h1 className='text-xl font-semibold'>Laman Cetak Laporan</h1>
                <div className='mt-10'>
                    <table className='w-full'> 
                        <thead className=' border-b-2 border-gray-200 text-left'>
                            <th className='p-5'>Nama</th>
                            <th className='p-5'>Invoice</th>
                            <th className='p-5'>Status</th>
                            <th className='p-5'>Status Pembayaran</th>
                            <th className='p-5'>Total Harga</th>
                        </thead>
                        <tbody>
                            {transaksi?.map((transaksi) => (
                            <tr key={transaksi.id} className=' border-b-2 border-gray-200 text-left hover:bg-gray-100 duration-300'>
                                <td className='p-5'>{transaksi.member.nama}</td>
                                <td className='p-5'>{transaksi.kode_invoice}</td>
                                <td className='p-5'>{transaksi.status}</td>
                                <td className='p-5'>{transaksi.dibayar}</td>
                                <td className='p-5'>{transaksi.detail_transaksi[0].total_harga}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='mt-10'>
                        <button onClick={(e) => print()} className='bg-blue py-3 px-5 text-white rounded-lg hover:bg-darkBlue duration-300 font-semibold'>Cetak</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
      )
}

export default Laporan
