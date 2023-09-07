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
        classNames={{
              body: "py-6",
              backdrop: "bg-[#ebdbbf]/50 backdrop-opacity-90",
              base: "border-[#ebdbbf] bg-[#eae0cf] dark:bg-[#ebdbbf] text-[#000000]",
              header: "border-b-[1px] border-[#ebdbbf]",
              footer: "border-t-[1px] border-[#ebdbbf]",
              closeButton: "hover:bg-white/5 active:bg-white/10",
            }}
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
                <Button color="success" variant="flat" onPress={onClose}>
                  No
                </Button>
                <Button color="danger" onPress={
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