import React from 'react';
import ReactDOM from 'react-dom/client';
import GameProcessor from "./GameProcessor";
import './styles.css';
import '@babylonjs/core/Debug/debugLayer';
import '@babylonjs/inspector';
import '@babylonjs/loaders/glTF';

window.CANNON = require('cannon');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <GameProcessor />
  </React.StrictMode>
);
