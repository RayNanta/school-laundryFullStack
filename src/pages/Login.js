import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import fotoLogin from '../images/fotoLogin.jpg'
import wave from '../images/wave.svg'
import axios from 'axios'

function Login() {

  let [username, setUsername] = useState([])
  let [password, setPassword] = useState([])
  let navigate = useNavigate()

  function Submit(event){
    event.preventDefault()
    let url = "http://localhost:8080/user/auth"
    // console.warn(username, password)

    let data = {
      username: username,
      password: password,
    }

    axios.post(url, data)
    .then(res => {
      console.log(res.data);
      if(JSON.stringify(res.data.logged) == "true" ){
        sessionStorage.setItem('token', res.data.token)
        sessionStorage.setItem('nama', res.data.data.nama)
        sessionStorage.setItem('role', res.data.data.role)
        sessionStorage.setItem('id_user', res.data.data.id)
        sessionStorage.setItem('id_outlet', res.data.data.outlet.id)
        sessionStorage.setItem('nama_outlet', res.data.data.outlet.nama)
        sessionStorage.setItem('isLogin', "Login")
        navigate('/home')
      }else{
        window.confirm("Username atau Password salah, silahkan coba lagi!")
      }
    })
    .catch(error => {
      console.log(error)
    })
  }


  return (
    <div>
      <div className="flex font-sourceSans">
        <div className="w-1/2">
            <img className='object-cover h-screen' src={fotoLogin} alt="foto-login" />
        </div>
        <form onSubmit={Submit} className="w-1/2 p-16 my-auto">
            <h1 className='font-bold text-4xl flex'>Welcome Back!<img className='ml-2 w-8' src={wave}/></h1>
            <p className='mt-5 max-w-md font'>Selamat datang di LaundryMu. Silahkan masukkan Username dan Password anda pada form yang telah tersedia dibawah ini!</p>
            <h3 className='font-bold mt-7'>Username:</h3>
            <input onChange={(e) => setUsername(e.target.value)} value={username} type="username" placeholder='Masukkan Username' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400' required></input>
            <h3 className='font-bold mt-7'>Password:</h3>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Masukkan Password' className='border-solid border-2 p-3 rounded-md focus:outline-none focus:border-blue mt-3 w-full duration-300 text-gray-400' required></input>
            <div>
              <button type='submit' className='bg-blue text-white p-3 rounded-lg mt-10 w-full font-bold hover:bg-darkBlue duration-300'>Login</button>
            </div>
            <p className='text-center mt-5 text-gray-400'>Lupa Passoword? Klik <a className='text-blue' href="#">Link Berikut!</a></p>
        </form>

      </div>
    </div>
  )
}

export default Login