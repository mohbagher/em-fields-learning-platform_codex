import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppStateProvider } from './context/AppStateContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </React.StrictMode>
);
