import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import {MailIcon} from './MailIcon.jsx';
import {LockIcon} from './LockIcon.jsx';
import { useContext, useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/Auth.Context.jsx"

const API_URL = "https://found-foliage-server.onrender.com";

export default function LogInModalNoBut() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { storeToken, authenticateUser, isLoggedIn } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const {logOutUser } = useContext(AuthContext);

  // Automatically open the modal when the component mounts and the user is not logged in
  useEffect(() => {
    if (!isLoggedIn && logOutUser && location.pathname !== '/' && location.pathname!== '/about') {
      onOpen();
    }
  }, [isLoggedIn, onOpen, location]);

  const handleSubmit = () => {
    const requestBody = {
      email,
      password,
    };
    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        onClose(); // Close the modal
        navigate('/');
        window.location.reload();
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
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
                {errorMessage && <p>{errorMessage}</p>}
                <p>Do not have an account yet?</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="success" variant="flat" onPress={() => handleSubmit()}>
                  Log in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
    </>
  );
}
