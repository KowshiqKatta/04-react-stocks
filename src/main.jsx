import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Your custom CSS (optional)
import Dropdowns from './Dropdowns'; // Assuming Dropdowns.jsx is in the same directory

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Dropdowns />
  </React.StrictMode>
);