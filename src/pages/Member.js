import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import axios from 'axios'

function Member() {

    let [member, setMember] = useState([]);
    let navigate = useNavigate()

    useEffect(() => {
      if(sessionStorage.getItem('isLogin') != "Login"){
        navigate('/')
      }
    },[])

    useEffect(() => {
        axios.get(`http://localhost:8080/member/`, {
            headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
        })
        .then(res => {
            console.log(res.data)
            setMember(res.data)
        })
        .catch(error => { 
          console.log(error)
        })
      }, [])

    function Delete (id) {
        let url = "http://localhost:8080/member/" + id
        if(window.confirm("Apakah Anda Yakin Untuk Menghapus Data?")){
            axios.delete(url, {
                headers : {'Authorization' : 'Bearer ' + sessionStorage.getItem('token')}
            })
            .then((response) => {
                console.log(response)
                window.location.reload(false);
                member()
            })
            .catch((error) => {
                console.log(error)
                if(window.confirm("Error boloo")){
                    window.location.reload(false);
                }
            })
        }
        // window.location.reload(false);
    }

    
    return (
        <div>
            <Navbar />
            <div className='mx-20 mt-20 font-sourceSans'>
                <h1 className='text-xl font-semibold'>Laman Pengelola Member</h1>
                <div className='mt-10'>
                    <table className='w-full'> 
                        <thead className=' border-b-2 border-gray-200 text-left'>
                            <th className='p-5'>Nama</th>
                            <th className='p-5'>Alamat</th>
                            <th className='p-5'>Jenis Kelamin</th>
                            <th className='p-5'>Telepon</th>
                            <th className='p-5'>Aksi</th>
                        </thead>
                        <tbody>
                            {member.member?.map((member) => (
                                    <tr key={member.id} className=' border-b-2 border-gray-200 text-left hover:bg-gray-100 duration-300'>
                                        <td className='p-5'>{member.nama}</td>
                                        <td className='p-5'>{member.alamat}</td>
                                        <td className='p-5'>{member.jenis_kelamin}</td>
                                        <td className='p-5'>{member.tlp}</td>
                                        <td className='p-5 flex'>
                                            <div>
                                                <Link className='border-2 border-gray-200 py-3 px-5 text-black rounded-lg hover:bg-blue hover:text-white duration-300 font-semibold' to={`/edit_member/${member.id}`}>Edit</Link>
                                                <button  onClick={() => Delete(member.id)} className='border-2 border-gray-200 py-3 px-5 ml-5 text-black rounded-lg hover:bg-red hover:text-white duration-300 font-semibold'>Hapus</button>
                                            </div>
                                        </td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='mt-10'>
                        <Link className='bg-blue py-3 px-5 text-white rounded-lg hover:bg-darkBlue duration-300 font-semibold' to='/tambah_member'>Tambah</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
            )
}

export default Member