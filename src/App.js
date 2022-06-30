import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import Member from './pages/Member'
import Outlet from './pages/Outlet'
import User from './pages/User'
import Paket from './pages/Paket'
import Transaksi from './pages/Transaksi'
import MemberTambah from './pages/MemberTambah';
import MemberEdit from './pages/MemberEdit';
import OutletTambah from './pages/OutletTambah'
import OutletEdit from './pages/OutletEdit';
import UserTambah from './pages/UserTambah';
import UserEdit from './pages/UserEdit';
import PaketTambah from './pages/PaketTambah';
import PaketEdit from './pages/PaketEdit';
import TransaksiDetail from './pages/TransaksiDetail';
import TransaksiTambah from './pages/TransaksiTambah';
import TransaksiPilih from './pages/TransaksiPilih';
import TransaksiKonfirmasi from './pages/TransaksiKonfirmasi';
import TransaksiPilihKonfirmasi from './pages/TransaksiPilihKonfirmasi';
import Laporan from './pages/Laporan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login/>} /> 
        <Route path="/home" exact element={<Home/>} /> 
        <Route path="/member" exact element={<Member/>} /> 
        <Route path="/outlet" exact element={<Outlet/>} /> 
        <Route path="/user" exact element={<User/>} /> 
        <Route path="/paket" exact element={<Paket/>} /> 
        <Route path="/transaksi" exact element={<Transaksi/>} /> 
        <Route path="/tambah_member" exact element={<MemberTambah/>} /> 
        <Route path="/edit_member/:id" exact element={<MemberEdit/>} /> 
        <Route path="/tambah_outlet" exact element={<OutletTambah/>} /> 
        <Route path="/edit_outlet/:id" exact element={<OutletEdit/>} /> 
        <Route path="/tambah_user" exact element={<UserTambah/>} /> 
        <Route path="/edit_user/:id" exact element={<UserEdit/>} /> 
        <Route path="/tambah_paket" exact element={<PaketTambah/>} /> 
        <Route path="/edit_paket/:id" exact element={<PaketEdit/>} /> 
        <Route path="/detail_transaksi/:id" exact element={<TransaksiDetail/>} /> 
        <Route path="/tambah_transaksi" exact element={<TransaksiTambah/>} /> 
        <Route path="/pilih_transaksi/:id" exact element={<TransaksiPilih/>} /> 
        <Route path="/konfirmasi_transaksi" exact element={<TransaksiKonfirmasi/>} /> 
        <Route path="/konfirmasi_pilih_transaksi/:id" exact element={<TransaksiPilihKonfirmasi/>} /> 
        <Route path="/laporan" exact element={<Laporan/>} />
      </Routes>
    </Router>
  );
}

export default App;
