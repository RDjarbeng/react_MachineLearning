import React, { useEffect, useState } from 'react';

import * as toxicity from '@tensorflow-models/toxicity';
// import '@tensorflow/tfjs';

export default function Toxicity() {
  const [model, setModel] = useState();
  const [text, setText] = useState('Testing');
  const [value, setValue] = useState('Input toxic values ');

  const userInput = [
    'If you come near me You are so dead, do not fool with me you, I will beat you up and take you to an early grave. You will regret it, fool.',
  ];

  const [input, setInput] = useState(userInput);
  const loadModel = async (userInput) => {
    console.log('Model loading...');

    const threshold = 0.5;
    const toxicityModel = await toxicity.load(threshold);
    setModel(toxicityModel);

    // console.log(
    //   'Model loaded',
    //   typeof userInput,
    //   typeof mode,
    //   'toxicity model',
    //   toxicityModel
    // );
    console.log('model loaded');
    try {
      toxicityModel
        .classify(userInput)
        .then((predictions) => {
          console.log('running', predictions);
          let t = '';
          predictions.forEach((prediction) => {
            // console.log(
            //   prediction.results[0].probabilities[1] > 0.5,
            //   'match',
            //   prediction.results[0].match,
            //   'testing',
            //   'label',
            //   prediction.label
            // );
            if (
              prediction.results[0].match &&
              prediction.results[0].probabilities[1] > 0.5
            ) {
              console.log(prediction.label, 'me again');
              t += ' ' + prediction.label + ', ';
              //  returns 'insult'.
            }
          });
          setText(t);
        })
        .catch((err) => console.log('err & toxicity', err));
    } catch (err) {
      console.log('err in toxicity', err);
    }
  };

  const testInput = async (userInput) => {
    const threshold = 0.5;
    const toxicityModel = await toxicity.load(threshold);
    setModel(toxicityModel);

    // console.log(
    //   'Model loaded',
    //   typeof userInput,
    //   typeof mode,
    //   'toxicity model',
    //   toxicityModel
    // );
    console.log('model loaded');
    try {
      toxicityModel
        .classify(userInput)
        .then((predictions) => {
          console.log('running', predictions);
          let t = '';
          predictions.forEach((prediction) => {
            // console.log(
            //   prediction.results[0].probabilities[1] > 0.5,
            //   'match',
            //   prediction.results[0].match,
            //   'testing',
            //   'label',
            //   prediction.label
            // );
            if (
              prediction.results[0].match &&
              prediction.results[0].probabilities[1] > 0.5
            ) {
              console.log(prediction.label, 'me again');
              t += ' ' + prediction.label + ', ';
              //  returns 'insult'.
            }
          });
          setText(t);
        })
        .catch((err) => console.log('err & toxicity', err));
    } catch (err) {
      console.log('err in toxicity', err);
    }
  };

  useEffect(() => {
    loadModel(input);
  }, []);
  const handleChange = (event) => {
    setValue(event.target.value);
    model.classify();
  };
  return (
    <div>
      <div>
        <textarea
          style={{ height: '100px' }}
          value={value}
          onChange={handleChange}
        />
      </div>
      <span>{userInput || 'Loading toxicity!'}</span>
      <p>{text}</p>
    </div>
  );
}
