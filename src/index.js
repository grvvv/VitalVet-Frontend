import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/homepage.css'
import './styles/healthpage.css'
import './styles/alerts.css'
import App from './App';
import { CattleContextProvider } from './context/CattleContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CattleContextProvider>
        <App />
      </CattleContextProvider>
    </AuthContextProvider>
    
  </React.StrictMode>
);