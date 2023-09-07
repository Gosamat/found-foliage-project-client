import React from "react";
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
import { Link } from "react-router-dom";
const boxShadowStyle = {
  boxShadow: "15px 15px 0px rgba(0, 0, 0, 0.05)",
};

function AboutPage() {
  return (
    <div className="about-page">
      <h1>About Page</h1>
      <div className="noise-texture"></div>

      <div className="text-container flex items-center justify-center">
        <p className=" w-9/12 text-justify mb-5  text-sm">
          We are the creators of <b>Found Foliage</b>, the culmination of our journey
          during Ironhack's Web Development bootcamp.
          <br /> <br />
          Our passion for nature and
          our newfound skills in technology converged in this project. Our
          journey began with the desire to simplify plant identification using
          photos and to provide you with a virtual garden — a personal digital
          collection of your favorite plants. 
          <br /> <br />
          In the process, we challenged
          ourselves to learn technologies such as <b>Tailwind CSS</b> and <b>NextUI</b>. These tools allowed us to elevate the user experience,
          making plant exploration smoother and more engaging. 
          
          <br /> <br />Found Foliage is
          not just a project; it's living proof of the learning we received during the bootcamp and the skills we developed and acquired. 
          We hope you enjoy this project as much as we enjoyed creating it.
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
