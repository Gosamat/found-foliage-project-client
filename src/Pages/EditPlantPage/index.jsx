import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function EditPlantPage() {
  const API_URL = "https://found-foliage-server.onrender.com";
  const { plantId } = useParams();
  const [plant, setPlant] = useState(null);
  const [commonName, setCommonName] = useState("");
  const [notes, setNotes] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/garden/${plantId}`)
      .then((response) => {
        console.log(response.data);
        setPlant(response.data);
      })
      .catch((err) => console.log(err));
  }, [plantId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatePlant;
    if (imgUrl === "") {
      console.log("no image");
      updatePlant = {
        commonName: commonName,
        notes: notes,
      };
    } else {
      console.log("received image");
      updatePlant = {
        commonName: commonName,
        notes: notes,
        imgUrl: imgUrl,
      };
    }

    axios
      .put(`${API_URL}/garden/${plantId}/edit`, updatePlant)
      .then(() => navigate(`/garden`))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {plant && (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <form onSubmit={handleSubmit}>
            <img src={plant.imgUrl} alt={plant.commonName} name="imgUrl" />
            <Input
              type="text"
              label="imgUrl"
              name = "imgUrl"
              onChange={(e) => {
                setImgUrl(e.target.value);
              }}
            />
            <Input
              type="text"
              label="commonName"
              name="commonName"
              placeholder={plant.commonName}
              onChange={(e) => {
                setCommonName(e.target.value);
              }}
            />
            <p>Species: {plant.scientificName}</p>
            <Input
              type="textarea"
              label="notes"
              name="notes"
              placeholder="Leave a note about your plant!"
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            />
            <Button
              color="danger"
              variant="flat"
              onPress={() => navigate("/garden")}
            >
              go Back
            </Button>
            <Button color="primary" type="submit">
              Save changes
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditPlantPage;
