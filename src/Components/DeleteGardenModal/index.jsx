import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

function DeleteGardenModal({ isOpen, onClose }) {
  const { onOpen, onOpenChange } = useDisclosure();

  // Update the modal's visibility based on the isOpen prop
  React.useEffect(() => {
    if (isOpen) {
      onOpen();
    } else {
      onOpenChange();
    }
  }, [isOpen]);

  return (
    <>
      {/* No need to use onOpen from useDisclosure, use isOpen from props */}
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={() => {
          onClose(); // Call the onClose function passed from the parent
        }}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Are you sure you want to delete your garden?</ModalHeader>
           
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button color="primary" onPress={onClose }>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteGardenModal;