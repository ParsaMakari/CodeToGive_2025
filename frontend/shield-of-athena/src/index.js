import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./i18n";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import DonationPage from './pages/DonationPage';
import Register from './components/UserRegister';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      {/* <Route path='/' element={<App/>}/> */}
      <Route path='/' element={<HomePage/>} />
      <Route path='/donate' element={<DonationPage/>} />
      <Route path='/auth' element={<Register/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
