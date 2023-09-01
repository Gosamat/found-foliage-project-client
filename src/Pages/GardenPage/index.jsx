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
  Avatar, Chip
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

import { useNavigate } from "react-router-dom";
const API_URL = "http://localhost:5005";
const iconClasses =
  "text-xl text-default-500 pointer-events-none flex-shrink-0";

function GardenPage() {
  const [garden, setGarden] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const navigate = useNavigate();
  const [values, setValues] = useState(new Set([]));
  

  const handleSelectionChange = (e) => {
    setValues(new Set(e.target.value.split(",")));
  };

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

  function createSection (){
    const section = {
      title: sectionTitle,
      plants: sectionPlants
    }
    const storedToken = localStorage.getItem("authToken");
    axios.post(`${API_URL}/garden/section/create`, section, {
        headers: { Authorization: `Bearer ${storedToken}` },
      }).then(()=> navigate("/garden")).catch(err => console.log(err));

  }

  return (
    <div>
      <h1>GardenPage</h1>
      <div>
        <Button onPress={onOpen} color="primary">
          Add a section
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
                  <form onSubmit={()=>createSection()}>

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
                  {garden && <div className="flex w-full max-w-xs flex-col gap-2">
                    <Select
                      selectionMode="multiple"
                      name="sectionPlants"  
                      placeholder="Select plants to add"
                      selectedKeys={values}
                      className="max-w-xs"
                      onChange={handleSelectionChange}
                    >
                      {garden.plants.map((plant) => (
                        <SelectItem key={plant._id} value={plant.commonName}>
                        <div className="flex gap-2 items-center">
                        <Avatar className="flex-shrink-0" size="sm" src={plant.imgUrl} />
                        <div className="flex flex-col">
                        <span className="text-small">{plant.commonName}</span>
                        </div>
                        </div>

                        </SelectItem>
                      ))}
                    </Select>
                    <p className="text-small text-default-500">
                      Selected: {Array.from(values).join(", ")}
                    </p>
                  </div>
                  }
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    Sign in
                  </Button>
                </ModalFooter>
              </>
            )}
           
          </ModalContent>
          </form>
        </Modal>
      </div>
      <div className="flex-wrap flex flex-row p-10">
        {garden &&
          garden.plants.map((plant) => {
            return (
              <Card
                className="border-none m-1 w-56 "
                key={plant._id}
                isFooterBlurred
                radius="lg"
              >
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl h-100 p-2"
                  src={plant.imgUrl}
                />
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <p className="text-tiny text-white/80">{plant.commonName}</p>

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
              </Card>
            );
          })}
      </div>
    </div>
  );
}

export default GardenPage;
