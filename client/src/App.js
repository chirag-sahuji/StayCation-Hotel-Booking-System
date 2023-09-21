import { Route, Routes,Redirect, Navigate } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/SignUp/Signup';
import axios from 'axios';
import HotelList from './Pages/HotelList/HotelList';
import HotelDetail from './Pages/HotelDetail/HotelDetail';

function App() {
  return (
    <div>
      
        <Routes>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/signup' element={<Signup />} />
          <Route path='*' element={<Navigate to='/home' />} />
          <Route exact path='/hotels' element={<HotelList />} />
          <Route exact path='/hotels/:id' element={<HotelDetail />} />
        </Routes>
    </div>
  );
}

export default App;

