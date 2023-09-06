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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faHandHoldingHand } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faPrescriptionBottleMedical } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";

const API_URL = "https://found-foliage-server.onrender.com";

function PlantDetailsModal({ isOpen, onClose, fetchPlants, selectedPlant }) {
  const { onOpen, onOpenChange } = useDisclosure();
  const [plantName, setPlantName] = useState("");
  const [scrollBehavior, setScrollBehavior] = useState("inside");

  const navigate = useNavigate();

  // Update the modal's visibility based on the isOpen prop
  React.useEffect(() => {
    if (isOpen) {
      onOpen();
      console.log(selectedPlant);
    } else {
      onOpenChange();
    }
  }, [isOpen]);

  return (
    <>
      {/* No need to use onOpen from useDisclosure, use isOpen from props */}
      <Modal
        className="z-100"
        backdrop="blur"
        scrollBehavior={scrollBehavior}
        size="xl"
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
        {/* <ModalContent>
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
                    <div>{selectedPlant.poisonous_to_humans ?  <FontAwesomeIcon icon={faSkullCrossbones} style={{color: "#00d64b",}}/> : <FontAwesomeIcon icon={faSkullCrossbones} style={{color: "#454545",}} className=" opacity-80" />}</div>
                    <div>{selectedPlant.edible ? <FontAwesomeIcon icon={faUtensils} style={{color: "#00d64b",}} /> : <FontAwesomeIcon icon={faUtensils} style={{color: "#454545",}} className=" opacity-80" /> }</div>
                    </div>
                    <div className="flex flex-row">
                    <div>{selectedPlant.maintenance ? <FontAwesomeIcon icon={faHandHoldingHand} /> : <FontAwesomeIcon icon={faHandHoldingHand} />}</div>
                    <div>{selectedPlant.indoor ? <FontAwesomeIcon icon={faHouse} /> : <FontAwesomeIcon icon={faHouse} />}</div>
                    <div>{selectedPlant.medicinal ? <FontAwesomeIcon icon={faPrescriptionBottleMedical} /> : <FontAwesomeIcon icon={faPrescriptionBottleMedical} />}</div>
                    <div>{selectedPlant.flowering_season ? <FontAwesomeIcon icon={faCalendarDays} /> : <FontAwesomeIcon icon={faCalendarDays} />}</div>
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
        </ModalContent> */}
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1>{selectedPlant.commonName}</h1>
                <h5>{selectedPlant.scientificName}</h5>
              </ModalHeader>
              <img
                alt="Card background"
                className="object-cover rounded-xl  h-80 shadow-sm m-5"
                src={selectedPlant.imgUrl}
              />

              <ModalBody className="py-0 pb-5 h-24">
                <div>
                  <div className="flex flex-row justify-around mt-5">
                    {selectedPlant.watering ? (
                      <div className=" flex flex-col items-center">
                        <FontAwesomeIcon
                          icon={faDroplet}
                          style={{ color: "#0aa1ff" }}
                            className="w-6 h-6"
                        />
                        <h5>{selectedPlant.watering}</h5>
                      </div>
                    ) : (
                      <div className=" flex flex-col items-center">
                        <FontAwesomeIcon icon={faDroplet} style={{ color: "#454545" }}
                            className=" opacity-80 w-6 h-6" />
                        <h5>{selectedPlant.watering}</h5>
                      </div>
                    )}
                    {selectedPlant.sunlight ? (
                      <div className=" flex flex-col items-center">
                        <FontAwesomeIcon
                          icon={faSun}
                          style={{ color: "#ff9500" }}
                            className="w-6 h-6"
                        />
                        <h5>{selectedPlant.sunlight}</h5>
                      </div>
                    ) : (
                      <div className=" flex flex-col items-center">
                        <FontAwesomeIcon icon={faSun} style={{ color: "#454545" }}
                            className=" opacity-80 w-6 h-6"/> <h5>Poison</h5>
                      </div>
                    )}
                    <div>
                      {selectedPlant.poisonous ? (
                        <div className=" flex flex-col items-center">
                          <FontAwesomeIcon
                            icon={faSkullCrossbones}
                            style={{ color: "#00d64b" }}
                            className="w-6 h-6"
                          />
                          <h5>Poisonous</h5>
                        </div>
                      ) : (
                        <div className=" flex flex-col items-center">
                          <FontAwesomeIcon
                            icon={faSkullCrossbones}
                            style={{ color: "#454545" }}
                            className=" opacity-80 w-6 h-6"
                          />
                          <h5>Safe</h5>
                        </div>
                      )}
                    </div>
                    <div>
                      {selectedPlant.edible === "true" ? (
                        <div className=" flex flex-col items-center">
                          <FontAwesomeIcon
                            icon={faUtensils}
                            style={{ color: "#00d64b" }}
                            className="w-6 h-6"
                          />
                          <h5>Edible</h5>
                        </div>
                      ) : (
                        <div className=" flex flex-col items-center">
                          <FontAwesomeIcon
                            icon={faUtensils}
                            style={{ color: "#454545" }}
                            className=" opacity-80 w-6 h-6"
                          />
                          <h5>Unedible</h5>
                        </div>
                      )}
                    </div>
                    <div>
                      {selectedPlant.indoor ? (
                        <div className=" flex flex-col items-center">
                          <FontAwesomeIcon
                            icon={faHouse}
                            className="w-6 h-6"
                            style={{ color: "#00d64b" }}
                          />
                          <h5>Indoor</h5>
                        </div>
                      ) : (
                        <div className=" flex flex-col items-center">
                          <FontAwesomeIcon
                            icon={faHouse}
                            style={{ color: "#454545" }}
                            className=" opacity-80 w-6 h-6"
                          />
                          <h5>Outdoor</h5>
                        </div>
                      )}
                    </div>
                    <div>
                      {selectedPlant.care ? (
                        <div className=" flex flex-col items-center">
                          <FontAwesomeIcon
                            icon={faHandHoldingHand}
                            style={{ color: "#00d64b" }}
                            className="w-6 h-6"
                          />
                          <h5>{selectedPlant.care}</h5>
                        </div>
                      ) : (
                        <div className=" flex flex-col items-center">
                          <FontAwesomeIcon
                            icon={faHandHoldingHand}
                            style={{ color: "#454545" }}
                            className=" opacity-80 w-6 h-6"
                          />
                          <h5>{selectedPlant.care}</h5>
                        </div>
                      )}
                    </div>
                  </div>
                  <hr className="my-3 opacity-50" />
                  <div>
                    <h2>
                      <b> Description: </b>
                    </h2>
                    <h2 className="text-sm">{selectedPlant.description}</h2>
                  </div>
                  <hr className="my-3 opacity-50" />
                  <div>
                    <h2>
                      <b> Notes: </b>
                    </h2>
                    <h2 className="text-sm">{selectedPlant.notes}</h2>
                  </div>
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
