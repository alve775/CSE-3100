// eslint-disable-next-line no-unused-vars
import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home/home.jsx'
import Header from './components/header/header.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import Verify from './pages/auth/Verify.jsx'
import Footer from "./components/footer/Footer";
import About from './pages/about/About.jsx'
//import Account from './pages/account/Account.jsx'
//import { UserData } from "./context/UserContext.jsx";
const App = () => {
  return <>
   <BrowserRouter>
      <Header/>
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
           {/*  <Route path="/account" element={<Account />} />  */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Verify />} />
      </Routes>
      <Footer />
   </BrowserRouter>

  </>

}

export default App