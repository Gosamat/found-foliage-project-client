import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/Auth.Context";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  cn,
  useDisclosure,
  Avatar,
  User,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";

import { AddNoteIcon } from "../../Components/Listbox/dropmenu/AddNoteIcon";
import { CopyDocumentIcon } from "../../Components/Listbox/dropmenu/CopyDocumentIcon";
import { EditDocumentIcon } from "../../Components/Listbox/dropmenu/EditDocumentIcon";
import { DeleteDocumentIcon } from "../../Components/Listbox/dropmenu/DeleteDocumentIcon";
import DeleteGardenModal from "../../Components/DeleteGardenModal";
import ChangePlantNameModal from "../../Components/ChangePlantNameModal";
import ChangePlantImageModal from "../../Components/ChangePlantImageModal";
import PlantDetailsModal from "../../Components/PlantDetailsModal";
import EditNotesModal from "../../Components/EditNotesModal";
import { useNavigate } from "react-router-dom";
const API_URL = "https://found-foliage-server.onrender.com";
const iconClasses =
  "text-xl text-default-500 pointer-events-none flex-shrink-0";

function GardenPage() {
  const [garden, setGarden] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedPlant, setSelectedPlant] = useState(null); // Define selectedPlant
  const [openModal, setOpenModal] = useState(null); // State to track the open modal
  const [user, setUser] = useState(null);
  const inputRef = useRef(null);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [closeTooltip, setCloseTooltip] = useState(false);

  const navigate = useNavigate();
  const [values, setValues] = useState(new Set([]));

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleSelectionChange = (e) => {
    setValues(new Set(e.target.value.split(",")));
  };

  // Card centered position
  let cardList = null; // Initialize cardList as null

  if (
    garden &&
    garden.plants &&
    Array.isArray(garden.plants) &&
    garden.plants.length > 0
  ) {
    // If garden and garden.plants are defined and not empty, create cardList
    cardList = garden.plants.map((plant) => (
      <Tooltip
        key={plant._id}
        color="success"
        showArrow={true}
        content={plant.notes}
      >
        <Card
          className="border-none me-5 mb-5 w-52"
          key={plant._id}
          isFooterBlurred
          radius="lg"
        >
          <div
            className="rounded-xl h-52 bg-cover bg-center"
            style={{ backgroundImage: `url(${plant.imgUrl})` }}
          ></div>
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-white/80">{plant.commonName}</p>
          </CardFooter>
        </Card>
      </Tooltip>
    ));
  }

  let containerClassName =
    "flex-wrap flex flex-row p-10 bg-slate-600 bg-opacity-10 mx-5 mb-5 rounded-2xl shadow-lg";

  if (cardList && cardList.length === 1) {
    containerClassName += " justify-start"; // Align to the left for a single card
  } else {
    containerClassName += " justify-center"; // Center the cards when there are multiple or none
  }

  // Function to open a specific modal
  const openSpecificModal = (modalIdentifier, plant) => {
    setOpenModal(modalIdentifier);
    setSelectedPlant(plant); // Set selectedPlant
    setCloseTooltip(true);
  };

  // Function to close the currently open modal
  const closeCurrentModal = () => {
    setOpenModal(null);
    setCloseTooltip(false);
  };

  const fetchPlants = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/garden`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setGarden(response.data.gardenPlants);
        setUser(response.data.currentUser);
        setProfilePicUrl(response.data.currentUser.profilePicUrl);
      })
      .catch((error) =>
        console.log(
          "error while grabbing plants in user's garden from API: ",
          error
        )
      );
  };

  const changeProfilePic = async (e) => {
    const storedToken = localStorage.getItem("authToken");
    const formData = new FormData();

    try {
      formData.append("file", e.target.files[0]);
      formData.append("upload_preset", "ayjz2x5r");

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/foundfoliage/image/upload",
        formData
      );
      const imageUrl = cloudinaryResponse.data.url;
      const updateUser = { profilePicUrl: imageUrl };

      await axios.put(`${API_URL}/auth/update`, updateUser, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  function deletePlant(plantId) {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/garden/${plantId}/delete`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        fetchPlants();
      })
      .catch((error) =>
        console.log(
          "error while deleting plant in user's garden from API: ",
          error
        )
      );
  }

  function createSection() {
    const section = {
      title: sectionTitle,
      plants: sectionPlants,
    };
    const storedToken = localStorage.getItem("authToken");
    axios
      .post(`${API_URL}/garden/section/create`, section, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => navigate("/garden"))
      .catch((err) => console.log(err));
  }

  return (
    <div className="noise">
      {user && (
        <>
          <input
            style={{ display: "none" }}
            ref={inputRef}
            type="file"
            onChange={(e) => {
              changeProfilePic(e);
            }}
          />
          <div>
            <div className="flex items-start">
              <Link onPress={handleClick}>
                <User
                  className="w-96 text-lg" // Adjust the width and font size as needed
                  name={user.username}
                  description={user.email}
                  avatarProps={{
                    src: profilePicUrl,
                    size: "2xl", // Increase the avatar size as needed
                  }}
                />
              </Link>
            </div>
            <div>
              <DeleteGardenModal
                className="z-10"
                isOpen={openModal === "deleteGardenModal"} // Check if this modal should be open
                onClose={closeCurrentModal} // Close the current modal
                identifier="deleteGardenModal" // Unique identifier/key for this modal
                fetchPlants={fetchPlants}
              />
              <ChangePlantNameModal
                className=" z-50"
                isOpen={openModal === "ChangePlantNameModal"} // Check if this modal should be open
                onClose={closeCurrentModal} // Close the current modal
                identifier="ChangePlantNameModal" // Unique identifier/key for this modal
                fetchPlants={fetchPlants}
                selectedPlant={selectedPlant} // Pass selectedPlant
              />
              <ChangePlantImageModal
                isOpen={openModal === "ChangePlantImageModal"} // Check if this modal should be open
                onClose={closeCurrentModal} // Close the current modal
                identifier="ChangePlantImageModal" // Unique identifier/key for this modal
                fetchPlants={fetchPlants}
                selectedPlant={selectedPlant} // Pass selectedPlant
              />
              <PlantDetailsModal
                isOpen={openModal === "PlantDetailsModal"} // Check if this modal should be open
                onClose={closeCurrentModal} // Close the current modal
                identifier="PlantDetailsModal" // Unique identifier/key for this modal
                fetchPlants={fetchPlants}
                selectedPlant={selectedPlant} // Pass selectedPlant
              />
              <EditNotesModal
                isOpen={openModal === "EditNotesModal"} // Check if this modal should be open
                onClose={closeCurrentModal} // Close the current modal
                identifier="EditNotesModal" // Unique identifier/key for this modal
                fetchPlants={fetchPlants}
                selectedPlant={selectedPlant} // Pass selectedPlant
              />
              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
              >
                <form onSubmit={() => createSection()}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          Log in
                        </ModalHeader>
                        <ModalBody>
                          <Input
                            autoFocus
                            type="text"
                            name="sectionTitle"
                            placeholder="Section Name"
                            required="true"
                            variant="bordered"
                          />

                          {garden && (
                            <div className="flex w-full max-w-xs flex-col gap-2">
                              <Select
                                selectionMode="multiple"
                                name="sectionPlants"
                                placeholder="Select plants to add"
                                selectedKeys={values}
                                className="max-w-xs"
                                onChange={handleSelectionChange}
                              >
                                {garden.plants.map((plant) => (
                                  <SelectItem
                                    key={plant._id}
                                    value={plant.commonName}
                                  >
                                    <div className="flex gap-2 items-center">
                                      <Avatar
                                        className="flex-shrink-0"
                                        size="sm"
                                        src={plant.imgUrl}
                                      />
                                      <div className="flex flex-col">
                                        <span className="text-small">
                                          {plant.commonName}
                                        </span>
                                      </div>
                                    </div>
                                  </SelectItem>
                                ))}
                              </Select>
                              <p className="text-small text-default-500">
                                Selected: {Array.from(values).join(", ")}
                              </p>
                            </div>
                          )}
                        </ModalBody>
                        <ModalFooter>
                          <Button color="success" onPress={onClose}>
                            Add Section
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </form>
              </Modal>
            </div>
            <div className="garden-text-container mx-5">
              <h1>My Garden</h1>
              <h3>{garden.description}</h3>
            </div>

            <div className={containerClassName}>
              {garden &&
                garden.plants.map((plant) => {
                  return (
                    <Tooltip
                      classNames={{
                        base: "py-2 px-4 shadow-md text-black bg-[#ebdbbf]",
                        arrow: "bg-[#ebdbbf]",
                      }}
                      key={plant._id}
                      color="success"
                      variant="flat"
                      showArrow={true}
                      shadow="md"
                      content={plant.notes}
                      offset={15}
                      isDisabled={closeTooltip || !plant.notes ? true : false}
                      motionProps={{
                        variants: {
                          exit: {
                            opacity: 0,
                            transition: {
                              duration: 0.1,
                              ease: "easeIn",
                            },
                          },
                          enter: {
                            opacity: 1,
                            transition: {
                              duration: 0.15,
                              ease: "easeOut",
                            },
                          },
                        },
                      }}
                    >
                      <Card
                        className="border-none me-5 mb-5 w-52"
                        key={plant._id}
                        isFooterBlurred
                        radius="lg"
                      >
                        <div
                          className="rounded-xl h-52 bg-cover bg-center"
                          style={{ backgroundImage: `url(${plant.imgUrl})` }}
                        ></div>
                        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                          <p className="text-tiny text-white/80">
                            {plant.commonName}
                          </p>

                          {/* drop menu */}
                          <Dropdown>
                            <DropdownTrigger>
                              <Button
                                className="bg-black/10 hover:bg-black/30 outline: none text-white/100 hover:border-transparent"
                                variant="flat"
                                radius="lg"
                                size="sm"
                              >
                                Open
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                              variant="flat"
                              aria-label="Dropdown menu with description"
                              color="success"
                              style={{ background: "#ebdbbf" }}
                            >
                              <DropdownSection title="Actions" showDivider>
                                <DropdownItem
                                  onPress={() =>
                                    openSpecificModal(
                                      "PlantDetailsModal",
                                      plant
                                    )
                                  }
                                  key="details"
                                  description="Details"
                                  startContent={
                                    <CopyDocumentIcon className={iconClasses} />
                                  }
                                >
                                  View Details
                                </DropdownItem>
                                <DropdownItem
                                  onPress={() =>
                                    openSpecificModal("EditNotesModal", plant)
                                  }
                                  key="note"
                                  description="Create a note"
                                  startContent={
                                    <AddNoteIcon className={iconClasses} />
                                  }
                                >
                                  {plant.notes === ""
                                    ? "New note"
                                    : "Change note"}
                                </DropdownItem>
                                <DropdownItem
                                  onPress={() =>
                                    openSpecificModal(
                                      "ChangePlantNameModal",
                                      plant
                                    )
                                  }
                                  key="name"
                                  description="Edit plant name"
                                  startContent={
                                    <EditDocumentIcon className={iconClasses} />
                                  }
                                >
                                  Change Name
                                </DropdownItem>
                                <DropdownItem
                                  onPress={() =>
                                    openSpecificModal(
                                      "ChangePlantImageModal",
                                      plant
                                    )
                                  }
                                  key="image"
                                  description="Edit plant image"
                                  startContent={
                                    <EditDocumentIcon className={iconClasses} />
                                  }
                                >
                                  Change Image
                                </DropdownItem>
                              </DropdownSection>
                              <DropdownSection>
                                <DropdownItem
                                  onPress={() => deletePlant(plant._id)}
                                  key="delete"
                                  className="text-danger"
                                  color="danger"
                                  description="Permanently delete this plant"
                                  startContent={
                                    <DeleteDocumentIcon
                                      className={cn(iconClasses, "text-danger")}
                                    />
                                  }
                                >
                                  Delete plant
                                </DropdownItem>
                              </DropdownSection>
                            </DropdownMenu>
                          </Dropdown>
                        </CardFooter>
                      </Card>
                    </Tooltip>
                  );
                })}
            </div>
            <div>
              {" "}
              <Button onPress={() => openSpecificModal("deleteGardenModal")}>
                Delete Garden
              </Button>
            </div>
            <Button onPress={onOpen} color="success">
              Add a section
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default GardenPage;
