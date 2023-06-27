import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Signup from './pages/Signup'



function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
