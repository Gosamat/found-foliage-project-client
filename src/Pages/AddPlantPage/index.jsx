import React from "react";
import { useState, useContext, useEffect, useRef, useCallback } from "react";
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
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@nextui-org/react";
import WebcamCaptureModal from "../../Components/WebcamCaptureModal";


const PLANTNET_KEY = "2b10VpTk0sBhhNvolJI73EN";
const PERENUAL_KEY = "sk-LWNZ64d4a282ae0b61825";
const API_URL = "https://found-foliage-server.onrender.com";

function AddPlantPage() {
  const [scrollBehavior, setScrollBehavior] = useState("inside");

  const [commonName, setCommonName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [cycle, setCycle] = useState("");
  const [sunlight, setSunlight] = useState("");
  const [watering, setWatering] = useState("");
  const [edible, setEdible] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [poisonous, setPoisonous] = useState(false);
  const [indoor, setIndoor] = useState(false);
  const [description, setDescription] = useState("");
  const [medicinal, setMedicinal] = useState(false);
  const [flowering, setFlowering] = useState([]);
  const [image, setimage] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [fetching, setFetching] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [value, setValue] = React.useState(0);
  const inputRef = useRef(null);
  const [premiumPlant, setPremiumPlant] = useState(false);
  const [openModal, setOpenModal] = useState(null); // State to track the open modal
  const [premiumPlantModalOpen, setPremiumPlantModalOpen] = useState(false);
  const [notFoundModalOpen, setNotFoundModalOpen] = useState(false);

  /*   // Callback function to receive the captured image from WebcamImage
  const handleImageCapture = (imageSrc) => {
    setCapturedImage(imageSrc);
  }; */

  // Function to open a specific modal
  const openSpecificModal = (modalIdentifier) => {
    setOpenModal(modalIdentifier);
  };

  // Function to close the currently open modal
  const closeCurrentModal = () => {
    setOpenModal(null);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const navigate = useNavigate();

  const handlePhotoSubmit = async (img) => {
    setNotFoundModalOpen(false);
    setPremiumPlantModalOpen(false);
    setFetching(true);
    setValue(0);

    try {
      const formData = new FormData();
      formData.append("file", img);
      formData.append("upload_preset", "ayjz2x5r");
      closeCurrentModal();
      console.log(formData);

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/foundfoliage/image/upload",
        formData
      );

      const imageUrl = cloudinaryResponse.data.url;
      setimage(imageUrl);

      const plantnetResponse = await axios.get(
        `https://my-api.plantnet.org/v2/identify/all?images=${imageUrl}&include-related-images=false&no-reject=false&lang=en&api-key=${PLANTNET_KEY}`
      );

      const plantName =
        plantnetResponse.data.results[0].species.scientificNameWithoutAuthor;
      const firstWord = plantName.split(" ")[0];

      const perenualResponse = await axios.get(
        `https://perenual.com/api/species-list?key=${PERENUAL_KEY}&q=${firstWord}`
      );

      const plantInfo = perenualResponse.data.data[0];
      if (plantInfo === undefined) {
        setNotFoundModalOpen(true);
        setNotFound(true);
        console.log("Plant not found via name");
        setFetching(false);
        setValue(100);
        onOpen();
      } else if (
        plantInfo.watering ===
        "Upgrade Plans To Premium/Supreme - https://perenual.com/subscription-api-pricing. I'm sorry"
      ) {
        setPremiumPlantModalOpen(true);
        setPremiumPlant(true);
        console.log("Premium plant");
        setFetching(false);
        setValue(100);
        onOpen();
      } else {
        console.log(plantInfo);
        setScientificName(plantInfo.scientific_name[0]);
        setCommonName(plantInfo.common_name);
        setCycle(plantInfo.cycle);
        if (typeof plantInfo.sunlight === "string") {
          setSunlight(plantInfo.sunlight);
        } else {
          setSunlight(plantInfo.sunlight[0]);
        }
        setWatering(plantInfo.watering);
        setFetching(false);
        setValue(100);
        onOpen();
      }
    } catch (error) {
      console.log("Error while processing the form:", error);
      setNotFoundModalOpen(true);
      setNotFound(true);
      console.log("Plant not found via name");
      setFetching(false);
      setValue(100);
      onOpen();
      return;
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    setFetching(true);
    setValue(0);
    setNotFoundModalOpen(false);
    setPremiumPlantModalOpen(false);

    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("upload_preset", "ayjz2x5r");

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/foundfoliage/image/upload",
        formData
      );

      const imageUrl = cloudinaryResponse.data.url;
      setimage(imageUrl);

      const plantnetResponse = await axios.get(
        `https://my-api.plantnet.org/v2/identify/all?images=${imageUrl}&include-related-images=false&no-reject=false&lang=en&api-key=${PLANTNET_KEY}`
      );

      console.log("plant net response: ", plantnetResponse);

      const plantName =
        plantnetResponse.data.results[0].species.scientificNameWithoutAuthor;
      const firstWord = plantName.split(" ")[0];

      const perenualResponse = await axios.get(
        `https://perenual.com/api/species-list?key=${PERENUAL_KEY}&q=${firstWord}`
      );

      console.log("perenual response:", perenualResponse);

      const plantInfo = perenualResponse.data.data[0];
      if (plantInfo === undefined) {
        setNotFoundModalOpen(true);
        setNotFound(true);
        console.log("Plant not found");
        setNotFound(true);
        setFetching(false);
        setValue(100);
        onOpen();
      } else if (
        plantInfo.watering ===
        "Upgrade Plans To Premium/Supreme - https://perenual.com/subscription-api-pricing. I'm sorry"
      ) {
        setPremiumPlantModalOpen(true);
        setPremiumPlant(true);
        console.log("Premium plant");
        setFetching(false);
        setValue(100);
        onOpen();
      } else {
        const perenualDetails = await axios.get(
          `https://perenual.com/api/species/details/${plantInfo.id}?key=${PERENUAL_KEY}`
        );

        const plantDetails = perenualDetails.data;
        console.log(plantDetails);
        setScientificName(plantDetails.scientific_name[0]);
        setCommonName(plantDetails.common_name);
        setCycle(plantDetails.cycle);
        setEdible(plantDetails.cuisine);
        setMaintenance(plantDetails.maintenance);
        setPoisonous(plantDetails.poisonous_to_humans);
        setIndoor(plantDetails.indoor);
        setDescription(plantDetails.description);
        setMedicinal(plantDetails.medicinal);
        setFlowering(plantDetails.flowering_season);
        if (typeof plantDetails.sunlight === "string") {
          setSunlight(plantDetails.sunlight);
        } else {
          setSunlight(plantDetails.sunlight[0]);
        }
        setWatering(plantDetails.watering);
        setFetching(false);
        setValue(100);
        onOpen();
      }
    } catch (error) {
      console.log("Error while processing the form:", error);
    }
  };

  const handlePlantSubmit = async (e) => {
    const storedToken = localStorage.getItem("authToken");

    const newPlant = {
      commonName,
      scientificName,
      cycle,
      sunlight,
      watering,
      edible, 
      maintenance, 
      poisonous, 
      indoor, 
      description, 
      medicinal, 
      flowering,
      imgUrl: image,
    };
    console.log(newPlant); //DELETE LATER
    try {
      await axios.post(`${API_URL}/plant/add`, newPlant, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      console.log("plant added successfully");
      navigate("/garden");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={
        fetching && image ? "cursor-wait add-plant-page " : "add-plant-page"
      }
    >
      <WebcamCaptureModal
        isOpen={openModal === "WebcamCaptureModal"} // Check if this modal should be open
        onClose={closeCurrentModal} // Close the current modal
        identifier="WebcamCaptureModal" // Unique identifier/key for this modal
        handlePhotoSubmit={handlePhotoSubmit}
      />

      <div className="noise-texture"></div>
      <div className="add-plant-container">
        <div className="add-plant-text">
          <h1>Find your new plant and add it to your garden</h1>
          <p className=" w-96">
            Simply upload an image or take a photo and we'll run it through our
            system so you can grab its card and add it to your own virtual
            garden!
          </p>
        </div>

        {fetching && image ? (
          <div className=" h-full ">
            <div className="darkened-background h-full"></div>
            <CircularProgress
              label="Loading..."
              color="success"
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 loading-spinner"
            />
          </div>
        ) : notFoundModalOpen ? (
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
            <div className="blurred-plant ">
              <ModalContent>
                {(onClose) => (
                  <>
                    <img
                      className="m-5 rounded-lg object-cover  h-80"
                      src={image}
                    />

                    <ModalBody className="pt-2 pb-5">
                      <div>
                        <h2>Seems like no plant was found</h2>
                        <h5>
                          Try using a different photo and we'll see what we can
                          do 😔
                        </h5>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onPress={onClose}>
                        Try Again?
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </div>
          </Modal>
        ) : premiumPlantModalOpen ? (
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
            <div className="blurred-plant">
              <ModalContent>
                {(onClose) => (
                  <>
                    <div className="relative">
                      <img
                        src="https://res.cloudinary.com/foundfoliage/image/upload/v1693993555/skps9kcivjsi6rkfmztz.png"
                        className=" z-20 absolute h-56 left-0 right-0 bottom-0 top-0 m-auto"
                      />
                      <div className=" blur-lg z-10">
                        <img
                          className="m-5 rounded-lg object-cover  h-80"
                          src={image}
                        />
                      </div>
                    </div>

                    <ModalBody className="pt-2 pb-5">
                      <div>
                        <h2>Oops, that's a Premium Plant</h2>
                        <h5>
                          Those aren't available as this is simply a project for
                          Ironhack
                        </h5>
                        <h5>Try a different plant!</h5>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onPress={onClose}>
                        Try Again?
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </div>
          </Modal>
        ) : (
          <Modal
            backdrop="opaque"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            scrollBehavior={scrollBehavior}
            size="md"

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
                    <h2 className="text-2xl">{commonName}</h2>
                  </ModalHeader>
                  {commonName && (
                    <img
                      className="m-5 rounded-lg object-cover  h-80"
                      src={image}
                    />
                  )}
                  <ModalBody className="py-0 pb-5 h-24">
                    {commonName && (
                      <div>
                        <div>
                          <h2>
                            <b>Scientific name</b>
                          </h2>
                          <h2 className="text-sm">{scientificName}</h2>
                        </div>
                        <hr className="my-3 opacity-50	"/>
                        <div>
                          <h2> <b> Description: </b></h2>
                          <h2 className="text-sm">{description}</h2>
                        </div>
                      </div>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button color="primary" onPress={handlePlantSubmit}>
                      Add to Garden?
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        )}
        <div className="add-plant-buttons flex flex-row align-middle">
          <input
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            onChange={(e) => {
              handleFileSubmit(e);
            }}
          />
          <Button
            className={
              fetching && image
                ? "cursor-wait  h-11 rounded-full shadow-lg"
                : " h-11 rounded-full shadow-lg"
            }
            onClick={handleClick}
            color="success"
            endContent={
              <img
                className=" w-4 "
                src="https://cdn-icons-png.flaticon.com/512/3767/3767084.png"
              />
            }
          >
            Upload Image
          </Button>
          <Button
            className={
              fetching && image
                ? "cursor-wait  h-11 rounded-full shadow-lg"
                : " h-11 rounded-full shadow-lg"
            }
            onClick={() => openSpecificModal("WebcamCaptureModal")}
            color="success"
            endContent={
              <img
                className=" w-4 "
                src="https://cdn-icons-png.flaticon.com/512/4184/4184373.png"
              />
            }
          >
            Take a Photo
          </Button>
     
        </div>
      </div>
      <img
        className="add-page-img"
        src="https://res.cloudinary.com/foundfoliage/image/upload/v1693818615/k9pbxax87yunrgrbeejp.png"
      />
    </section>
  );
}

export default AddPlantPage;
