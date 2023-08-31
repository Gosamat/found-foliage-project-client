import './App.css'
import TopNavbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import SignUpPage from './Pages/SignUpPage'
import LoginPage from './Pages/LoginPage'
import UserCard from './Components/UserCard'
import OptionListbox from './Components/Listbox'
import PlantDetailsPage from './Pages/PlantDetailsPage'
import AddPlantPage from './Pages/AddPlantPage'
import GardenPage from './Pages/GardenPage'
import AboutPage from './Pages/AboutPage'

function App() {

  return (
    <div>
     <TopNavbar/>
      <h1>Plant Finder and Virtual Garden App</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/plant/add" element={<AddPlantPage />} />
        <Route path="/garden/:plantId" element={<PlantDetailsPage />} />
        <Route path="/garden" element={<GardenPage />} />
        <Route path="/about" element={<AboutPage />} />

      </Routes>
    </div>
  )
}

export default App
