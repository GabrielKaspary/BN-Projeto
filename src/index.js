// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Importe seus estilos CSS, se necessário
import App from './App'; // Importe o componente raiz do seu aplicativo
import firebase from 'firebase/app'; // Importe o Firebase
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';


// API do Firebase
const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-auth-domain",
  projectId: "seu-project-id",
  storageBucket: "seu-storage-bucket",
  messagingSenderId: "seu-messaging-sender-id",
  appId: "seu-app-id",
  measurementId: "seu-measurement-id" 
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

export { app }; 
