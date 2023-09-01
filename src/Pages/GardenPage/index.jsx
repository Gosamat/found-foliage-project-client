import React from "react";
import { useEffect, useState } from "react";
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
} from "@nextui-org/react";
import { AddNoteIcon } from "../../Components/Listbox/dropmenu/AddNoteIcon";
import { CopyDocumentIcon } from "../../Components/Listbox/dropmenu/CopyDocumentIcon";
import { EditDocumentIcon } from "../../Components/Listbox/dropmenu/EditDocumentIcon";
import { DeleteDocumentIcon } from "../../Components/Listbox/dropmenu/DeleteDocumentIcon";
import { useNavigate } from "react-router-dom";
const API_URL = "http://localhost:5005";
const iconClasses =
  "text-xl text-default-500 pointer-events-none flex-shrink-0";

function GardenPage() {
  const [garden, setGarden] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();


  const fetchPlants = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/garden`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setGarden(response.data);
      })
      .catch((error) =>
        console.log(
          "error while grabbing plants in user's garden from API: ",
          error
        )
      );
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

  return (
    <div>
      <h1>GardenPage</h1>
      <div className="flex-wrap flex flex-row">
      {garden &&
        garden.plants.map((plant) => {
          return (
            <Card
              className="py-2 border-none"
              key={plant._id}
              isFooterBlurred
              radius="lg"
            >
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">
                  {plant.commonName}
                </p>
                <small className="text-default-500">
                  {plant.scientificName}
                </small>
                {/* <h4 className="font-bold text-large">{plant.sunlight}</h4> */}
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={plant.imgUrl}
                  width={270}
                />
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_10px)] shadow-small ml-1 z-10">
                  <p className="text-tiny text-white/80">Available soon.</p>

                  {/* drop menu */}
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered">Open Menu</Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      variant="faded"
                      aria-label="Dropdown menu with description"
                    >
                      <DropdownSection title="Actions" showDivider>
                        <DropdownItem
                          key="new"
                          description="Create a note"
                          startContent={<AddNoteIcon className={iconClasses} />}
                        >
                          New file
                        </DropdownItem>
                        <DropdownItem
                          onPress={() => navigate(`/garden/${plant._id}`)}
                          key="copy"
                          description="Details"
                          startContent={
                            <CopyDocumentIcon className={iconClasses} />
                          }
                        >
                          View Details
                        </DropdownItem>
                        <DropdownItem
                          onPress={() => navigate(`/garden/${plant._id}/edit`)}
                          key="edit"
                          description="Edit your plant"
                          startContent={
                            <EditDocumentIcon className={iconClasses} />
                          }
                        >
                          Edit Plant
                        </DropdownItem>
                      </DropdownSection>
                      <DropdownSection title="Danger zone">
                        <DropdownItem
                          onPress={() => navigate(deletePlant(plant._id))}
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
                          Delete file
                        </DropdownItem>
                      </DropdownSection>
                    </DropdownMenu>
                  </Dropdown>
                </CardFooter>
              </CardBody>
            </Card>
          );
        })}
        </div>
    </div>
  );
}

export default GardenPage;
