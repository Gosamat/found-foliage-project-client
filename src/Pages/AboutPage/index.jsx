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
  Link
} from "@nextui-org/react";
const boxShadowStyle = {
  boxShadow: '15px 15px 0px rgba(0, 0, 0, 0.05)',
};


function AboutPage() {
  return (
    <div className='about-page'>
      <h1>About Page</h1>
      <div className="noise-texture" ></div>

      <div className="text-container">
        {/* Lorem Ipsum text */}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="card-container">
        {/* Card 1 */}
        <div className="w-1/2 p-4 flex justify-center items-center ">
          <Card className="py-2 flex-col shadow-squared" style={boxShadowStyle}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">Developers</p>
              <small className="text-default-500">IronHack Students</small>
              <h4 className="font-bold text-large">Gonçalo Matias</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Link to="https://github.com/Gosamat">
                <div className="flex justify-center">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl image-hover"
                    src="https://avatars.githubusercontent.com/u/61824985?v=4"
                    width={270}
                  />
                </div>
              </Link>
            </CardBody>
          </Card>
        </div>

        {/* Card 2 */}
        <div className="w-1/2 p-4 flex justify-center items-center">
          <Card className="py-2 flex-col shadow-squared" style={boxShadowStyle}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">Developers</p>
              <small className="text-default-500">IronHack Students</small>
              <h4 className="font-bold text-large">Mariana Marques</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Link to="https://github.com/mfilipa97">
                <div className="flex justify-center">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl image-hover"
                    src="https://avatars.githubusercontent.com/u/113607909?v=4"
                    width={270}
                  />
                </div>
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;