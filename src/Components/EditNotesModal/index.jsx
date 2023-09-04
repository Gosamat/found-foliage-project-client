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
  Textarea
} from "@nextui-org/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const API_URL = "http://localhost:5005";


function EditNotesModal({ isOpen, onClose, fetchPlants, selectedPlant }) {
  const { onOpen, onOpenChange } = useDisclosure();
  const [plantNotes, setPlantNotes] = useState("");

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
    const updatedPlant = {notes: plantNotes};

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
        backdrop="opaque"
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
            <ModalHeader className="flex flex-col gap-1">Edit Plant Name</ModalHeader>
            <ModalBody>
    
              <Textarea
      label="Description"
      labelPlacement="outside"
      placeholder= {selectedPlant.notes === "" ? "Add a description" : selectedPlant.notes}
      className="max-w-xs"
      onChange={(e) => setPlantNotes(e.target.value)}

    />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={UpdatePlantName}>
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

export default EditNotesModal;