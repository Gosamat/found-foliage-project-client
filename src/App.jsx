import './App.css'
import TopNavbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import SignUpPage from './Pages/SignUpPage'
import LoginPage from './Pages/LoginPage'
import UserCard from './Components/UserCard'
import PlantDetailsPage from './Pages/PlantDetailsPage'
import AddPlantPage from './Pages/AddPlantPage'
import GardenPage from './Pages/GardenPage'
import AboutPage from './Pages/AboutPage'
import IsAnon from "./Components/IsAnon"
import IsPrivate from "./Components/IsPrivate"
import EditPlantPage from './Pages/EditPlantPage'

function App() {

  return (
    <div>
     <TopNavbar/>
      <h1>Plant Finder and Virtual Garden App</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/signup" element={<IsAnon><SignUpPage /></IsAnon>} />
        <Route path="/auth/login" element={<IsAnon><LoginPage /></IsAnon>} />
        <Route path="/plant/add" element={<IsPrivate><AddPlantPage /></IsPrivate>} />
        <Route path="/garden/:plantId" element={<IsPrivate><PlantDetailsPage /></IsPrivate>} />
        <Route path="/garden/:plantId/edit" element={<IsPrivate><EditPlantPage /></IsPrivate>} />
        <Route path="/garden" element={<IsPrivate><GardenPage /></IsPrivate>} />
        <Route path="/about" element={<AboutPage />} />

      </Routes>
    </div>
  )
}

export default App
