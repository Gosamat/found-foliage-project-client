import {Navbar, NavbarBrand, NavbarContent, NavbarItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { AuthContext } from '../../Context/Auth.Context';
import { useContext } from "react";


function TopNavbar() {
  const {isLoggedIn, user, logOutUser} = useContext(AuthContext);

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Plant website</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" to={"/"}>
            Homepage
          </Link>
        </NavbarItem>
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
          <Link color="foreground" to={"/plants/add"}>
            Add Plant
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link to={"/login"}>Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" to={"/signup"} variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default TopNavbar



