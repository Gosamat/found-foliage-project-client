import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'


const API_URL = "https://found-foliage-server.onrender.com";

function PlantDetailsModal({ isOpen, onClose, fetchPlants, selectedPlant }) {
  const { onOpen, onOpenChange } = useDisclosure();
  const [plantName, setPlantName] = useState("");

  const navigate = useNavigate();

  // Update the modal's visibility based on the isOpen prop
  React.useEffect(() => {
    if (isOpen) {
      onOpen();
    } else {
      onOpenChange();
    }
  }, [isOpen]);

  const UpdatePlantName = () => {
    const storedToken = localStorage.getItem("authToken");
    const updatedPlant = { commonName: plantName };

    axios
      .put(`${API_URL}/garden/${selectedPlant._id}/edit`, updatedPlant, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        onClose();
        fetchPlants();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/* No need to use onOpen from useDisclosure, use isOpen from props */}
      <Modal
        backdrop="blur"
        size="4xl"
        isOpen={isOpen}
        onOpenChange={() => {
          onClose(); // Call the onClose function passed from the parent
        }}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        className=" w-screen"
      >
        {/*         <ModalContent>
          {(onClose) => (
            <>
            <ModalHeader className="flex flex-col gap-1">{selectedPlant.commonName}</ModalHeader>
            <ModalBody>
            <img
          alt="Card background"
          className="object-cover rounded-xl"
          src={selectedPlant.imgUrl}
          width={570}
          height={570}
        />
        <h3>Scientific name: {selectedPlant.scientificName}</h3>
        <h3>Sunlight: {selectedPlant.sunlight}</h3>
        <h3>Watering:{selectedPlant.watering} </h3>
            </ModalBody>
            <ModalFooter>
            
              <Button color="primary" onPress={onClose}>
                close
              </Button>
            </ModalFooter>
            </>
          )}
        </ModalContent> */}
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex flex-row gap-1 m-3">
                <div className="details-image flex flex-col justify-center">
                  <img
                    alt="Card background"
                    className="object-cover rounded-xl  w-full h-64 shadow-sm"
                    src={selectedPlant.imgUrl}
                   
                  />
                  <div className="flex flex-col gap-1 w-10 text-sm" >
                  <div className="flex flex-row">

                  
                    <div>{selectedPlant.watering ? <img/> : <img/>}</div>
                    <div>{selectedPlant.sunlight ? <img/> : <img/>}</div>
                    <div>{selectedPlant.poisonous_to_humans ? <FontAwesomeIcon icon={faSkullCrossbones} style={{color: "#454545",}} className=" opacity-80" />: <FontAwesomeIcon icon={faSkullCrossbones} />}</div>
                    <div>{selectedPlant.cuisine ? <img/> : <img/>}</div>
                    </div>
                    <div className="flex flex-row">
                    <div>{selectedPlant.maintenance ? <img src=""/> : <img src=""/>}</div>
                    <div>{selectedPlant.indoor ? <img src=""/> : <img src=""/>}</div>
                    <div>{selectedPlant.medicinal ? <img src=""/> : <img src=""/>}</div>
                    <div>{selectedPlant.flowering_season ? <img src=""/> : <img src=""/>}</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-2/3">
                  <div>
                    <h1>{selectedPlant.commonName}</h1>
                    <h5>{selectedPlant.scientificName}</h5>
                  </div>
                   <div className="text-sm">{selectedPlant.description}</div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default PlantDetailsModal;
