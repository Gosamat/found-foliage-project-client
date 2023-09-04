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
  DropdownSection
} from "@nextui-org/react";
import { AuthContext } from "../../Context/Auth.Context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function TopNavbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [loggedUser, setLoggedUser] = useState(null);


  const navigate = useNavigate();


const deleteProfile = (onClose)=>{
  const storedToken = localStorage.getItem("authToken");
  axios.delete(`${API_URL}/auth/delete`,  { headers: { Authorization: `Bearer ${storedToken}` },})
  .then(() => {
    logOutUser();
    onClose();
    navigate("/");
    
  }).catch((error) => {
    console.error("Error deleting profile:", error);
  });
}


useEffect(() => {
  const storedToken = localStorage.getItem("authToken");
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
});


  return (
    <Navbar className="mt-5 mx-7 w-auto rounded-full">
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Are you sure you want to delete your profile? There is no going back.</ModalHeader>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No, go back
                </Button>
                <Button color="primary" onPress={()=>deleteProfile(onClose)}>
                  Yes, delete my profile
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
        <NavbarBrand>
        <Link color="foreground" href={"/"}>
          <img
            src="https://res.cloudinary.com/ghostly/image/upload/v1693570491/FoundFoliage/icon_ekml2z.png"
            width={50}
          />
          <p className="font-bold text-inherit">Found Foliage</p>
          </Link>
        </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link color="foreground" href="/about" aria-current="page">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={"/garden"}>
            Garden
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={"/plant/add"}>
            Add Plant
          </Link>
        </NavbarItem>
      </NavbarContent>
      {isLoggedIn ? (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
          <Dropdown>
      <DropdownTrigger>
        <Button 
          color="success"
          className="capitalize rounded-full"
          variant="flat"
        >
        {loggedUser && <>
        <img src={loggedUser.profilePicUrl} className="w-7 rounded-full"/>
        <h3>{loggedUser.username}</h3>
        </>
        }
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Dropdown Variants"
        color="success"
        variant="flat"
      >
      <DropdownSection showDivider>

        <DropdownItem key="copy" onClick={()=>navigate("/garden")}>
        
My Garden</DropdownItem>
</DropdownSection>

        <DropdownItem key="edit" onClick={logOutUser}>Logout</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger" onPress={onOpen}>
          Delete profile
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href={"/auth/login"}>Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              href={"/auth/signup"}
              variant="flat"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
}

export default TopNavbar;



