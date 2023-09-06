import {
  Navbar,
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  RadioGroup,
  Radio,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  DropdownSection,
} from "@nextui-org/react";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../../Context/Auth.Context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://found-foliage-server.onrender.com";

function TopNavbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loggedUser, setLoggedUser] = useState(null);

  const navigate = useNavigate();

  const deleteProfile = (onClose) => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/auth/delete`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        logOutUser();
        onClose();
        navigate("/");
      })
      .catch((error) => {
        console.error("Error deleting profile:", error);
      });
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (user) {
      axios
        .get(`${API_URL}/garden`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setLoggedUser(response.data.currentUser);
        })
        .catch((error) =>
          console.log(
            "error while grabbing plants current user from API: ",
            error
          )
        );
    }
  }, [user]);

  return (
    <Navbar className=" w-auto">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure you want to delete your profile? There is no going
                back.
              </ModalHeader>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No, go back
                </Button>
                <Button color="primary" onPress={() => deleteProfile(onClose)}>
                  Yes, delete my profile
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <NavbarBrand>
          <Link color="foreground">
          <RouterLink to="/">

            <img
              src="https://res.cloudinary.com/ghostly/image/upload/v1693570491/FoundFoliage/icon_ekml2z.png"
              width={50}
            />
            <p className="font-bold text-inherit">Found Foliage</p>
            </RouterLink>

          </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link color="foreground" aria-current="page">
            <RouterLink to="/about">About</RouterLink>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground">
            <RouterLink to="/garden">Garden</RouterLink>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground">
            <RouterLink to="/plant/add">Add Plant</RouterLink>
          </Link>
        </NavbarItem>
        <NavbarItem></NavbarItem>
      </NavbarContent>
      {isLoggedIn ? (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  color="success"
                  className="capitalize rounded-full px-0"
                  variant="flat"
                >
                  {loggedUser && (
                    <div className="flex justify-between items-center w-max capitalize rounded-full mx-2">
                      <img
                        src={loggedUser.profilePicUrl}
                        className="w-7 h-7 rounded-full me-2"
                      />
                      <h3 className="me-2">{loggedUser.username}</h3>
                    </div>
                  )}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Dropdown Variants"
                color="success"
                variant="flat"
              >
                <DropdownSection showDivider>
                  <DropdownItem key="copy" onClick={() => navigate("/garden")}>
                    My Garden
                  </DropdownItem>
                </DropdownSection>

                <DropdownItem key="edit" onClick={logOutUser}>
                  Logout
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onPress={onOpen}
                >
                  Delete profile
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link>
              <RouterLink to="/auth/login">Login </RouterLink>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={RouterLink} color="primary" variant="flat">
              <RouterLink to="/auth/signup">Sign Up</RouterLink>
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
}

export default TopNavbar;
