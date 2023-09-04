import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import axios from "axios";
import { useState,useCallback, useRef } from "react";
import Webcam from "react-webcam";

const API_URL = "http://localhost:5005";


function WebcamCaptureModal({ isOpen, onClose, handlePhotoSubmit}) {
  const { onOpen, onOpenChange } = useDisclosure();
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };


  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);

/*     props.onImageCapture(imageSrc);
 */  }, [webcamRef]);


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
            <ModalHeader className="flex flex-col gap-1">Capture a photo of a plant!</ModalHeader>
            
            {img === null ? (
              <>
                <ModalBody>
                  <Webcam
                    audio={false}
                    mirrored={true}
                    height={400}
                    width={400}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button onClick={capture} color="primary">Capture photo</Button>
                </ModalFooter>
              </>
            ) : (
              <>
                <ModalBody>
                  <img src={img} alt="screenshot" />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onClick={() => setImg(null)}>Retake</Button>
                  <Button color="primary" onClick={ ()=>handlePhotoSubmit(img)}>Submit photo</Button>
                  
                </ModalFooter>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  </>
);
}

export default WebcamCaptureModal;