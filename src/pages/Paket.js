import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Paket() {

    let [paket, setPaket] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
      if(sessionStorage.getItem('isLogin') != "Login"){
        navigate('/')
      }
    },[])

    useEffect(() => {
        axios.get(`http://localhost:8080/paket/`, {
            headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
        })
        .then(res => {
            console.log(res.data)
            setPaket(res.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    function Delete (id){
        let url = "http://localhost:8080/paket/" + id
        if(window.confirm("Apakah Anda Yakin Untuk Menghapus Data?")){
            axios.delete(url, {
                headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
            })
            .then((response) => {
                paket()
            })
            .catch((error) => {
                console.log(error)
            })
        }
        window.location.reload(false);
    }


    return (
        <div>
            <Navbar />
            <div className='mx-20 mt-20 font-sourceSans'>
                <h1 className='text-xl font-semibold'>Laman Pengelola Paket</h1>
                <div className='mt-10'>
                    <table className='w-full'> 
                        <thead className=' border-b-2 border-gray-200 text-left'>
                            <th className='p-5'>Nama Paket</th>
                            <th className='p-5'>Jenis</th>
                            <th className='p-5'>Outlet</th>
                            <th className='p-5'>Harga</th>
                            <th className='p-5'>Aksi</th>
                        </thead>
                        <tbody>
                            {paket.paket?.map((paket) => (
                            <tr className=' border-b-2 border-gray-200 text-left hover:bg-gray-100 duration-300'>
                                <td className='p-5'>{paket.nama_paket}</td>
                                <td className='p-5'>{paket.jenis}</td>
                                <td className='p-5'>{paket.outlet.nama}</td>
                                <td className='p-5'>{paket.harga}</td>
                                <td className='p-5 flex'>
                                    <div>
                                        <Link className='border-2 border-gray-200 py-3 px-5 text-black rounded-lg hover:bg-blue hover:text-white  duration-300 font-semibold' to={`/edit_paket/${paket.id}`}>Edit</Link>
                                        <button onClick={() => Delete(paket.id)} className='border-2 border-gray-200 py-3 px-5 ml-5 text-black rounded-lg hover:bg-red hover:text-white  duration-300 font-semibold'>Hapus</button>
                                    </div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='mt-10'>
                        <Link className='bg-blue py-3 px-5 text-white rounded-lg hover:bg-darkBlue duration-300 font-semibold' to='/tambah_paket'>Tambah</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
      )
}

export default Paket
