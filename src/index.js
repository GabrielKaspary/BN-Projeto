// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Importe seus estilos CSS, se necessário
import App from './App'; // Importe o componente raiz do seu aplicativo
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app'; // Importe o Firebase

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-auth-domain",
  projectId: "seu-project-id",
  storageBucket: "seu-storage-bucket",
  messagingSenderId: "seu-messaging-sender-id",
  appId: "seu-app-id",
  measurementId: "seu-measurement-id" // Opcional
};

// Inicialize o Firebase
const app = firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


