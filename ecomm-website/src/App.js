import './App.css'
import React from "react"
import Navbar from "./components/Navbar"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Products from "./components/ProductList"
import Home from "./components/Home"
import Profile from "./components/Profile"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import Footer from "./components/Footer"
import PrivateComponent from './components/PrivateComponent'
import Cart from './components/Cart'
import Location from './components/Location'
import Final from './components/Final'


export default function App(){
  return (
    <div className='main'>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<PrivateComponent/>}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path='/location' element={<Location />}></Route>
        <Route path='/location' element={<Location />}></Route>
        <Route path='/final' element={<Final />}></Route>
        </Route>
        <Route path="/SignUp" element={<SignUp/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}