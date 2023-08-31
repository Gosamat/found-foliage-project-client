import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";


const PLANTNET_KEY = "2b10VpTk0sBhhNvolJI73EN";
const PERENUAL_KEY = "sk-LWNZ64d4a282ae0b61825";

function AddPlantPage() {
  const [plant, setPlant] = useState(null);
  const [image, setimage] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [fetching, setFetching] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(image);
    axios
      .get(
        `https://my-api.plantnet.org/v2/identify/all?images=${image}&include-related-images=false&no-reject=false&lang=en&api-key=${PLANTNET_KEY}`
      )
      .then((res) => {
        const plantName =
          res.data.results[0].species.scientificNameWithoutAuthor;
        console.log(res.data.results[0]);
        console.log(plantName);
        axios
          .get(
            `https://perenual.com/api/species-list?key=${PERENUAL_KEY}&q=${plantName}`
          )
          .then((res) => {
            const plantInfo = res.data.data[0];
            setPlant(plantInfo);
            console.log(plantInfo);
            setFetching(false);
          });
      })
      .catch((err) => {
        console.log("error while fetching plant info: ", err);
      });
  };

  return (
    <div>
      <h1>Add Plant Page</h1>
      <div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
            setFetching(true);
          }}
        >
          <input type="text" onChange={(e) => setimage(e.target.value)} />
          <Button type="submit" onPress={onOpen}>
            Submit
          </Button>
        </form>
      </div>

      {fetching && image ? <h1>Loading...</h1>: (
        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
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
          classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
        >

          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Modal Title
                </ModalHeader>
                <ModalBody>
                  {plant && (
                    <div>
                      <h1>{plant.common_name}</h1>
                      <h3>{plant.cycle}</h3>
                      <h3>{plant.sunlight}</h3>
                      <h3>{plant.watering}</h3>
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

export default AddPlantPage;
