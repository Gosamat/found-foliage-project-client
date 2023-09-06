import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import {MailIcon} from './MailIcon.jsx';
import {LockIcon} from './LockIcon.jsx';
import { useContext, useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/Auth.Context.jsx"

const API_URL = "https://found-foliage-server.onrender.com";


export default function LogInModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {storeToken, authenticateUser} = useContext(AuthContext);
  


  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

 
  const handleSubmit = () => {
    const requestBody = {
      email,
      password
    };
    axios.post(`${API_URL}/auth/login`, requestBody)
    .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
        window.location.reload(); 
      }).catch((error) => {
        const errorDescription =  error.response.data.message
        setErrorMessage(errorDescription);
      })
      

  };

  return (
    <>
    <Button onPress={onOpen} color="primary">
      Log In
    </Button>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
            <ModalBody>
              <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="email"
                  type = "email"
                  placeholder="Enter your email"
                  variant="bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  type = "password"
                  placeholder="Enter your password"
                  variant="bordered"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex py-2 px-1 justify-between">
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                </div>
                <div className="flex py-2 px-1 justify-between">
                  <p>Do not have an account yet?</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => handleSubmit()}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}