import { Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react'
import HomePage from './components/pages/HomePage';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Policy from './components/pages/Policy';
import PageNotFound from './components/pages/PageNotFound';
import Register from './components/pages/Auth/Register';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/pages/Auth/Login';
import Dashboard from './components/pages/user/Dashboard';
import { PrivateRoute } from './components/Routes/Private';
import ForgotPassword from './components/pages/Auth/ForgotPassword';
import { AdminRoute } from './components/Routes/AdminRoute';
import AdminDashboard from './components/pages/Admin/AdminDashboard';
import CreateCategory from './components/pages/Admin/CreateCategory';
import Users from './components/pages/Admin/Users';
import CreateProduct from './components/pages/Admin/CreateProduct';
import Profile from './components/pages/user/Profile';
import Orders from './components/pages/user/Orders';
import Products from './components/pages/Admin/Products';
import UpdateProduct from './components/pages/Admin/UpdateProduct';
import Search from './components/pages/Search';
import ProductDetails from './components/pages/ProductDetails';
import Categories from './components/pages/Categories';
import CategoryProduct from './components/pages/CategoryProduct';
import CartPage from './components/pages/CartPage';
import AdminOrders from './components/pages/Admin/AdminOrders';
const App = () => {
  return (
    <>
   <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/product/:slug' element={<ProductDetails/>}/>
    <Route path='/categories' element={<Categories/>}/>
    <Route path='/category/:slug' element={<CategoryProduct/>}/>
    <Route path='/cart' element={<CartPage/>}/>
    <Route path='/search' element={<Search/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/forgot-password' element={<ForgotPassword/>}/>
   
   
   
    <Route path='/dashboard' element={<PrivateRoute/>}>
      <Route path='user' element={<Dashboard/>}/>
      <Route path='user/orders' element={<Orders/>}/>
      <Route path='user/profile' element={<Profile/>}/>
    </Route>
    <Route path='/dashboard' element={<AdminRoute/>}>
      <Route path='admin' element={<AdminDashboard/>}/>
      <Route path='admin/create-category' element={<CreateCategory/>}/>
      <Route path='admin/create-product' element={<CreateProduct/>}/>
      <Route path='admin/products' element={<Products/>}/>
      <Route path='admin/product/:slug' element={<UpdateProduct/>}/>
      <Route path='admin/users' element={<Users/>}/>
      <Route path='admin/orders' element={<AdminOrders/>}/>
    </Route>


    {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
    <Route path='/about' element={<About/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/policy' element={<Policy/>}/>
    <Route path='/*' element={<PageNotFound/>}/>
   </Routes>
    </>
  )
}

export default App


