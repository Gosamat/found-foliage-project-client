import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "https://found-foliage-server.onrender.com";


function DeleteGardenModal({ isOpen, onClose, fetchPlants }) {
  const { onOpen, onOpenChange } = useDisclosure();

  const navigate = useNavigate();

  // Update the modal's visibility based on the isOpen prop
  React.useEffect(() => {
    if (isOpen) {
      onOpen();
    } else {
      onOpenChange();
    }
  }, [isOpen]);


  const deleteGarden = ()=>{
    const storedToken = localStorage.getItem("authToken");


    axios.delete(`${API_URL}/garden/delete`,  {
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
              <ModalHeader className="flex flex-col gap-1">Are you sure you want to delete your garden?</ModalHeader>
           
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button color="primary" onPress={
                deleteGarden}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteGardenModal;