import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Books from './screens/Books';
import BookDetail from './screens/BookDetail';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const [light, setLight] = useState(true)
  const toggleLight = () => {
    setLight(!light)
  }
  return (
    <div className={`${light ? '' : 'dark'} dark: bg-slate-90`} >
    <ToastContainer position='top-center' autoClose={1000}/>
      <Header light={light} toggleLight={toggleLight}/>
      <Routes>
        <Route path='/' element={<Books />}/>
        <Route path='/:category' element={<Books />}/>
        <Route path='/book/:id' element={<BookDetail />}/>
      </Routes>
    </div>
  )
}

export default App
