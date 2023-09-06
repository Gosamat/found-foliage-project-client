import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import {MailIcon} from './MailIcon.jsx';
import {LockIcon} from './LockIcon.jsx';
import { useContext, useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/Auth.Context"

const API_URL = "https://found-foliage-server.onrender.com";

export default function SignInModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();


  const handleSubmit = (onClose)=>{
    const requestBody = {username, email, password};
    axios.post(`${API_URL}/auth/signup`, requestBody)
    .then(() => {
              onClose();
        /*navigate("/");*/
      })
    .catch((error) => {
        console.error("Signup error:", error);
      });
  }

  return (
    <>
      <Button onPress={onOpen} color="primary">Sign In</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 ">Sign In</ModalHeader>
              <ModalBody>
              <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Username"
                  type = "username"
                  placeholder="Enter your username"
                  variant="bordered"
                  value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
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
                {errorMessage && <p>{errorMessage}</p>}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary"  onPress={() => handleSubmit(onClose)}>
                  Sign Up
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
