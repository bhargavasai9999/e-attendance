import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  
<Router>
    <Toaster position='top-right' reverseOrder={false} duration={8000} />

    <App />
  </Router>,
)
