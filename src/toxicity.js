import React, { useEffect, useState } from 'react';

import * as toxicity from '@tensorflow-models/toxicity';
// import '@tensorflow/tfjs';

const threshold = 0.5;
export default function Toxicity() {
  const [model, setModel] = useState();
  const [text, setText] = useState('Loading model');
  const [value, setValue] = useState('Input toxic values here ');

  const userInput = [' foolish guy.'];

  const [input, setInput] = useState(userInput);
  const loadModel = async (userInput) => {
    console.log('Model loading...');

    const toxicityModel = await toxicity.load(threshold);
    setModel(toxicityModel);
    if (toxicityModel) setText('Ready to predict');

    // console.log(
    //   'Model loaded',
    //   typeof userInput,
    //   typeof mode,
    //   'toxicity model',
    //   toxicityModel
    // );
    console.log('model loaded');
    try {
      setText('predicting...');
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
    setText('predicting...');

    if (!model) {
      const toxicityModel = await toxicity.load(threshold);
      if (toxicityModel) setModel(toxicityModel);
    }

    // console.log(
    //   'Model loaded',
    //   typeof userInput,
    //   typeof mode,
    //   'toxicity model',
    //   toxicityModel
    // );
    console.log('model loaded');
    try {
      setInput(userInput);
      model
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
          if (t) setText(t);
          else setText('No prediction, no toxicity');
        })
        .catch((err) => console.log('err & toxicity', err));
    } catch (err) {
      console.log('err in toxicity', err);
      console.error(err);
    }
  };

  useEffect(() => {
    loadModel(input);
  }, []);
  const handleChange = (event) => {
    setValue(event.target.value);
    testInput(value);
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
      <span>{input || 'Loading toxicity!'}</span>
      <p>{text}</p>
    </div>
  );
}
