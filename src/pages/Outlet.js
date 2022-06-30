import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Outlet() {

    let [outlet, setOutlet] = useState([]);
    let navigate = useNavigate()

    useEffect(() => {
      if(sessionStorage.getItem('isLogin') != "Login"){
        navigate('/')
      }
    },[])

    useEffect(() => {
        axios.get(`http://localhost:8080/outlet/`, {
            headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
        })
        .then(res => {
            console.log(res.data)
            setOutlet(res.data)
        })
        .catch(error => { 
          console.log(error)
        })
      }, [])

      function Delete (id) {
        let url = "http://localhost:8080/outlet/" + id
        if(window.confirm("Apakah Anda Yakin Untuk Menghapus Data?")){
            axios.delete(url, {
                headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
            })
            .then((response) => {
                outlet()
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
                <h1 className='text-xl font-semibold'>Laman Pengelola Outlet</h1>
                <div className='mt-10'>
                    <table className='w-full'> 
                        <thead className=' border-b-2 border-gray-200 text-left'>
                            <th className='p-5'>Nama Outlet</th>
                            <th className='p-5'>Alamat</th>
                            <th className='p-5'>Telepon</th>
                            <th className='p-5'>Aksi</th>
                        </thead>
                        <tbody>
                            {outlet.outlet?.map((outlet) => (
                            <tr key={outlet.id} className=' border-b-2 border-gray-200 text-left hover:bg-gray-100 duration-300'>
                                <td className='p-5'>{outlet.nama}</td>
                                <td className='p-5'>{outlet.alamat}</td>
                                <td className='p-5'>{outlet.tlp}</td>
                                <td className='p-5 flex'>
                                    <div>
                                        <Link className='border-2 border-gray-200 py-3 px-5 text-black rounded-lg hover:bg-blue hover:text-white  duration-300 font-semibold' to={`/edit_outlet/${outlet.id}`}>Edit</Link>
                                        <button onClick={() => Delete(outlet.id)} className='border-2 border-gray-200 py-3 px-5 ml-5 text-black rounded-lg hover:bg-red hover:text-white  duration-300 font-semibold'>Hapus</button>
                                    </div>
                                </td>
                            </tr>
                        ))}       
                        </tbody>
                    </table>
                    <div className='mt-10'>
                        <Link className='bg-blue py-3 px-5 text-white rounded-lg hover:bg-darkBlue duration-300 font-semibold' to='/tambah_outlet'>Tambah</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
      )
}

export default Outlet
