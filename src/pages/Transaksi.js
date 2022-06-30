import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Transaksi() {

    let [transaksi, setTransaksi] = useState([]);
    let [isModal, setIsmodal] = useState(false);
    let [idTransaksi, setIdTransaksi] = useState();
    let [status, setStatus] = useState();
    let navigate = useNavigate()

    function fetchTransaksi(){
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
    }

    useEffect(() => {
        if(sessionStorage.getItem('isLogin') != "Login"){
            navigate('/')
          }
          fetchTransaksi()
            // console.log(transaksi[0].member.id)
    }, [])

    function muncul(status,id) {
        setIsmodal(true)
        setStatus(status)
        setIdTransaksi(id)
    }

    function hilang() {
        setIsmodal(false)
    }

    function UbahStatus(e){
        e.preventDefault()
        setIsmodal(false)
        let data = {
            status : status
        }
        axios.put(`http://localhost:8080/transaksi/ubah-status/${idTransaksi}`, data, {
            headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
        })
        .then(res => {
            hilang()
            fetchTransaksi()
        })
    }

    return (
        <div>
            <Navbar />
            <div id="defaultModal" tabindex="-1" aria-hidden="true" class={`${isModal ? '' : 'hidden'} px-96 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}>
                <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                     <div class="relative bg-white rounded-lg shadow-lg ">
                        <div class="flex justify-between items-start p-4 rounded-t">
                            <h3 class="text-xl font-semibold text-black">
                                Ubah Status Pembayaran
                            </h3>
                            <button onClick={hilang} type="button" class="text-gray-400 bg-transparent hover:bg-red hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center duration-300" data-modal-toggle="defaultModal">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                            </button>
                        </div>
                        <div class="p-6 space-y-6">
                            <select value={status} onChange={(e) => setStatus(e.target.value) }>
                                <option value='' selected>Pilih</option>
                                <option value="baru">baru</option>
                                <option value="proses">proses</option>
                                <option value="selesai">selesai</option>
                                <option value="diambil">diambil</option>
                            </select>
                        </div>
                        <div class="flex items-center p-6 space-x-2 rounded-b ">
                            <button onClick={UbahStatus} data-modal-toggle="defaultModal" type="button" class="text-white bg-blue rounded-lg border text-sm font-medium px-5 py-2.5 hover:bg-darkBlue duration-300">Ubah</button>
                            <button onClick={hilang} data-modal-toggle="defaultModal" type="button" class="text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:text-red duration-300">Batal</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-20 mt-20 font-sourceSans'>
                <h1 className='text-xl font-semibold'>Laman Pengelola Transaksi</h1>
                <div className='mt-10'>
                    <table className='w-full'> 
                        <thead className=' border-b-2 border-gray-200 text-left'>
                            <th className='p-5'>Nama</th>
                            <th className='p-5'>Invoice</th>
                            <th className='p-5'>Status</th>
                            <th className='p-5'>Status Pembayaran</th>
                            <th className='p-5'>Total Harga</th>
                            <th className='p-5'>Aksi</th>
                        </thead>
                        <tbody>
                            {transaksi?.map((transaksi) => (
                            <tr key={transaksi.id} className=' border-b-2 border-gray-200 text-left hover:bg-gray-100 duration-300'>
                                <td className='p-5'>{transaksi.member.nama}</td>
                                <td className='p-5'>{transaksi.kode_invoice}</td>
                                <td onClick={() => muncul(transaksi.status, transaksi.id)} className='p-5 cursor-pointer'>{transaksi.status}</td>
                                <td className='p-5'>{transaksi.dibayar}</td>
                                <td className='p-5'>{transaksi.detail_transaksi[0].total_harga}</td>
                                <td className='p-5 flex'>
                                    <div>
                                        <Link className='border-2 border-gray-200 py-3 px-5 text-black rounded-lg hover:bg-blue hover:text-white  duration-300 font-semibold' to={`/detail_transaksi/${transaksi.id}`}>Detail</Link>
                                    </div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='mt-10'>
                        <Link className='bg-blue py-3 px-5 text-white rounded-lg hover:bg-darkBlue duration-300 font-semibold' to='/tambah_transaksi'>Tambah</Link>
                        <Link className='py-3 px-5 text-black rounded-lg hover:text-blue duration-300 font-semibold' to='/konfirmasi_transaksi'>Konfirmasi</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
      )
}

export default Transaksi