import React from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react';


function PlantDetailsPage() {
  const API_URL = "http://localhost:5005";
    const {plantId} = useParams();
    const [plant, setPlant] = useState(null)

    useEffect(() => {
        axios.get(`${API_URL}/garden/${plantId}`).
        then((response)=>{
            setPlant(response.data);
        }).catch((err)=> console.log(err))
    }, [plantId])


  return (
    
    <div>
      <div>PlantDetailsPage</div>
      {plant && 
      <div>
        <h1>{plant.commonName}</h1>
        <img src={plant.imgUrl} alt={plant.commonName} />
        <p>Species: {plant.scientificName}</p>
        <p>Description: {plant.cycle}</p>
        <Link to="/garden">Back to Garden</Link>
      </div>}

    </div>
  )
}

export default PlantDetailsPage