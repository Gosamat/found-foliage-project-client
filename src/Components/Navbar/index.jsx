import {Navbar, NavbarBrand, NavbarContent, NavbarItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { AuthContext } from '../../Context/Auth.Context';
import { useContext } from "react";
import {Tooltip} from "@nextui-org/react";



function TopNavbar() {
  const {isLoggedIn, user, logOutUser} = useContext(AuthContext);

  return (
    <Navbar className="rounded-full opacity-75

">
      <NavbarBrand>
      <Link to={"/"} className="flex items-center"> 
      <img src="https://res.cloudinary.com/ghostly/image/upload/v1693570491/FoundFoliage/icon_ekml2z.png" width={"50px"}/>
      <p className="font-bold text-inherit">Found Foliage</p> 
      </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link to={"/about"} aria-current="page">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to={"/garden"}>
            Garden
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to={"/plant/add"}>
            Add Plant
          </Link>
        </NavbarItem>
      </NavbarContent>
      {isLoggedIn?
        <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
        <Tooltip content="Click to check your garden">
          <Link to={"/garden"}>{user.username} Profile</Link>
          </Tooltip>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" onClick={logOutUser} variant="flat">
Logout          </Button>
        </NavbarItem>
      </NavbarContent>
      :
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link to={"/auth/login"}>Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" to={"/auth/signup"} variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      }
    </Navbar>
  )
}

export default TopNavbar



