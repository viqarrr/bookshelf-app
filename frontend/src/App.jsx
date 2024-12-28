import './App.css'
import { Routes, Route } from "react-router-dom";
import Books from './screens/Books';
import BookDetail from './screens/BookDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  console.log(import.meta.env.VITE_BASE_URL)
  return (
    <div className={`dark: bg-slate-90`} >
    <ToastContainer position='top-center' autoClose={1000}/>
      <Header/>
      <Routes>
        <Route path='/' element={<Books />}/>
        <Route path='/:category' element={<Books />}/>
        <Route path='/book/:id' element={<BookDetail />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
