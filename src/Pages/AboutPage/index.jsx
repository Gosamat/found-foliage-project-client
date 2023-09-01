import React from 'react'
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
import { Link } from 'react-router-dom';



function AboutPage() {
  return (
    <div className='about-page'>
      <h1>About Page</h1>
      <div className="text-container">
        {/* Lorem Ipsum text */}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className="flex">
        <div className="w-1/2 p-4">
          <div className="card-container">
            {/* Card 1 */}
            <Card className="py-2 flex-col">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Developers</p>
                <small className="text-default-500">IronHack Students</small>
                <h4 className="font-bold text-large">Gonçalo Matias</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Link to="https://github.com/Gosamat">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl image-hover"
                    src="https://avatars.githubusercontent.com/u/61824985?v=4"
                    width={270}
                  />
                </Link>
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="w-1/2 p-4">
          <div className="card-container">
            {/* Card 2 */}
            <Card className="py-2 flex-col">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Developers</p>
                <small className="text-default-500">IronHack Students</small>
                <h4 className="font-bold text-large">Mariana Marques</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Link to="https://github.com/mfilipa97">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl image-hover"
                    src="https://avatars.githubusercontent.com/u/113607909?v=4"
                    width={270}
                  />
                </Link>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;