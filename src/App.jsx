import './App.css'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import SignUpPage from './Pages/SignUpPage'
import LoginPage from './Pages/LoginPage'

function App() {

  return (
    <div>
     <Navbar/>
      <h1>Plant Finder and Virtual Garden App</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
