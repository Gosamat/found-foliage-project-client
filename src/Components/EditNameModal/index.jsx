import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";

function EditNameModal(props) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {plant} = props

  return (
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Plant Name</ModalHeader>
              <ModalBody>
              <p>Maybe we got the name wrong, or mayber you just want to give it a cool nickname like Bob!</p>
                <Input
                  label="Plant Name"
                  placeholder= {plant.commonName}
                  type="text"
                  variant="bordered"
                  name = "name"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Change
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  );
}

export default EditNameModal;
