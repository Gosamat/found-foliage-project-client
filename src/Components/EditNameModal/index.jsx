import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

function EditNameModal(props) {
  const { isOpen, onOpenChange } = props; // Use props to get the modal state

  // Add any other necessary state variables and functions here
  // For example, if you need to manage input values for the plant name, you can use useState

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit Plant Name</ModalHeader>
            <ModalBody>
              {/* Add input fields and logic for editing the plant name */}
              {/* You can use useState to manage the input value */}
              <Input
                label="Plant Name"
                placeholder={props.selectedPlant.commonName}
                type="text"
                variant="bordered"
                name="name"
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