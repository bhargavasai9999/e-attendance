import { Route, Routes} from 'react-router-dom';
import { Login } from './components/adminPage/Authentication/Login';
import { ForgotPassword } from './components/adminPage/Authentication/ForgotPassword';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/resetpassword/:token' Component={ForgotPassword}/>
    </Routes>
    </>
  )
}
export default App;
