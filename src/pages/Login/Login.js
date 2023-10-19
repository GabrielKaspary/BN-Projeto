import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Autenticado com sucesso

        // Gravar dados do usuário no Firebase Realtime Database
        const userRef = firebase.database().ref('users').child(user.uid);
        userRef.set({
          email: user.email,
          // Outros dados do usuário
        });
        console.log('Usuário autenticado e dados gravados:', user);
      })
      .catch((error) => {
        // Tratar erros de autenticação
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erro de autenticação:', errorCode, errorMessage);
      });
  };

  return (
    <div>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
