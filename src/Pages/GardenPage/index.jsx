import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from '../../Context/Auth.Context';

const API_URL = "http://localhost:5005";



function GardenPage() {
  const [garden, setGarden] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken")
    axios
      .get(`${API_URL}/garden`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
      .then((response) => {setGarden(response.data)
})
      .catch((error) =>
        console.log(
          "error while grabbing plants in user's garden from API: ",
          error
        )
      );
  }, []);


  return (
    <div>
      <h1>GardenPage</h1>
      <div>
       {garden && garden.plants.map((plant) => {
          return (
            <div key={plant._id}>
              <h2>{plant.commonName}</h2>
              <h2>{plant.scientificName}</h2>
              <h2>{plant.cycle}</h2>
              <h2>{plant.sunlight}</h2>
              <h2>{plant.watering}</h2>
              <img src={plant.imgUrl} alt={plant.commonName} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GardenPage;
