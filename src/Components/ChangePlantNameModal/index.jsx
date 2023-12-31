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

const API_URL = "https://found-foliage-server.onrender.com";


function ChangePlantNameModal({ isOpen, onClose, fetchPlants, selectedPlant }) {
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


  const UpdatePlantName = ()=>{
    const storedToken = localStorage.getItem("authToken");
    const updatedPlant = {commonName: plantName};

    axios.put(`${API_URL}/garden/${selectedPlant._id}/edit`, updatedPlant,{
        headers: { Authorization: `Bearer ${storedToken}` },
      }). then(() => {
        onClose();
        fetchPlants();
    })
      .catch((err) => {
        console.log(err);
      });
    }

  return (
    <>
      {/* No need to use onOpen from useDisclosure, use isOpen from props */}
      <Modal
        classNames={{
              body: "py-6",
              backdrop: "bg-[#ebdbbf]/50 backdrop-opacity-90",
              base: "border-[#ebdbbf] bg-[#eae0cf] dark:bg-[#ebdbbf] text-[#000000]",
              header: "border-b-[1px] border-[#ebdbbf]",
              footer: "border-t-[1px] border-[#ebdbbf]",
              closeButton: "hover:bg-white/5 active:bg-white/10",
            }}
        backdrop="blur"
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
        <ModalContent>
          {(onClose) => (
            <>
            <ModalHeader className="flex flex-col">Edit Plant Name</ModalHeader>
            <ModalBody>
              {/* Add input fields and logic for editing the plant name */}
              {/* You can use useState to manage the input value */}
              <Input
                label="Plant Name"
                placeholder={selectedPlant.commonName}
                type="text"
                name="name"
                onChange={(e) => setPlantName(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="success" onPress={UpdatePlantName}>
                Change
              </Button>
            </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ChangePlantNameModal;