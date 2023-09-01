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
} from "@nextui-org/react";

const API_URL = "http://localhost:5005";

function GardenPage() {
  const [garden, setGarden] = useState(null);

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <h1>GardenPage</h1>
      {garden &&
        garden.plants.map((plant) => {
          return (
            <Card
              className="py-4 border-none"
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
                <h4 className="font-bold text-large">{plant.sunlight}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={plant.imgUrl}
                  width={270}
                />
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <p className="text-tiny text-white/80">Available soon.</p>
                  <Button
                    className="text-tiny text-white bg-black/20"
                    variant="flat"
                    color="default"
                    radius="lg"
                    size="sm"
                  >
                    Notify me
                  </Button>
                </CardFooter>
              </CardBody>
            </Card>
          );
        })}
    </div>
  );
}

export default GardenPage;
