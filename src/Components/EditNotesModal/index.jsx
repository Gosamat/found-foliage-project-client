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

const API_URL = "https://found-foliage-server.onrender.com";


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
            <ModalHeader className="flex flex-col m-0">Edit Notes</ModalHeader>
            <ModalBody>
              <Textarea
      labelPlacement="outside"
      placeholder= {selectedPlant.notes === "" ? "Add a note" : selectedPlant.notes}
      className="max-w pt-0"
      onChange={(e) => setPlantNotes(e.target.value)}
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

export default EditNotesModal;