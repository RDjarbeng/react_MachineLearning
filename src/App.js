import React, { useEffect, useState } from 'react';
import './style.css';
import * as toxicity from '@tensorflow-models/toxicity';
import '@tensorflow/tfjs';
import Toxicity from './Toxicity';

export default function App() {
  return (
    <>
      <Toxicity />
    </>
  );
}
