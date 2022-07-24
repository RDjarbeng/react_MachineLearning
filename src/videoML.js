import ml5 from "ml5";
import { useEffect } from "react";

export default function ObjectDetection(){
  useEffect(() => {
    const predict = async () => {
      const video = document.getElementById("video");

      // set up the live video feed from the webcam
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(function(stream) {
          video.srcObject = stream;
          video.play();
          // Create an object detector using the CocoSSD model
          const objectDetector = ml5.objectDetector("cocossd", {}, () => {
            console.log("Model Loaded!");
          });

          // Detect objects in the video element
          objectDetector.detect(video, (err, results) => {
            console.log(results); // results will be an array with predictions
          });
        })
        .catch(function(err) {
          console.log("An error occurred: " + err);
        });
    };
    predict();
  }, []);

  return <video id="video"></video>;
};