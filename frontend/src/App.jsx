import { Navigate, Route, Routes} from 'react-router-dom';
import { Login } from './components/adminPage/Authentication/Login';
import { ForgotPassword } from './components/adminPage/Authentication/ForgotPassword';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <>
    <Toaster position='top-right' reverseOrder={false} />

    <Routes>
      <Route path='/*' element={<Navigate to='/login'/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/resetpassword/:token' Component={ForgotPassword}/>
    </Routes>
    </>
  )
}
export default App;
