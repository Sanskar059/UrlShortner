import { useState } from 'react'
import { Route , Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import ShortenerPage from './pages/Shorturl'
import Allurls from './pages/Allurls'

function App() {
  

  return (
   <div>
<Routes>
  <Route path='/login' element = {<Login />} />
   <Route path='/signup' element = {<Signup />} />
    <Route path='/' element = {<Home />} />
    <Route path='/urlshrt' element = {<ShortenerPage/>} />
     <Route path='/all' element = {<Allurls/>} />
</Routes>
   </div>
  )
}

export default App
