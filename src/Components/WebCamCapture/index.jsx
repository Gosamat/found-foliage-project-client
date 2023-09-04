/* import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react"; // import useCallback

const WebCamCapture = () => {
  const webCamRef = useRef(null);
  const [camImg, setImgCam] = useState(null);

  // create a capture function
  const capture = useCallback(() => {
    const imageSrc = webCamRef.current.getScreenshot();
    setImgCam(imageSrc);
  }, [webCamRef]);

  return (
    // rest of the code
    <div className="container">
      {camImg ? (
        <img src={camImg} alt="webcam" />
      ) : (
        <Webcam height={600} width={600} ref={webCamRef} />
      )}
      <div className="btn-container">
        <button onClick={capture}>Capture photo</button>
      </div>
    </div>
  );
};

export default WebCamCapture */

import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

function WebcamImage(props) {
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

    props.onImageCapture(imageSrc);
  }, [webcamRef]);

  return (
    <div className="Container">
      {img === null ? (
        <>
          <Webcam
            audio={false}
            mirrored={true}
            height={400}
            width={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <button onClick={capture}>Capture photos</button>
        </>
      ) : (
        <>
          <img src={img} alt="screenshot" />
          <button onClick={() => setImg(null)}>Retake</button>
        </>
      )}
    </div>
  );
}

export default WebcamImage;