import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
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
import { AuthContext } from "../../Context/Auth.Context";
import { CircularProgress } from "@nextui-org/react";

const PLANTNET_KEY = "2b10VpTk0sBhhNvolJI73EN";
const PERENUAL_KEY = "sk-LWNZ64d4a282ae0b61825";
const API_URL = "http://localhost:5005";

function AddPlantPage() {
  const [commonName, setCommonName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [cycle, setCycle] = useState("");
  const [sunlight, setSunlight] = useState("");
  const [watering, setWatering] = useState("");
  const [image, setimage] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [fetching, setFetching] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [value, setValue] = React.useState(0);
  const inputRef = useRef(null);
  const [file, setFile]= useState(null);
  const formData = new FormData();



  const handleClick = () => {
    inputRef.current.click();
  };

  const navigate = useNavigate();


  const uploadImage = (files) => {
    formData.append("file", files[0]);
    formData.append("upload_preset", "ayjz2x5r");

   /*  axios
      .post(
        "https://api.cloudinary.com/v1_1/foundfoliage/image/upload",
        formData
      )
      .then((response) => {
        setimage(response.data.url);

  }); */
};

  const handleFormSubmit =  (e) => {
    e.preventDefault();
    setFetching(true);
    setValue(0);    
    uploadImage(file);

    console.log(image);

    axios
      .post(
        "https://api.cloudinary.com/v1_1/foundfoliage/image/upload",
        formData
      )
      .then((response) => {
        setimage(response.data.url);
    
    axios
      .get(
        `https://my-api.plantnet.org/v2/identify/all?images=${image}&include-related-images=false&no-reject=false&lang=en&api-key=${PLANTNET_KEY}`
      )
      .then((res) => {
        const plantName =
          res.data.results[0].species.scientificNameWithoutAuthor;
        const firstWord =
          res.data.results[0].species.scientificNameWithoutAuthor.split(" ")[0];
        console.log(res.data.results[0]);
        console.log(plantName); //REMOVE LATER
        axios
          .get(
            `https://perenual.com/api/species-list?key=${PERENUAL_KEY}&q=${firstWord}`
          )
          .then((res) => {
            const plantInfo = res.data.data[0];
            if (plantInfo === undefined) {
              setNotFound(true);
              console.log("plant not found");
            } else {
              console.log(plantInfo); //REMOVE LATER
              setScientificName(plantInfo.scientific_name[0]);
              setCommonName(plantInfo.common_name);
              setCycle(plantInfo.cycle);
              setSunlight(plantInfo.sunlight[0]);
              setWatering(plantInfo.watering);
              setFetching(false);
              setValue(100);
              onOpen();
            }
          });
      })
      .catch((err) => {
        console.log("error while fetching plant info: ", err);
      });
});
};

  const handlePlantSubmit = async (e) => {
    const storedToken = localStorage.getItem("authToken");

    const newPlant = {
      commonName,
      scientificName,
      cycle,
      sunlight,
      watering,
      imgUrl: image,
    }; //Need to fix the scientific name as it received an array, screwing up the post request
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
    <section className={fetching && image ? "cursor-wait" : ""}>
      <h1>Add Plant Page</h1>
      <div>
        <form
          onSubmit={(e) => {
            handleFormSubmit(e);
            setFetching(true);
          }}
        >
          <input
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            onChange={(e) => {
              uploadImage(e.target.files);
            }}
          />
          <Button
            className={
              fetching && image ? "cursor-wait h-72 w-96" : " h-72  w-96"
            }
            type="submit"
            onClick={handleClick}
          >
            <img
              className="  w-56"
              src="https://cdn-icons-png.flaticon.com/512/3767/3767084.png"
            />
          </Button>
        </form>
        {fetching && image ? (
          <CircularProgress
            aria-label="Loading..."
            size="lg"
            value={value}
            color="warning"
            showValueLabel={true}
          />
        ) : (
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
                    <h2 className="text-2xl">{commonName}</h2>
                  </ModalHeader>
                  {commonName && <img className="m-5 rounded-lg" src={image} />}
                  <ModalBody className="py-0 pb-5">
                    {commonName && (
                      <div>
                        <h2>
                          <b>Scientific name:</b> {scientificName}
                        </h2>
                        <h3>
                          <b>sunlight level:</b> {sunlight}
                        </h3>
                        <h3>
                          {" "}
                          <b>Watering frequency:</b> {watering}
                        </h3>
                      </div>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={() => navigate("/plant/add")}
                    >
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
      </div>
    </section>
  );
}

export default AddPlantPage;
