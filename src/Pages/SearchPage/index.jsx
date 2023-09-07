import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Card,
  CardFooter,
  useDisclosure,
  Tooltip,
  Button,
} from "@nextui-org/react";

import { Modal } from "@nextui-org/react";
import { Link, useLocation, useParams } from "react-router-dom";

import PlantDetailsModal from "../../Components/PlantDetailsModal";
const API_URL = "https://found-foliage-server.onrender.com";

function SearchPage() {
  const [error, setError] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedPlant, setSelectedPlant] = useState(null); // Define selectedPlant
  const [openModal, setOpenModal] = useState(null); // State to track the open modal
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);

  const { slug } = useParams();

  useEffect(() => {
    const searchProduct = async () => {
      try {
        const data = await axios.get(`${API_URL}/search?q=${query}`);
        setUser(data.data);
      } catch (error) {
        setError(error.response?.data?.message);
      }
    };
    searchProduct();
  }, [query]);

  // Card centered position
  let cardList = null; // Initialize cardList as null

  if (user) {
    // If garden and garden.plants are defined and not empty, create cardList
    cardList = user.map((plant) => (
      <Tooltip
        key={plant._id}
        color="success"
        showArrow={true}
        content={plant.notes}
      >
        <Card
          className="border-none me-5 mb-5 w-52"
          key={plant._id}
          isFooterBlurred
          radius="lg"
        >
          <div
            className="rounded-xl h-52 bg-cover bg-center"
            style={{ backgroundImage: `url(${plant.imgUrl})` }}
          ></div>
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-white/80">{plant.commonName}</p>
            <Button
              onPress={() => openSpecificModal("PlantDetailsModal", plant)}
              className="bg-black/10 hover:bg-black/30 outline: none text-white/100 hover:border-transparent"
              variant="flat"
              radius="lg"
              size="sm"
            >
              Open
            </Button>
          </CardFooter>
        </Card>
      </Tooltip>
    ));
  }

  let containerClassName =
    "flex-wrap flex flex-row p-10 bg-slate-400 bg-opacity-10 mx-10 mb-5 rounded-2xl shadow-lg";

  if (cardList && cardList.length === 1) {
    containerClassName += " justify-start"; // Align to the left for a single card
  } else {
    containerClassName += " justify-center"; // Center the cards when there are multiple or none
  }

  // Function to open a specific modal
  const openSpecificModal = (modalIdentifier, plant) => {
    setOpenModal(modalIdentifier);
    setSelectedPlant(plant); // Set selectedPlant
    setCloseTooltip(true);
  };

  // Function to close the currently open modal
  const closeCurrentModal = () => {
    setOpenModal(null);
    setCloseTooltip(false);
  };

  return (
    <div className="garden-page-container noise h-screen">
      <div className="garden-page noise h-full">
        <div className="garden-container">
          <div>
            <div className="flex items-start"></div>
          </div>
          <div>
            <PlantDetailsModal
              isOpen={openModal === "PlantDetailsModal"} // Check if this modal should be open
              onClose={closeCurrentModal} // Close the current modal
              identifier="PlantDetailsModal" // Unique identifier/key for this modal
              selectedPlant={selectedPlant} // Pass selectedPlant
            />

            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              placement="top-center"
            ></Modal>
          </div>
          <div className="garden-text-container mx-5"></div>
        </div>
        <div className="boxes">
          <div className="user-details">
            <div className="title-container mx-10">
              <h1 className=" text-left mb-5"> Search Results</h1>
            </div>
          </div>

          <div className="plants-container">
            <div className={containerClassName}>
              {user &&
                user.map((plant) => {
                  return (
                    <Card
                      onPress={() =>
                        openSpecificModal("PlantDetailsModal", plant)
                      }
                      className="border-none me-5 mb-5 w-52"
                      key={plant._id}
                      isFooterBlurred
                      radius="lg"
                    >
                      <div
                        className="rounded-xl h-52 bg-cover bg-center"
                        style={{ backgroundImage: `url(${plant.imgUrl})` }}
                      ></div>
                      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                        <p className="text-tiny text-white/80">
                          {plant.commonName}
                        </p>
                        <Button
                        onPress={() =>
                                        openSpecificModal(
                                          "PlantDetailsModal",
                                          plant
                                        )
                                      }
                          className="bg-black/10 hover:bg-black/30 outline: none text-white/100 hover:border-transparent"
                          variant="flat"
                          radius="lg"
                          size="sm"
                        >
                          Open
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
            </div>
          </div>

          <div> </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
