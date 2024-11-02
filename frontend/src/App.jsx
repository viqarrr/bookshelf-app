import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Books from './screens/Books';
import BookDetail from './screens/BookDetail';
import Header from './components/Header';

function App() {
  const [light, setLight] = useState(true)
  const toggleLight = () => {
    setLight(!light)
  }
  return (
    <div className={`${light ? '' : 'dark bg-slate-90'}`} >
      <Header light={light} toggleLight={toggleLight}/>
      <Routes>
        <Route path='/books' element={<Books />}/>
        <Route path='/books/:id' element={<BookDetail />}/>
      </Routes>
    </div>
  )
}

export default App
