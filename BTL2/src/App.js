import './App.css';
import React,{useState} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import ShopPage from './shopPage';
import AddProduct from './addProduct';
import UpdateProduct from './updateProduct';
import OrderPage from './orderPage';
import LogIn from './login'
import OrderPageTotal from './orderPageTotal';
import Report from './report';

function App() {
  return (
    <div className="App"> 
      <BrowserRouter>
        <Routes>
          <Route path="/shopPage" element={<ShopPage/>} />
          <Route path="/orderPage/:orderId" element={<OrderPage/>} />
          <Route path="/updateProduct/:productId" element={<UpdateProduct/>} />
          <Route path="/addProduct" element={<AddProduct/>} />
          <Route path="/login" element={<LogIn/>} />
          <Route path="/orderPageTotal" element={<OrderPageTotal/>} />
          <Route path="/report" element={<Report/>} />
          <Route index element={<LogIn/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
