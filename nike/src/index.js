import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './Home';
import Header from './Header';
import Register1 from './Components/Register/Register1';
import Login1 from './Components/Login/Login1';
import Admin_login1 from './Components/Admin/Admin_login1';
import Dashboard from './Components/Admin/Dashboard';
import ShoesCategory from './ShoesCategory';
import ProductDetailWrapper from './ProductDetailWrapper';
import Manage_products from './Components/Admin/Manage_product';
import Add_products from './Components/Admin/Add_product';
import Edit_products from './Components/Admin/Edit_Product';
import Manage_users from './Components/Admin/Manage_users';
import Edit_Users from './Components/Admin/Edit_Users';
import Manage_categories from './Components/Admin/Manage_categories';
import View_cart from './View_cart';
import Checkout from './Checkout';
import Order_confirm from './Order_confirm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/header' element={<Header />} />
        <Route exact path="/register" element={<Register1 />} />
        <Route exact path='/login' element={<Login1 />} />
        <Route exact path='/shoes-category' element={<ShoesCategory />} />
        <Route exact path='/product-details/:id' element={<ProductDetailWrapper />} />
        <Route exact path='/admin-login' element={<Admin_login1 />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
        <Route exact path="/manage-products" element={<Manage_products />} />
        <Route exact path="/add_products" element={<Add_products />} />
        <Route exact path="/edit_products/:id" element={<Edit_products />} />
        <Route export path='/manage-users' element={<Manage_users />} />
        <Route export path='/edit-users/:id' element={<Edit_Users />} />
        <Route export path='/manage-categories' element={<Manage_categories />} />
        <Route export path='/view-cart/:shoes_id' element={<View_cart />} />
        <Route export path='/checkout/:id' element={<Checkout />} />
        <Route export path='/order' element={<Order_confirm />} />

      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
