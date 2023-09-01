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
} from "@nextui-org/react";
import { AuthContext } from "../../Context/Auth.Context";
import { useContext } from "react";

function TopNavbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Navbar>
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
            <Link href={"/garden"}>{user.username} Profile</Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              onClick={logOutUser}
              variant="flat"
            >
              Logout{" "}
            </Button>
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
