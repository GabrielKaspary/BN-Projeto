import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importe o componente Link do React Router
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../index'; // Verifique e atualize o caminho conforme necessário
import './style.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;

        console.log('Usuário autenticado com sucesso:', user);
        // Redirecione para a página após o login bem-sucedido
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erro na autenticação:', errorCode, errorMessage);
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
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>

      <Link to="/cadastro">Não possui cadastro?</Link> {/* Adicione o link para a página de cadastro */}
    </div>
  );
};

export default Login;
