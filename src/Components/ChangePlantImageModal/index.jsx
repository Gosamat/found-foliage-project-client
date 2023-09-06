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
  Image
} from "@nextui-org/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

const API_URL = "https://found-foliage-server.onrender.com";


function ChangePlantImageModal({ isOpen, onClose, fetchPlants, selectedPlant }) {
  const { onOpen, onOpenChange } = useDisclosure();
  const [plantImage, setPlantImage] = useState(null);
  const inputRef = useRef(null);


  const handleClick = () => {
    inputRef.current.click();
  };

  const navigate = useNavigate();

  // Update the modal's visibility based on the isOpen prop
  React.useEffect(() => {
    if (isOpen) {
      onOpen();
    } else {
      onOpenChange();
    }
  }, [isOpen]);


  const UpdatePlantImage = async (e)=>{
    const storedToken = localStorage.getItem("authToken");
   

    try{
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("upload_preset", "ayjz2x5r");

    const cloudinaryResponse = await axios.post(
      "https://api.cloudinary.com/v1_1/foundfoliage/image/upload",
      formData
    );

    const imageUrl = cloudinaryResponse.data.url;

    const updatedPlant = {imgUrl: imageUrl};

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
    catch(err){
      console.log(err);
    }
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
            <ModalHeader className="flex flex-col gap-1">Edit Plant Image</ModalHeader>
            
            <ModalBody>
              {/* Add input fields and logic for editing the plant name */}
              {/* You can use useState to manage the input value */}
              
              <input
                type="file"
                variant="bordered"
                name="file"
                style={{ display: "none" }}
                ref={inputRef}
                onChange={(e) => UpdatePlantImage(e)}
              />
              <img
          alt="Card background"
          className="object-cover rounded-xl"
          src={selectedPlant.imgUrl}
          width={570}
          height={570}
        />
              {/* <Input
          style={{ display: "none" }}
          ref={inputRef}
          type="file"
          onChange={(e) => {
            handleFormSubmit(e);
          }}
        /> */}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleClick}>
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

export default ChangePlantImageModal;