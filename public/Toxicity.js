import React, { useEffect, useState } from 'react';
import './style.css';
import * as toxicity from '@tensorflow-models/toxicity';
import '@tensorflow/tfjs';

export default function Toxicity() {
  const [model, setModel] = useState();
  const [text, setText] = useState('Testing');

  useEffect(() => {
    const loadModel = async () => {
      console.log('Model loading...');

      const threshold = 0.5;
      const toxicityModel = await toxicity.load(threshold);
      setModel(toxicityModel);

      // console.log('Model loaded', userInput);

      const userInput = [
        "If you come near me You are so dead, don't fool with me you, I will beat you up and take you to an early grave ",
      ];

      toxicityModel.classify(userInput).then((predictions) => {
        console.log('running', predictions);
        let t = '';
        predictions.forEach((prediction) => {
          console.log(
            prediction.results[0].probabilities[1] > 0.5,
            'match',
            prediction.results[0].match,
            'testing',
            'label',
            prediction.label
          );
          if (
            prediction.results[0].match
            // &&            prediction.results[0].probabilities[1] > 0.5
          ) {
            console.log(prediction.label, 'me again');
            t += ', ' + prediction.label;
            // return prediction.results[0].match;
            /*
              returns 'insult'.
            */
          } else {
            // console.log('clear', prediction.label)
          }
        });
        setText(t);
      });
    };

    loadModel();
  }, []);

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>{text}</p>
    </div>
  );
}
