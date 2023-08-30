import React from "react";
import { useState } from "react";
import axios from "axios";

const PLANTNET_KEY = "2b10VpTk0sBhhNvolJI73EN";
const TREFFLE_KEY = "Rlx_rV2GsFgrREw2qDx2viNV54c6WPXoe1LXqtTkXzM";

function AddPlantPage() {
  const [plant, setPlant] = useState({});
  const [image, setimage] = useState("");

  const handleSubmit = (e) => {
    console.log(image);
    axios
      .get(
        `https://my-api.plantnet.org/v2/identify/all?images=${image}&include-related-images=false&no-reject=false&lang=en&api-key=${PLANTNET_KEY}`
      )
      .then((res) => {
        const plantName =
          res.data.results[0].species.scientificNameWithoutAuthor;
          console.log(res.data);

        axios
          .get(
            `https://trefle.io/api/v1/plants/search?token=${TREFFLE_KEY}&q=${plantName}`
          )
          .then((res) => {
            const plantInfo = res.data[0];
            setPlant(plantInfo);
          });
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

      </div>
    </div>
  );
}

export default AddPlantPage;
