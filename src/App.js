import React, { useEffect, useState } from 'react';
import './style.css';
import * as toxicity from '@tensorflow-models/toxicity';
import '@tensorflow/tfjs';

export default function App() {
  const [model, setModel] = useState();

  useEffect(() => {
    const loadModel = async () => {
      console.log('Model loading...');

      const threshold = 0.9;
      const toxicityModel = await toxicity.load(threshold);
      setModel(toxicityModel);

      console.log('Model loaded');
    };

    loadModel();
  }, []);
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
