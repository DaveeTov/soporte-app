import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify'; // ✅ ¡esta es la que te faltaba!
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
);
