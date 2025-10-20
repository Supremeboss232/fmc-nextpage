import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { GlobalProvider } from './context/GlobalContext';
import './styles/index.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('#root element not found in HTML');
}
createRoot(container).render(
  <React.StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalProvider>
  </React.StrictMode>
);
