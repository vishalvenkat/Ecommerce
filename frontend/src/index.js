import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/assets/styles/index.css';
import {App} from './App.tsx';
import reportWebVitals from './reportWebVitals';
import '../src/assets/styles/bootstrap.custom.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
