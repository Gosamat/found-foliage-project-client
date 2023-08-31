import React from "react";
import { useState } from "react";
import axios from "axios";

const PLANTNET_KEY = "2b10VpTk0sBhhNvolJI73EN";
const PERENUAL_KEY = "sk-LWNZ64d4a282ae0b61825";

function AddPlantPage() {
  const [plant, setPlant] = useState(null);
  const [image, setimage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(image);
    axios
      .get(
        `https://my-api.plantnet.org/v2/identify/all?images=${image}&include-related-images=false&no-reject=false&lang=en&api-key=${PLANTNET_KEY}`
      )
      .then((res) => {
        const plantName =
          res.data.results[0].species.scientificNameWithoutAuthor;
          console.log(res.data.results[0])
        console.log(plantName);
        axios
          .get(
            `https://perenual.com/api/species-list?key=${PERENUAL_KEY}&q=${plantName}`
          )
          .then((res) => {
            const plantInfo = res.data.data[0];
            setPlant(plantInfo);
            console.log(plantInfo);
          });
      })
      .catch((err) => {
        console.log("error while fetching plant info: ", err);
      });
  };

  return (
    <div>
      <h1>Add Plant Page</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={(e) => setimage(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        {plant && 
        <div>
        <h1>{plant.common_name}</h1>
        <h3>{plant.cycle}</h3>
        <h3>{plant.sunlight}</h3>
        <h3>{plant.watering}</h3>
        </div>}
      </div>
    </div>
  );
}

export default AddPlantPage;
